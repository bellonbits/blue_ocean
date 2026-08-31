"""
Seed regions and destinations from the frontend's real content.

seed_data/regions.json and seed_data/destinations.json are exported
directly from src/data/regions.js and src/data/destinations.js (see
the comment at the top of each JSON file's generating command in the
Sprint B3 notes) — so this loads Blue Ocean's actual published content,
not placeholder data. Re-running is safe: upserts by slug.

Cross-links present in the source JSON (marineSpecies, researchProjects,
experiences) are intentionally not loaded — those tables don't exist
yet (Sprints B4-B6).

Usage:
    uv run python scripts/seed_coast.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.region import Region  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_region(db, raw: dict) -> Region:
    region = db.query(Region).filter(Region.slug == raw["slug"]).first()
    fields = dict(
        slug=raw["slug"],
        name=raw["name"],
        subtitle=raw.get("subtitle"),
        tagline=raw.get("tagline"),
        description=raw.get("description"),
        image=raw.get("image"),
        coastline_km=raw.get("coastlineKm"),
        seas=raw.get("seas", []),
        highlights=raw.get("highlights", []),
    )
    if region is None:
        region = Region(**fields)
        db.add(region)
        print(f"  + region: {raw['name']}")
    else:
        for k, v in fields.items():
            setattr(region, k, v)
        print(f"  = region: {raw['name']} (updated)")
    return region


def upsert_destination(db, raw: dict, region_by_slug: dict[str, Region]) -> None:
    region = region_by_slug.get(raw["regionId"])
    if region is None:
        print(f"  ! skipping {raw['name']}: unknown regionId {raw['regionId']!r}")
        return

    coords = raw.get("coordinates") or {}
    fields = dict(
        slug=raw["slug"],
        name=raw["name"],
        region_id=region.id,
        location=raw.get("location"),
        coastline_area=raw.get("coastlineArea"),
        destination_type=raw.get("destinationType"),
        tagline=raw.get("tagline"),
        short_description=raw.get("shortDescription"),
        full_description=raw.get("fullDescription"),
        hero_image=raw.get("heroImage"),
        gallery=raw.get("gallery", []),
        latitude=coords.get("lat"),
        longitude=coords.get("lng"),
        best_season=raw.get("bestSeason"),
        access=raw.get("access"),
        featured=raw.get("featured", False),
        highlights=raw.get("highlights", []),
    )

    destination = db.query(Destination).filter(Destination.slug == raw["slug"]).first()
    if destination is None:
        db.add(Destination(**fields))
        print(f"  + destination: {raw['name']}")
    else:
        for k, v in fields.items():
            setattr(destination, k, v)
        print(f"  = destination: {raw['name']} (updated)")


def main() -> None:
    regions_raw = json.loads((SEED_DIR / "regions.json").read_text())
    destinations_raw = json.loads((SEED_DIR / "destinations.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(regions_raw)} regions...")
        for raw in regions_raw:
            upsert_region(db, raw)
        db.commit()

        region_by_slug = {r.slug: r for r in db.query(Region).all()}

        print(f"Seeding {len(destinations_raw)} destinations...")
        for raw in destinations_raw:
            upsert_destination(db, raw, region_by_slug)
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
