import logging
from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.destination import Destination, DestinationStatus, DestinationTranslation
from app.models.region import Region
from app.models.user import User, UserRole
from app.schemas.destination import DestinationCreate, DestinationRead, DestinationUpdate
from app.services import google_places

router = APIRouter(prefix="/destinations", tags=["destinations"])
logger = logging.getLogger(__name__)

# Deleting a destination is more destructive than creating/editing one,
# so it's restricted to a narrower set of roles than create/update.
_edit_destinations = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
_delete_destinations = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _localize(destination: Destination, lang: str | None) -> Destination:
    """Overlays a non-English translation onto the in-memory ORM object
    before it's serialized — never committed, so this never touches the
    stored English content. Any field missing from the translation (not
    yet written, or blank) just leaves the English value in place rather
    than showing an empty section."""
    if not lang or lang == "en":
        return destination

    translation = next((t for t in destination.translations if t.language == lang), None)
    if translation is None:
        return destination

    if translation.title:
        destination.name = translation.title
    if translation.tagline:
        destination.tagline = translation.tagline
    if translation.short_description:
        destination.short_description = translation.short_description
    if translation.full_description:
        destination.full_description = translation.full_description
    if translation.highlights:
        destination.highlights = translation.highlights

    if destination.region is not None:
        region_translation = next(
            (t for t in destination.region.translations if t.language == lang), None
        )
        if region_translation and region_translation.name:
            destination.region.name = region_translation.name

    return destination


def _upsert_translations(db: Session, destination: Destination, translations: dict[str, dict] | None) -> None:
    if not translations:
        return
    existing = {t.language: t for t in destination.translations}
    for language, data in translations.items():
        if language in existing:
            for field, value in data.items():
                setattr(existing[language], field, value)
        else:
            db.add(DestinationTranslation(destination_id=destination.id, language=language, **data))


@router.get("", response_model=list[DestinationRead])
def list_destinations(
    region: str | None = Query(default=None, description="Filter by region slug"),
    featured: bool | None = Query(default=None),
    lang: str | None = Query(default=None, description="Language code, e.g. 'so' — omit or 'en' for English"),
    db: Session = Depends(get_db),
) -> list[Destination]:
    query = (
        db.query(Destination)
        .options(
            joinedload(Destination.region).joinedload(Region.translations),
            joinedload(Destination.translations),
        )
        .filter(Destination.status == DestinationStatus.PUBLISHED)
    )

    if region:
        query = query.join(Region).filter(Region.slug == region)
    if featured is not None:
        query = query.filter(Destination.featured.is_(featured))

    destinations = query.order_by(Destination.name).all()
    return [_localize(d, lang) for d in destinations]


@router.get("/{slug}", response_model=DestinationRead)
def get_destination(slug: str, lang: str | None = Query(default=None), db: Session = Depends(get_db)) -> Destination:
    destination = (
        db.query(Destination)
        .options(
            joinedload(Destination.region).joinedload(Region.translations),
            joinedload(Destination.translations),
        )
        .filter(Destination.slug == slug, Destination.status == DestinationStatus.PUBLISHED)
        .first()
    )
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")
    return _localize(destination, lang)


async def _ensure_google_photos(destination: Destination, db: Session) -> list[dict]:
    """Resolve the destination's place_id (once) and refresh its cached
    Google photo metadata if stale. Never raises — any Google failure
    just means the frontend falls back to local images, not a broken
    page. See app/services/google_places.py for the caching rationale.
    """
    if not google_places.is_configured():
        return destination.google_photos_cache or []

    try:
        if destination.google_place_id is None:
            place_id = await google_places.resolve_place_id(
                destination.name, destination.region.name if destination.region else None,
                destination.latitude, destination.longitude,
            )
            if place_id is None:
                return destination.google_photos_cache or []
            destination.google_place_id = place_id
            db.commit()

        if google_places.is_cache_stale(destination.google_photos_fetched_at):
            photos = await google_places.fetch_place_photos(destination.google_place_id)
            destination.google_photos_cache = photos
            destination.google_photos_fetched_at = datetime.now(timezone.utc)
            db.commit()
    except google_places.GooglePlacesError:
        logger.warning("Google Places lookup failed for destination %s", destination.slug, exc_info=True)

    return destination.google_photos_cache or []


