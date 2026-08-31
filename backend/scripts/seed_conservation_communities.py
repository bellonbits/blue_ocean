"""
Seed conservation focus areas, issues, and projects, plus communities and
community stories, from the frontend's real content
(src/data/conservation.js, src/data/communities.js).

Run order matters — destinations, species, and research projects must
already be seeded (scripts/seed_coast.py, seed_marine_life.py,
seed_research.py), since conservation projects link to all three, and
community stories link to conservation projects. Communities are seeded
before conservation projects since projects link to communities too.
Safe to re-run: upserts by slug.

Usage:
    uv run python scripts/seed_conservation_communities.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.community import Community  # noqa: E402
from app.models.community_story import CommunityStory  # noqa: E402
from app.models.conservation_focus_area import ConservationFocusArea  # noqa: E402
from app.models.conservation_issue import ConservationIssue  # noqa: E402
from app.models.conservation_project import ConservationProject, ConservationStatus  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.research_project import ResearchProject  # noqa: E402
from app.models.species import Species  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_focus_area(db, raw: dict) -> ConservationFocusArea:
    area = db.query(ConservationFocusArea).filter(ConservationFocusArea.slug == raw["slug"]).first()
    fields = dict(slug=raw["slug"], title=raw["title"], description=raw.get("description"), image=raw.get("image"))
    if area is None:
        area = ConservationFocusArea(**fields)
        db.add(area)
        print(f"  + focus area: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(area, k, v)
        print(f"  = focus area: {raw['title']} (updated)")
    return area


def upsert_issue(db, raw: dict) -> ConservationIssue:
    issue = db.query(ConservationIssue).filter(ConservationIssue.slug == raw["id"]).first()
    fields = dict(slug=raw["id"], label=raw["label"], icon=raw.get("icon"))
    if issue is None:
        issue = ConservationIssue(**fields)
        db.add(issue)
        print(f"  + issue: {raw['label']}")
    else:
        for k, v in fields.items():
            setattr(issue, k, v)
        print(f"  = issue: {raw['label']} (updated)")
    return issue


def upsert_community(db, raw: dict) -> Community:
    community = db.query(Community).filter(Community.slug == raw["slug"]).first()
    gallery = [{"url": g.get("url"), "caption": g.get("caption")} for g in raw.get("gallery", [])]
    fields = dict(
        slug=raw["slug"],
        name=raw["name"],
        category=raw.get("category"),
        location=raw.get("location"),
        region=raw.get("region"),
        hero_image=raw.get("heroImage"),
        description=raw.get("description"),
        livelihoods=raw.get("livelihoods", []),
        marine_connection=raw.get("marineConnection"),
        conservation_activities=raw.get("conservationActivities", []),
        gallery=gallery,
    )
    if community is None:
        community = Community(**fields)
        db.add(community)
        print(f"  + community: {raw['name']}")
    else:
        for k, v in fields.items():
            setattr(community, k, v)
        print(f"  = community: {raw['name']} (updated)")
    return community


def upsert_project(
    db,
    raw: dict,
    focus_area_by_slug: dict[str, ConservationFocusArea],
    issue_by_slug: dict[str, ConservationIssue],
    species_by_slug: dict[str, Species],
    destination_by_slug: dict[str, Destination],
    research_project_by_slug: dict[str, ResearchProject],
    community_by_slug: dict[str, Community],
) -> None:
    focus_area = focus_area_by_slug.get(raw["focusArea"])
    if focus_area is None:
        print(f"  ! skipping {raw['title']}: unknown focus area {raw['focusArea']!r}")
        return

    try:
        proj_status = ConservationStatus(raw["status"])
    except ValueError:
        print(f"  ! skipping {raw['title']}: unknown status {raw['status']!r}")
        return

    gallery = [{"url": g.get("url"), "caption": g.get("caption")} for g in raw.get("gallery", [])]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        focus_area_id=focus_area.id,
        status=proj_status,
        region=raw.get("region"),
        start_date=raw.get("startDate"),
        end_date=raw.get("endDate"),
        summary=raw.get("summary"),
        editorial_statement=raw.get("editorialStatement"),
        what_it_is=raw.get("whatItIs"),
        why_it_matters=raw.get("whyItMatters"),
        who_is_involved=raw.get("whoIsInvolved"),
        aims=raw.get("aims"),
        problem_statement=raw.get("problemStatement"),
        hero_image=raw.get("heroImage"),
        gallery=gallery,
        featured=raw.get("featured", False),
    )

    issues = [issue_by_slug[s] for s in raw.get("issueSlugs", []) if s in issue_by_slug]
    species = [species_by_slug[s] for s in raw.get("speciesSlugs", []) if s in species_by_slug]
    destinations = [destination_by_slug[s] for s in raw.get("destinationSlugs", []) if s in destination_by_slug]
    research_projects = [research_project_by_slug[s] for s in raw.get("researchProjectSlugs", []) if s in research_project_by_slug]
    communities = [community_by_slug[s] for s in raw.get("communitySlugs", []) if s in community_by_slug]

    project = db.query(ConservationProject).filter(ConservationProject.slug == raw["slug"]).first()
    if project is None:
        project = ConservationProject(**fields)
        project.issues = issues
        project.species = species
        project.destinations = destinations
        project.research_projects = research_projects
        project.communities = communities
        db.add(project)
        print(f"  + project: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(project, k, v)
        project.issues = issues
        project.species = species
        project.destinations = destinations
        project.research_projects = research_projects
        project.communities = communities
        print(f"  = project: {raw['title']} (updated)")


def upsert_story(
    db,
    raw: dict,
    community_by_slug: dict[str, Community],
    project_by_slug: dict[str, ConservationProject],
    species_by_slug: dict[str, Species],
) -> None:
    community = community_by_slug.get(raw["communitySlug"])
    if community is None:
        print(f"  ! skipping {raw['title']}: unknown community {raw['communitySlug']!r}")
        return

    project = project_by_slug.get(raw.get("conservationProjectSlug"))
    species = [species_by_slug[s] for s in raw.get("speciesSlugs", []) if s in species_by_slug]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        category=raw.get("category"),
        community_id=community.id,
        conservation_project_id=project.id if project else None,
        location=raw.get("location"),
        region=raw.get("region"),
        featured_image=raw.get("featuredImage"),
        author=raw.get("author"),
        date=raw.get("date"),
        story_content=raw.get("storyContent", []),
        marine_connection=raw.get("marineConnection"),
        featured=raw.get("featured", False),
        published=raw.get("published", True),
    )

    story = db.query(CommunityStory).filter(CommunityStory.slug == raw["slug"]).first()
    if story is None:
        story = CommunityStory(**fields)
        story.species = species
        db.add(story)
        print(f"  + story: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(story, k, v)
        story.species = species
        print(f"  = story: {raw['title']} (updated)")


def main() -> None:
    focus_areas_raw = json.loads((SEED_DIR / "conservation_focus_areas.json").read_text())
    issues_raw = json.loads((SEED_DIR / "conservation_issues.json").read_text())
    projects_raw = json.loads((SEED_DIR / "conservation_projects.json").read_text())
    communities_raw = json.loads((SEED_DIR / "communities.json").read_text())
    stories_raw = json.loads((SEED_DIR / "community_stories.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(communities_raw)} communities...")
        for raw in communities_raw:
            upsert_community(db, raw)
        db.commit()

        print(f"Seeding {len(focus_areas_raw)} conservation focus areas...")
        for raw in focus_areas_raw:
            upsert_focus_area(db, raw)
        db.commit()

        print(f"Seeding {len(issues_raw)} conservation issues...")
        for raw in issues_raw:
            upsert_issue(db, raw)
        db.commit()

        focus_area_by_slug = {a.slug: a for a in db.query(ConservationFocusArea).all()}
        issue_by_slug = {i.slug: i for i in db.query(ConservationIssue).all()}
        species_by_slug = {s.slug: s for s in db.query(Species).all()}
        destination_by_slug = {d.slug: d for d in db.query(Destination).all()}
        research_project_by_slug = {p.slug: p for p in db.query(ResearchProject).all()}
        community_by_slug = {c.slug: c for c in db.query(Community).all()}

        if not species_by_slug:
            print("Warning: no species found — run scripts/seed_marine_life.py first.")
        if not destination_by_slug:
            print("Warning: no destinations found — run scripts/seed_coast.py first.")
        if not research_project_by_slug:
            print("Warning: no research projects found — run scripts/seed_research.py first.")

        print(f"Seeding {len(projects_raw)} conservation projects...")
        for raw in projects_raw:
            upsert_project(
                db, raw, focus_area_by_slug, issue_by_slug, species_by_slug,
                destination_by_slug, research_project_by_slug, community_by_slug,
            )
        db.commit()

        project_by_slug = {p.slug: p for p in db.query(ConservationProject).all()}

        print(f"Seeding {len(stories_raw)} community stories...")
        for raw in stories_raw:
            upsert_story(db, raw, community_by_slug, project_by_slug, species_by_slug)
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
