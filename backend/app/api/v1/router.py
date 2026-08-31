"""Aggregates all /api/v1 routers. Later sprints add one include_router
call each here (conservation, communities, news, ...)."""

from fastapi import APIRouter

# Must run before any app.api.v1.* submodule is imported below: several
# route modules build joinedload(...) option tuples at import time (not
# inside a function), which forces SQLAlchemy to configure that model's
# mappers immediately — including every model it has a relationship() to,
# resolved by string name. If a related model hasn't been imported yet,
# that raises InvalidRequestError. Registering every model up front,
# before Python even starts importing route modules, avoids the bug
# depending on which order they happen to be imported in.
import app.db.models_registry  # noqa: E402,F401

from app.api.v1 import (
    admin_stats,
    auth,
    communities,
    community_stories,
    conservation_focus_areas,
    conservation_issues,
    conservation_projects,
    contact_submissions,
    destinations,
    expeditions,
    experience_categories,
    experiences,
    health,
    media,
    methodologies,
    news_articles,
    news_categories,
    organization,
    regions,
    research_areas,
    research_projects,
    research_teams,
    search,
    seo,
    species,
    species_categories,
    team_members,
    users,
)

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(regions.router)
api_router.include_router(destinations.router)
api_router.include_router(species_categories.router)
api_router.include_router(species.router)
api_router.include_router(research_areas.router)
api_router.include_router(methodologies.router)
api_router.include_router(research_teams.router)
api_router.include_router(research_projects.router)
api_router.include_router(expeditions.router)
api_router.include_router(experience_categories.router)
api_router.include_router(experiences.router)
api_router.include_router(conservation_focus_areas.router)
api_router.include_router(conservation_issues.router)
api_router.include_router(conservation_projects.router)
api_router.include_router(communities.router)
api_router.include_router(community_stories.router)
api_router.include_router(news_categories.router)
api_router.include_router(news_articles.router)
api_router.include_router(team_members.router)
api_router.include_router(organization.router)
api_router.include_router(contact_submissions.router)
api_router.include_router(media.router)
api_router.include_router(admin_stats.router)
api_router.include_router(search.router)
api_router.include_router(seo.router)
