"""
Seed news categories and articles from the frontend's real content
(src/data/news.js).

Run order matters — destinations, species, research projects,
conservation projects, experiences, and communities must already be
seeded, since articles link to all six. Safe to re-run: upserts by slug.

Usage:
    uv run python scripts/seed_news.py
"""

import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.db.session import SessionLocal  # noqa: E402
from app.models.community import Community  # noqa: E402
from app.models.conservation_project import ConservationProject  # noqa: E402
from app.models.destination import Destination  # noqa: E402
from app.models.experience import Experience  # noqa: E402
from app.models.news_article import NewsArticle  # noqa: E402
from app.models.news_category import NewsCategory  # noqa: E402
from app.models.research_project import ResearchProject  # noqa: E402
from app.models.species import Species  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def upsert_category(db, raw: dict) -> NewsCategory:
    category = db.query(NewsCategory).filter(NewsCategory.slug == raw["slug"]).first()
    fields = dict(slug=raw["slug"], label=raw["label"], badge_class=raw.get("badgeClass"))
    if category is None:
        category = NewsCategory(**fields)
        db.add(category)
        print(f"  + category: {raw['label']}")
    else:
        for k, v in fields.items():
            setattr(category, k, v)
        print(f"  = category: {raw['label']} (updated)")
    return category


def upsert_article(
    db,
    raw: dict,
    category_by_slug: dict[str, NewsCategory],
    species_by_slug: dict[str, Species],
    destination_by_slug: dict[str, Destination],
    research_project_by_slug: dict[str, ResearchProject],
    conservation_project_by_slug: dict[str, ConservationProject],
    experience_by_slug: dict[str, Experience],
    community_by_slug: dict[str, Community],
) -> None:
    category = category_by_slug.get(raw["category"])
    if category is None:
        print(f"  ! skipping {raw['title']}: unknown category {raw['category']!r}")
        return

    gallery = [{"url": g.get("url"), "caption": g.get("caption")} for g in raw.get("gallery", [])]
    content = [
        {"type": b.get("type"), "text": b.get("text"), "attribution": b.get("attribution")}
        for b in raw.get("content", [])
    ]

    fields = dict(
        slug=raw["slug"],
        title=raw["title"],
        category_id=category.id,
        author=raw.get("author"),
        date=raw.get("date"),
        display_date=raw.get("displayDate"),
        read_time=raw.get("readTime"),
        featured_image=raw.get("featuredImage"),
        gallery=gallery,
        excerpt=raw.get("excerpt"),
        content=content,
        featured=raw.get("featured", False),
        published=raw.get("published", True),
    )

    destinations = [destination_by_slug[s] for s in raw.get("destinationSlugs", []) if s in destination_by_slug]
    species = [species_by_slug[s] for s in raw.get("speciesSlugs", []) if s in species_by_slug]
    research_projects = [research_project_by_slug[s] for s in raw.get("researchProjectSlugs", []) if s in research_project_by_slug]
    conservation_projects = [conservation_project_by_slug[s] for s in raw.get("conservationProjectSlugs", []) if s in conservation_project_by_slug]
    experiences = [experience_by_slug[s] for s in raw.get("experienceSlugs", []) if s in experience_by_slug]
    communities = [community_by_slug[s] for s in raw.get("communitySlugs", []) if s in community_by_slug]

    article = db.query(NewsArticle).filter(NewsArticle.slug == raw["slug"]).first()
    if article is None:
        article = NewsArticle(**fields)
        article.destinations = destinations
        article.species = species
        article.research_projects = research_projects
        article.conservation_projects = conservation_projects
        article.experiences = experiences
        article.communities = communities
        db.add(article)
        print(f"  + article: {raw['title']}")
    else:
        for k, v in fields.items():
            setattr(article, k, v)
        article.destinations = destinations
        article.species = species
        article.research_projects = research_projects
        article.conservation_projects = conservation_projects
        article.experiences = experiences
        article.communities = communities
        print(f"  = article: {raw['title']} (updated)")


def main() -> None:
    categories_raw = json.loads((SEED_DIR / "news_categories.json").read_text())
    articles_raw = json.loads((SEED_DIR / "news_articles.json").read_text())

    db = SessionLocal()
    try:
        print(f"Seeding {len(categories_raw)} news categories...")
        for raw in categories_raw:
            upsert_category(db, raw)
        db.commit()

        category_by_slug = {c.slug: c for c in db.query(NewsCategory).all()}
        species_by_slug = {s.slug: s for s in db.query(Species).all()}
        destination_by_slug = {d.slug: d for d in db.query(Destination).all()}
        research_project_by_slug = {p.slug: p for p in db.query(ResearchProject).all()}
        conservation_project_by_slug = {p.slug: p for p in db.query(ConservationProject).all()}
        experience_by_slug = {e.slug: e for e in db.query(Experience).all()}
        community_by_slug = {c.slug: c for c in db.query(Community).all()}

        if not species_by_slug:
            print("Warning: no species found — run scripts/seed_marine_life.py first.")
        if not destination_by_slug:
            print("Warning: no destinations found — run scripts/seed_coast.py first.")
        if not research_project_by_slug:
            print("Warning: no research projects found — run scripts/seed_research.py first.")
        if not conservation_project_by_slug:
            print("Warning: no conservation projects found — run scripts/seed_conservation_communities.py first.")
        if not experience_by_slug:
            print("Warning: no experiences found — run scripts/seed_experiences.py first.")

        print(f"Seeding {len(articles_raw)} news articles...")
        for raw in articles_raw:
            upsert_article(
                db, raw, category_by_slug, species_by_slug, destination_by_slug,
                research_project_by_slug, conservation_project_by_slug, experience_by_slug, community_by_slug,
            )
        db.commit()

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
