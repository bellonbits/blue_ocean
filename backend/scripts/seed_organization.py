"""
Seed the singleton organization settings row from the frontend's real
content (src/data/organization.js).

Unlike every other seed script, this doesn't upsert-by-slug — there's
exactly one row. Safe to re-run: updates the existing row if one
already exists instead of creating a second.

Usage:
    uv run python scripts/seed_organization.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401
from app.db.session import SessionLocal  # noqa: E402
from app.models.organization_settings import OrganizationSettings  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def main() -> None:
    raw = json.loads((SEED_DIR / "organization.json").read_text())
    org = raw["organization"]
    contact = raw["contactDetails"]

    fields = dict(
        name=org["name"],
        mission_statement=org["mission"]["statement"],
        mission_description=org["mission"]["description"],
        vision_statement=org["vision"]["statement"],
        vision_description=org["vision"]["description"],
        story_intro=org["story"]["intro"],
        story_paragraphs=org["story"]["paragraphs"],
        why_ocean_matters_heading=org["whyOceanMatters"]["heading"],
        why_ocean_matters_text=org["whyOceanMatters"]["text"],
        who_we_work_with_heading=org["whoWeWorkWith"]["heading"],
        who_we_work_with_text=org["whoWeWorkWith"]["text"],
        what_we_do=org["whatWeDo"],
        contact_email=contact["email"],
        contact_locations=contact["locations"],
        contact_subjects=raw["contactSubjects"],
        social_links=raw["socialLinks"],
    )

    db = SessionLocal()
    try:
        settings = db.query(OrganizationSettings).first()
        if settings is None:
            settings = OrganizationSettings(**fields)
            db.add(settings)
            print("+ created organization settings")
        else:
            for k, v in fields.items():
                setattr(settings, k, v)
            print("= updated organization settings")
        db.commit()
        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
