"""Unified Search API — Sprint B12.

Searches across all published public content:
- Destinations (Sprint B3)
- Marine Species (Sprint B4)
- Research Projects (Sprint B5)
- Ocean Experiences (Sprint B6)
- Conservation Projects (Sprint B7)
- Community Stories (Sprint B7)
- News Articles (Sprint B8)

Supports query matching across names, titles, vernacular terms, scientific
names, taxonomy, locations, and descriptions, with relevance ordering and
type filtering.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.models.community_story import CommunityStory
from app.models.conservation_project import ConservationProject
from app.models.destination import Destination, DestinationStatus
from app.models.experience import Experience, ExperienceStatus
from app.models.news_article import NewsArticle
from app.models.research_project import ResearchProject
from app.models.species import Species
from app.schemas.search import SearchContentType, SearchResponse, SearchResultItem

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=SearchResponse)
def search_content(
    q: str = Query(default="", description="Search query string"),
    type: SearchContentType | None = Query(default=None, description="Optional content type filter"),
    limit: int = Query(default=20, ge=1, le=100, description="Max results to return"),
    offset: int = Query(default=0, ge=0, description="Offset for pagination"),
    db: Session = Depends(get_db),
) -> SearchResponse:
    query_str = q.strip()
    if not query_str:
        return SearchResponse(
            query=q,
            total=0,
            counts_by_type={t.value: 0 for t in SearchContentType},
            results=[],
        )

    term = f"%{query_str}%"
    q_lower = query_str.lower()

    # Accumulated results with a relevance tier (1 = title/name match, 2 = subtitle/species match, 3 = body match)
    scored_results: list[tuple[int, SearchResultItem]] = []
    type_counts: dict[str, int] = {t.value: 0 for t in SearchContentType}

    # 1. Destinations
    if type is None or type == SearchContentType.DESTINATION:
        dest_cond = or_(
            Destination.name.ilike(term),
            Destination.tagline.ilike(term),
            Destination.short_description.ilike(term),
            Destination.full_description.ilike(term),
            Destination.location.ilike(term),
            Destination.destination_type.ilike(term),
            Destination.coastline_area.ilike(term),
        )
        dest_rows = (
            db.query(Destination)
            .options(joinedload(Destination.region))
            .filter(Destination.status == DestinationStatus.PUBLISHED, dest_cond)
            .all()
        )
        type_counts[SearchContentType.DESTINATION.value] = len(dest_rows)
        for d in dest_rows:
            tier = 1 if q_lower in d.name.lower() else (2 if d.tagline and q_lower in d.tagline.lower() else 3)
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=d.id,
                        type=SearchContentType.DESTINATION,
                        title=d.name,
                        subtitle=d.tagline or d.location,
                        slug=d.slug,
                        url=f"/explore-the-coast/{d.slug}",
                        description=d.short_description or d.full_description,
                        image=d.hero_image,
                        badge=d.region.name if d.region else "Destination",
                    ),
                )
            )

    # 2. Species
    if type is None or type == SearchContentType.SPECIES:
        species_cond = or_(
            Species.common_name.ilike(term),
            Species.scientific_name.ilike(term),
            Species.somali_name.ilike(term),
            Species.taxonomic_group.ilike(term),
            Species.tagline.ilike(term),
            Species.description.ilike(term),
            Species.editorial_statement.ilike(term),
            Species.habitat.ilike(term),
        )
        species_rows = (
            db.query(Species)
            .options(joinedload(Species.category))
            .filter(Species.published.is_(True), species_cond)
            .all()
        )
        type_counts[SearchContentType.SPECIES.value] = len(species_rows)
        for s in species_rows:
            tier = 1 if q_lower in s.common_name.lower() else (
                2 if (s.scientific_name and q_lower in s.scientific_name.lower()) or (s.somali_name and q_lower in s.somali_name.lower()) else 3
            )
            sub = f"{s.scientific_name} ({s.somali_name})" if (s.scientific_name and s.somali_name) else (s.scientific_name or s.somali_name)
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=s.id,
                        type=SearchContentType.SPECIES,
                        title=s.common_name,
                        subtitle=sub,
                        slug=s.slug,
                        url=f"/marine-life/species/{s.slug}",
                        description=s.description or s.editorial_statement,
                        image=s.hero_image,
                        badge=s.conservation_status.value if s.conservation_status else "Species",
                    ),
                )
            )

    # 3. Research Projects
    if type is None or type == SearchContentType.RESEARCH_PROJECT:
        proj_cond = or_(
            ResearchProject.title.ilike(term),
            ResearchProject.region.ilike(term),
            ResearchProject.summary.ilike(term),
            ResearchProject.editorial_statement.ilike(term),
            ResearchProject.research_question.ilike(term),
            ResearchProject.purpose.ilike(term),
            ResearchProject.geographic_scope.ilike(term),
            ResearchProject.expected_outcomes.ilike(term),
        )
        proj_rows = (
            db.query(ResearchProject)
            .options(joinedload(ResearchProject.area))
            .filter(ResearchProject.published.is_(True), proj_cond)
            .all()
        )
        type_counts[SearchContentType.RESEARCH_PROJECT.value] = len(proj_rows)
        for p in proj_rows:
            tier = 1 if q_lower in p.title.lower() else (2 if p.region and q_lower in p.region.lower() else 3)
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=p.id,
                        type=SearchContentType.RESEARCH_PROJECT,
                        title=p.title,
                        subtitle=p.region or (p.area.title if p.area else None),
                        slug=p.slug,
                        url=f"/research/projects/{p.slug}",
                        description=p.summary,
                        image=p.hero_image,
                        badge=p.status.value if p.status else "Research",
                    ),
                )
            )

    # 4. Ocean Experiences
    if type is None or type == SearchContentType.EXPERIENCE:
        exp_cond = or_(
            Experience.title.ilike(term),
            Experience.tagline.ilike(term),
            Experience.short_description.ilike(term),
            Experience.location.ilike(term),
            Experience.region.ilike(term),
        )
        exp_rows = (
            db.query(Experience)
            .options(joinedload(Experience.category))
            .filter(Experience.published.is_(True), exp_cond)
            .all()
        )
        type_counts[SearchContentType.EXPERIENCE.value] = len(exp_rows)
        for e in exp_rows:
            tier = 1 if q_lower in e.title.lower() else (2 if e.tagline and q_lower in e.tagline.lower() else 3)
            badge_val = "Coming Soon" if e.status == ExperienceStatus.COMING_SOON else (e.status.value if e.status else "Experience")
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=e.id,
                        type=SearchContentType.EXPERIENCE,
                        title=e.title,
                        subtitle=e.tagline or e.location,
                        slug=e.slug,
                        url=f"/ocean-experiences/{e.slug}",
                        description=e.short_description,
                        image=e.hero_image,
                        badge=badge_val,
                    ),
                )
            )

    # 5. Conservation Projects
    if type is None or type == SearchContentType.CONSERVATION_PROJECT:
        cp_cond = or_(
            ConservationProject.title.ilike(term),
            ConservationProject.region.ilike(term),
            ConservationProject.summary.ilike(term),
            ConservationProject.editorial_statement.ilike(term),
            ConservationProject.what_it_is.ilike(term),
            ConservationProject.why_it_matters.ilike(term),
            ConservationProject.who_is_involved.ilike(term),
            ConservationProject.aims.ilike(term),
            ConservationProject.problem_statement.ilike(term),
        )
        cp_rows = (
            db.query(ConservationProject)
            .options(joinedload(ConservationProject.focus_area))
            .filter(ConservationProject.published.is_(True), cp_cond)
            .all()
        )
        type_counts[SearchContentType.CONSERVATION_PROJECT.value] = len(cp_rows)
        for cp in cp_rows:
            tier = 1 if q_lower in cp.title.lower() else (2 if cp.region and q_lower in cp.region.lower() else 3)
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=cp.id,
                        type=SearchContentType.CONSERVATION_PROJECT,
                        title=cp.title,
                        subtitle=cp.region or (cp.focus_area.title if cp.focus_area else None),
                        slug=cp.slug,
                        url=f"/conservation/projects/{cp.slug}",
                        description=cp.summary,
                        image=cp.hero_image,
                        badge=cp.status.value if cp.status else "Conservation",
                    ),
                )
            )

    # 6. Community Stories
    if type is None or type == SearchContentType.COMMUNITY_STORY:
        cs_cond = or_(
            CommunityStory.title.ilike(term),
            CommunityStory.category.ilike(term),
            CommunityStory.location.ilike(term),
            CommunityStory.region.ilike(term),
            CommunityStory.author.ilike(term),
            CommunityStory.marine_connection.ilike(term),
        )
        cs_rows = (
            db.query(CommunityStory)
            .options(joinedload(CommunityStory.community))
            .filter(CommunityStory.published.is_(True), cs_cond)
            .all()
        )
        type_counts[SearchContentType.COMMUNITY_STORY.value] = len(cs_rows)
        for cs in cs_rows:
            tier = 1 if q_lower in cs.title.lower() else 3
            desc = cs.marine_connection or (cs.story_content[0] if cs.story_content else None)
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=cs.id,
                        type=SearchContentType.COMMUNITY_STORY,
                        title=cs.title,
                        subtitle=cs.location or cs.region,
                        slug=cs.slug,
                        url=f"/coastal-communities/{cs.slug}",
                        description=desc,
                        image=cs.featured_image,
                        badge=cs.community.name if cs.community else "Community",
                    ),
                )
            )

    # 7. News Articles
    if type is None or type == SearchContentType.NEWS_ARTICLE:
        art_cond = or_(
            NewsArticle.title.ilike(term),
            NewsArticle.author.ilike(term),
            NewsArticle.excerpt.ilike(term),
        )
        art_rows = (
            db.query(NewsArticle)
            .options(joinedload(NewsArticle.category))
            .filter(NewsArticle.published.is_(True), art_cond)
            .all()
        )
        type_counts[SearchContentType.NEWS_ARTICLE.value] = len(art_rows)
        for art in art_rows:
            tier = 1 if q_lower in art.title.lower() else 3
            scored_results.append(
                (
                    tier,
                    SearchResultItem(
                        id=art.id,
                        type=SearchContentType.NEWS_ARTICLE,
                        title=art.title,
                        subtitle=art.author or (art.category.label if art.category else None),
                        slug=art.slug,
                        url=f"/news/{art.slug}",
                        description=art.excerpt,
                        image=art.featured_image,
                        badge=art.category.label if art.category else "News",
                    ),
                )
            )

    # Sort by tier (tier 1 matches first), then alphabetically by title
    scored_results.sort(key=lambda x: (x[0], x[1].title.lower()))

    total = len(scored_results)
    paginated = [item for _, item in scored_results[offset : offset + limit]]

    return SearchResponse(
        query=q,
        total=total,
        counts_by_type=type_counts,
        results=paginated,
    )
