"""
Google Places API (New) integration for real destination photos.

Server-side only — GOOGLE_PLACES_API_KEY never reaches the frontend.
Callers should treat `google_photos_cache` as a short-lived cache (see
Settings.google_places_cache_hours), not a permanent record: Google's
photo resource names can rotate, so this module re-resolves them once
the cache goes stale rather than trusting an old value forever.

Two Google calls are involved:
  1. Places Text Search (New) — resolves a destination's name/coordinates
     to a stable `place_id`, cached on Destination.google_place_id once
     found (this part IS safe to keep indefinitely).
  2. Place Details (New), fieldMask=photos — returns the place's current
     `photos[].name` tokens, cached with a timestamp so it gets refreshed
     periodically instead of assumed valid forever.

Photo bytes themselves are never stored — see
app/api/v1/destinations.py's photo proxy endpoint, which streams them
from Google on demand.
"""

from datetime import datetime, timedelta, timezone

import httpx

from app.core.config import get_settings

_BASE_URL = "https://places.googleapis.com/v1"


class GooglePlacesError(RuntimeError):
    """Raised when Google Places returns an error or is misconfigured."""


def is_configured() -> bool:
    return bool(get_settings().google_places_api_key)


async def resolve_place_id(name: str, region: str | None, lat: float | None, lng: float | None) -> str | None:
    """Text-search Google Places for a destination and return its place_id, or None if nothing matched."""
    settings = get_settings()
    if not settings.google_places_api_key:
        return None

    query = f"{name}, {region}, Somalia" if region else f"{name}, Somalia"
    body: dict = {"textQuery": query, "maxResultCount": 1}
    if lat is not None and lng is not None:
        body["locationBias"] = {"circle": {"center": {"latitude": lat, "longitude": lng}, "radius": 15000.0}}

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(
            f"{_BASE_URL}/places:searchText",
            json=body,
            headers={
                "X-Goog-Api-Key": settings.google_places_api_key,
                "X-Goog-FieldMask": "places.id,places.displayName",
                "Content-Type": "application/json",
            },
        )

    if response.status_code != 200:
        raise GooglePlacesError(f"Places Text Search failed ({response.status_code}): {response.text}")

    places = response.json().get("places") or []
    return places[0]["id"] if places else None


async def fetch_place_photos(place_id: str) -> list[dict]:
    """Fetch current photo metadata for a place_id: [{name, width, height, attributions}, ...]."""
    settings = get_settings()
    if not settings.google_places_api_key:
        return []

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(
            f"{_BASE_URL}/places/{place_id}",
            headers={
                "X-Goog-Api-Key": settings.google_places_api_key,
                "X-Goog-FieldMask": "id,displayName,photos",
            },
        )

    if response.status_code != 200:
        raise GooglePlacesError(f"Place Details failed ({response.status_code}): {response.text}")

    photos = response.json().get("photos") or []
    return [
        {
            "name": p["name"],
            "width": p.get("widthPx"),
            "height": p.get("heightPx"),
            "attributions": [a.get("displayName") for a in p.get("authorAttributions", [])],
        }
        for p in photos
    ]


async def fetch_photo_bytes(photo_name: str, max_width_px: int = 1200) -> tuple[bytes, str]:
    """Fetch the actual image bytes for a cached photo `name`. Returns (content, content_type)."""
    settings = get_settings()
    if not settings.google_places_api_key:
        raise GooglePlacesError("Google Places is not configured.")

    async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as client:
        response = await client.get(
            f"{_BASE_URL}/{photo_name}/media",
            params={"maxWidthPx": max_width_px, "key": settings.google_places_api_key},
        )

    if response.status_code != 200:
        raise GooglePlacesError(f"Photo media fetch failed ({response.status_code}).")

    return response.content, response.headers.get("content-type", "image/jpeg")


def is_cache_stale(fetched_at: datetime | None) -> bool:
    if fetched_at is None:
        return True
    settings = get_settings()
    if fetched_at.tzinfo is None:
        fetched_at = fetched_at.replace(tzinfo=timezone.utc)
    return datetime.now(timezone.utc) - fetched_at > timedelta(hours=settings.google_places_cache_hours)
