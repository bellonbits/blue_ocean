"""
Seed ocean experience categories and experiences from the frontend's
real content (src/data/experiences.js).

Run order matters — destinations and species must already be seeded
(scripts/seed_coast.py, scripts/seed_marine_life.py), since experiences
link to them by slug. Safe to re-run: upserts by slug.

Usage:
    uv run python scripts/seed_experiences.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.experience import Experience, ExperienceStatus  # noqa: E402
from app.models.experience_category import ExperienceCategory  # noqa: E402
from app.models.species import Species  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_category(db, raw: dict) -> ExperienceCategory:
    category = db.query(ExperienceCategory).filter(ExperienceCategory.slug == raw["slug"]).first()
    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        tagline=raw.get("tagline"),
        description=raw.get("description"),
        icon=raw.get("icon"),
        image=raw.get("image"),
    )
    if category is None:
        category = ExperienceCategory(**fields)
        db.add(category)
        print(f"  + category: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(category, k, v)
        print(f"  = category: {raw['title']} (updated)")
    return category


def upsert_experience(
    db,
    raw: dict,
    category_by_slug: dict[str, ExperienceCategory],
    species_by_slug: dict[str, Species],
    destination_by_slug: dict[str, Destination],
) -> None:
    category = category_by_slug.get(raw["category"])
    if category is None:
        print(f"  ! skipping {raw['title']}: unknown category {raw['category']!r}")
        return

    try:
        exp_status = ExperienceStatus(raw["status"])
    except ValueError:
        print(f"  ! skipping {raw['title']}: unknown status {raw['status']!r}")
        return

    gallery = [{"url": g.get("url"), "caption": g.get("caption")} for g in raw.get("gallery", [])]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        category_id=category.id,
        status=exp_status,
        tagline=raw.get("tagline"),
        short_description=raw.get("shortDescription"),
        story=raw.get("story", {}),
        region=raw.get("region"),
        location=raw.get("location"),
        duration=raw.get("duration"),
        difficulty=raw.get("difficulty"),
        best_season=raw.get("bestSeason"),
        hero_image=raw.get("heroImage"),
        gallery=gallery,
        highlights=raw.get("highlights", []),
        conservation_themes=raw.get("conservationThemes", []),
        featured=raw.get("featured", False),
    )

    destinations = [destination_by_slug[s] for s in raw.get("destinationSlugs", []) if s in destination_by_slug]
    marine_species = [species_by_slug[s] for s in raw.get("marineSpeciesSlugs", []) if s in species_by_slug]

    experience = db.query(Experience).filter(Experience.slug == raw["slug"]).first()
    if experience is None:
        experience = Experience(**fields)
        experience.destinations = destinations
        experience.marine_species = marine_species
        db.add(experience)
        print(f"  + experience: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(experience, k, v)
        experience.destinations = destinations
        experience.marine_species = marine_species
        print(f"  = experience: {raw['title']} (updated)")


def main() -> None:
    categories_raw = json.loads((SEED_DIR / "experience_categories.json").read_text())
    experiences_raw = json.loads((SEED_DIR / "experiences.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(categories_raw)} experience categories...")
        for raw in categories_raw:
            upsert_category(db, raw)
        db.commit()

        category_by_slug = {c.slug: c for c in db.query(ExperienceCategory).all()}
        species_by_slug = {s.slug: s for s in db.query(Species).all()}
        destination_by_slug = {d.slug: d for d in db.query(Destination).all()}

        if not species_by_slug:
            print("Warning: no species found — run scripts/seed_marine_life.py first.")
        if not destination_by_slug:
            print("Warning: no destinations found — run scripts/seed_coast.py first.")

        print(f"Seeding {len(experiences_raw)} experiences...")
        for raw in experiences_raw:
            upsert_experience(db, raw, category_by_slug, species_by_slug, destination_by_slug)
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
