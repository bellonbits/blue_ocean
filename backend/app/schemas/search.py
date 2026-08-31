from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SearchContentType(str, Enum):
    DESTINATION = "destination"
    SPECIES = "species"
    RESEARCH_PROJECT = "research_project"
    EXPERIENCE = "experience"
    CONSERVATION_PROJECT = "conservation_project"
    COMMUNITY_STORY = "community_story"
    NEWS_ARTICLE = "news_article"


class SearchResultItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    type: SearchContentType
    title: str
    subtitle: str | None = None
    slug: str
    url: str
    description: str | None = None
    image: str | None = None
    badge: str | None = None


class SearchResponse(BaseModel):
    query: str
    total: int
    counts_by_type: dict[str, int]
    results: list[SearchResultItem]
