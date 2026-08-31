"""
Seed species categories and species from the frontend's real content.

seed_data/species_categories.json and seed_data/species.json are direct
exports of src/data/marineLife.js's marineCategories and speciesList.
Species-to-destination links use the real many-to-many relationship
(destinations must already be seeded — run scripts/seed_coast.py first).
Re-running is safe: upserts by slug.

Cross-links to research/conservation projects present in the source
JSON aren't loaded — those tables don't exist yet (Sprints B5, B7).

Usage:
    uv run python scripts/seed_marine_life.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.species import ConservationStatus, Species  # noqa: E402
from app.models.species_category import SpeciesCategory  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_category(db, raw: dict) -> SpeciesCategory:
    category = db.query(SpeciesCategory).filter(SpeciesCategory.slug == raw["slug"]).first()
    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        description=raw.get("description"),
        image=raw.get("image"),
        count=raw.get("count"),
        count_label=raw.get("countLabel"),
        group=raw.get("group"),
    )
    if category is None:
        category = SpeciesCategory(**fields)
        db.add(category)
        print(f"  + category: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(category, k, v)
        print(f"  = category: {raw['title']} (updated)")
    return category


def upsert_species(
    db, raw: dict, category_by_slug: dict[str, SpeciesCategory], destination_by_slug: dict[str, Destination]
) -> None:
    category = category_by_slug.get(raw["category"])
    if category is None:
        print(f"  ! skipping {raw['commonName']}: unknown category {raw['category']!r}")
        return

    try:
        status = ConservationStatus(raw["conservationStatus"])
    except ValueError:
        print(f"  ! skipping {raw['commonName']}: unknown conservationStatus {raw['conservationStatus']!r}")
        return

    gallery = [
        {"url": g.get("url"), "caption": g.get("caption"), "photographer": g.get("photographer")}
        for g in raw.get("gallery", [])
    ]

    fields = dict(
        slug=raw["slug"],
        common_name=raw["commonName"],
        somali_name=raw.get("somaliName"),
        scientific_name=raw.get("scientificName"),
        category_id=category.id,
        taxonomic_group=raw.get("group"),
        tagline=raw.get("tagline"),
        editorial_statement=raw.get("editorialStatement"),
        description=raw.get("description"),
        hero_image=raw.get("heroImage"),
        gallery=gallery,
        habitat=raw.get("habitat"),
        depth=raw.get("depth"),
        distribution=raw.get("distribution"),
        diet=raw.get("diet"),
        size=raw.get("size"),
        weight=raw.get("weight"),
        lifespan=raw.get("lifespan"),
        conservation_status=status,
        status_explanation=raw.get("statusExplanation"),
        interesting_facts=raw.get("interestingFacts", []),
        featured=raw.get("featured", False),
    )

    linked_destinations = [
        destination_by_slug[d["slug"]] for d in raw.get("destinations", []) if d["slug"] in destination_by_slug
    ]

    species = db.query(Species).filter(Species.slug == raw["slug"]).first()
    if species is None:
        species = Species(**fields)
        species.destinations = linked_destinations
        db.add(species)
        print(f"  + species: {raw['commonName']}")
    else:
        for k, v in fields.items():
            setattr(species, k, v)
        species.destinations = linked_destinations
        print(f"  = species: {raw['commonName']} (updated)")


def main() -> None:
    categories_raw = json.loads((SEED_DIR / "species_categories.json").read_text())
    species_raw = json.loads((SEED_DIR / "species.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(categories_raw)} species categories...")
        for raw in categories_raw:
            upsert_category(db, raw)
        db.commit()

        category_by_slug = {c.slug: c for c in db.query(SpeciesCategory).all()}
        destination_by_slug = {d.slug: d for d in db.query(Destination).all()}

        if not destination_by_slug:
            print("Warning: no destinations found — run scripts/seed_coast.py first for species-destination links.")

        print(f"Seeding {len(species_raw)} species...")
        for raw in species_raw:
            upsert_species(db, raw, category_by_slug, destination_by_slug)
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