@router.get("/{slug}/photos")
async def get_destination_photos(slug: str, db: Session = Depends(get_db)) -> list[dict]:
    """Real photos of this destination, sourced from Google Places (New)
    when configured — never the raw Google photo name/URL, always a
    Blue Ocean-hosted proxy path so the frontend stays independent of
    where the image actually comes from.
    """
    destination = db.query(Destination).filter(
        Destination.slug == slug, Destination.status == DestinationStatus.PUBLISHED
    ).first()
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    photos = await _ensure_google_photos(destination, db)
    return [
        {
            "url": f"/api/v1/destinations/{slug}/photos/{i}/media",
            "width": p.get("width"),
            "height": p.get("height"),
            "attributions": p.get("attributions") or [],
        }
        for i, p in enumerate(photos)
    ]


@router.get("/{slug}/photos/{index}/media")
async def get_destination_photo_media(slug: str, index: int, db: Session = Depends(get_db)) -> Response:
    destination = db.query(Destination).filter(
        Destination.slug == slug, Destination.status == DestinationStatus.PUBLISHED
    ).first()
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    photos = await _ensure_google_photos(destination, db)
    if index < 0 or index >= len(photos):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found.")

    try:
        content, content_type = await google_places.fetch_photo_bytes(photos[index]["name"])
    except google_places.GooglePlacesError:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Could not fetch photo from Google.")

    return Response(content=content, media_type=content_type, headers={"Cache-Control": "public, max-age=86400"})


@router.get("/admin/all", response_model=list[DestinationRead])
def list_all_destinations_admin(db: Session = Depends(get_db), _: User = Depends(_edit_destinations)) -> list[Destination]:
    return (
        db.query(Destination)
        .options(joinedload(Destination.region), joinedload(Destination.translations))
        .order_by(Destination.name)
        .all()
    )


@router.get("/admin/{destination_id}", response_model=DestinationRead)
def get_destination_admin(
    destination_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_destinations)
) -> Destination:
    destination = (
        db.query(Destination)
        .options(joinedload(Destination.region), joinedload(Destination.translations))
        .filter(Destination.id == destination_id)
        .first()
    )
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")
    return destination


@router.post("", response_model=DestinationRead, status_code=status.HTTP_201_CREATED)
def create_destination(
    payload: DestinationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_destinations),
) -> Destination:
    if db.query(Destination).filter(Destination.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A destination with this slug already exists.")
    if db.get(Region, payload.region_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="region_id does not reference an existing region.")

    data = payload.model_dump()
    translations = data.pop("translations", None)

    destination = Destination(**data)
    db.add(destination)
    db.flush()
    _upsert_translations(db, destination, translations)

    log_activity(db, current_user, ActivityAction.CREATED, "destination", destination.name)
    if destination.status == DestinationStatus.PUBLISHED:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "destination", destination.name)
    db.commit()
    db.refresh(destination)
    return destination


@router.patch("/{destination_id}", response_model=DestinationRead)
def update_destination(
    destination_id: UUID,
    payload: DestinationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_destinations),
) -> Destination:
    destination = db.get(Destination, destination_id)
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    updates = payload.model_dump(exclude_unset=True)
    translations = updates.pop("translations", None)

    if "slug" in updates and updates["slug"] != destination.slug:
        if db.query(Destination).filter(Destination.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A destination with this slug already exists.")

    if "region_id" in updates and db.get(Region, updates["region_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="region_id does not reference an existing region.")

    was_published = destination.status == DestinationStatus.PUBLISHED
    for field, value in updates.items():
        setattr(destination, field, value)

    if translations:
        _upsert_translations(db, destination, translations)

    if updates or translations:
        if not was_published and destination.status == DestinationStatus.PUBLISHED:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "destination", destination.name)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "destination", destination.name)

    db.commit()
    db.refresh(destination)
    return destination


@router.delete("/{destination_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_destination(
    destination_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_destinations)
) -> None:
    destination = db.get(Destination, destination_id)
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    db.delete(destination)
    db.commit()
