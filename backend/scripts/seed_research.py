"""
Seed research areas, methodologies, teams, projects, and expeditions
from the frontend's real content (src/data/research.js).

Run order matters — destinations and species must already be seeded
(scripts/seed_coast.py, scripts/seed_marine_life.py), since projects
and expeditions link to them by slug. Safe to re-run: upserts by slug.

Usage:
    uv run python scripts/seed_research.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.expedition import Expedition  # noqa: E402
from app.models.methodology import Methodology  # noqa: E402
from app.models.research_area import ResearchArea  # noqa: E402
from app.models.research_project import ProjectStatus, ResearchProject  # noqa: E402
from app.models.research_team import ResearchTeam  # noqa: E402
from app.models.species import Species  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_area(db, raw: dict) -> ResearchArea:
    area = db.query(ResearchArea).filter(ResearchArea.slug == raw["slug"]).first()
    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        description=raw.get("description"),
        image=raw.get("image"),
        tag=raw.get("tag"),
        color=raw.get("color"),
        border_color=raw.get("borderColor"),
        text_color=raw.get("textColor"),
    )
    if area is None:
        area = ResearchArea(**fields)
        db.add(area)
        print(f"  + area: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(area, k, v)
        print(f"  = area: {raw['title']} (updated)")
    return area


def upsert_methodology(db, raw: dict) -> Methodology:
    m = db.query(Methodology).filter(Methodology.slug == raw["id"]).first()
    fields = dict(slug=raw["id"], label=raw["label"], icon=raw.get("icon"))
    if m is None:
        m = Methodology(**fields)
        db.add(m)
        print(f"  + methodology: {raw['label']}")
    else:
        for k, v in fields.items():
            setattr(m, k, v)
        print(f"  = methodology: {raw['label']} (updated)")
    return m


def upsert_team(db, raw: dict, area_by_slug: dict[str, ResearchArea]) -> ResearchTeam:
    team = db.query(ResearchTeam).filter(ResearchTeam.slug == raw["slug"]).first()
    fields = dict(slug=raw["slug"], name=raw["name"], description=raw.get("description"), icon=raw.get("icon"))
    focus_areas = [area_by_slug[s] for s in raw.get("focusAreas", []) if s in area_by_slug]

    if team is None:
        team = ResearchTeam(**fields)
        team.focus_areas = focus_areas
        db.add(team)
        print(f"  + team: {raw['name']}")
    else:
        for k, v in fields.items():
            setattr(team, k, v)
        team.focus_areas = focus_areas
        print(f"  = team: {raw['name']} (updated)")
    return team


def upsert_project(
    db,
    raw: dict,
    area_by_slug: dict[str, ResearchArea],
    team_by_slug: dict[str, ResearchTeam],
    methodology_by_slug: dict[str, Methodology],
    species_by_slug: dict[str, Species],
    destination_by_slug: dict[str, Destination],
) -> None:
    area = area_by_slug.get(raw["area"])
    if area is None:
        print(f"  ! skipping {raw['title']}: unknown area {raw['area']!r}")
        return

    try:
        proj_status = ProjectStatus(raw["status"])
    except ValueError:
        print(f"  ! skipping {raw['title']}: unknown status {raw['status']!r}")
        return

    team = team_by_slug.get(raw.get("researchTeamSlug"))
    gallery = [{"url": g.get("url"), "caption": g.get("caption")} for g in raw.get("gallery", [])]
    findings = [
        {"title": f.get("title"), "description": f.get("description"), "source": f.get("source")}
        for f in raw.get("findings", [])
    ]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        area_id=area.id,
        research_team_id=team.id if team else None,
        status=proj_status,
        region=raw.get("region"),
        start_date=raw.get("startDate"),
        end_date=raw.get("endDate"),
        summary=raw.get("summary"),
        editorial_statement=raw.get("editorialStatement"),
        research_question=raw.get("researchQuestion"),
        purpose=raw.get("purpose"),
        geographic_scope=raw.get("geographicScope"),
        expected_outcomes=raw.get("expectedOutcomes"),
        hero_image=raw.get("heroImage"),
        gallery=gallery,
        objectives=raw.get("objectives", []),
        findings=findings,
        conservation_themes=raw.get("conservationThemes", []),
        featured=raw.get("featured", False),
    )

    methodologies = [methodology_by_slug[s] for s in raw.get("methodology", []) if s in methodology_by_slug]
    species = [species_by_slug[s] for s in raw.get("speciesSlugs", []) if s in species_by_slug]
    destinations = [destination_by_slug[s] for s in raw.get("destinationSlugs", []) if s in destination_by_slug]

    project = db.query(ResearchProject).filter(ResearchProject.slug == raw["slug"]).first()
    if project is None:
        project = ResearchProject(**fields)
        project.methodologies = methodologies
        project.species = species
        project.destinations = destinations
        db.add(project)
        print(f"  + project: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(project, k, v)
        project.methodologies = methodologies
        project.species = species
        project.destinations = destinations
        print(f"  = project: {raw['title']} (updated)")


def upsert_expedition(
    db,
    raw: dict,
    area_by_slug: dict[str, ResearchArea],
    team_by_slug: dict[str, ResearchTeam],
    species_by_slug: dict[str, Species],
) -> None:
    area = area_by_slug.get(raw.get("area"))
    team = team_by_slug.get(raw.get("researchTeamSlug"))
    species = [species_by_slug[s] for s in raw.get("speciesSlugs", []) if s in species_by_slug]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        location=raw.get("location"),
        region=raw.get("region"),
        dates=raw.get("dates"),
        duration=raw.get("duration"),
        purpose=raw.get("purpose"),
        area_id=area.id if area else None,
        research_team_id=team.id if team else None,
        requirements=raw.get("requirements", []),
        status=raw.get("status", "coming-soon"),
    )

    expedition = db.query(Expedition).filter(Expedition.slug == raw["slug"]).first()
    if expedition is None:
        expedition = Expedition(**fields)
        expedition.species = species
        db.add(expedition)
        print(f"  + expedition: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(expedition, k, v)
        expedition.species = species
        print(f"  = expedition: {raw['title']} (updated)")


def main() -> None:
    areas_raw = json.loads((SEED_DIR / "research_areas.json").read_text())
    methodologies_raw = json.loads((SEED_DIR / "methodologies.json").read_text())
    teams_raw = json.loads((SEED_DIR / "research_teams.json").read_text())
    projects_raw = json.loads((SEED_DIR / "research_projects.json").read_text())
    expeditions_raw = json.loads((SEED_DIR / "expeditions.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(areas_raw)} research areas...")
        for raw in areas_raw:
            upsert_area(db, raw)
        db.commit()

        print(f"Seeding {len(methodologies_raw)} methodologies...")
        for raw in methodologies_raw:
            upsert_methodology(db, raw)
        db.commit()

        area_by_slug = {a.slug: a for a in db.query(ResearchArea).all()}

        print(f"Seeding {len(teams_raw)} research teams...")
        for raw in teams_raw:
            upsert_team(db, raw, area_by_slug)
        db.commit()

        team_by_slug = {t.slug: t for t in db.query(ResearchTeam).all()}
        methodology_by_slug = {m.slug: m for m in db.query(Methodology).all()}
        species_by_slug = {s.slug: s for s in db.query(Species).all()}
        destination_by_slug = {d.slug: d for d in db.query(Destination).all()}

        if not species_by_slug:
            print("Warning: no species found — run scripts/seed_marine_life.py first.")
        if not destination_by_slug:
            print("Warning: no destinations found — run scripts/seed_coast.py first.")

        print(f"Seeding {len(projects_raw)} research projects...")
        for raw in projects_raw:
            upsert_project(db, raw, area_by_slug, team_by_slug, methodology_by_slug, species_by_slug, destination_by_slug)
        db.commit()

        print(f"Seeding {len(expeditions_raw)} expeditions...")
        for raw in expeditions_raw:
            upsert_expedition(db, raw, area_by_slug, team_by_slug, species_by_slug)
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
