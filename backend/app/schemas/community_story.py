from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CommunitySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class ConservationProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class SpeciesSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    common_name: str
    scientific_name: str | None = None
    hero_image: str | None = None


class CommunityStoryBase(BaseModel):
    slug: str
    title: str
    category: str | None = None
    location: str | None = None
    region: str | None = None
    featured_image: str | None = None
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    author: str | None = None
    date: str | None = None
    story_content: list[str] = []
    marine_connection: str | None = None
    featured: bool = False
    published: bool = True


class CommunityStoryCreate(CommunityStoryBase):
    community_id: UUID
    conservation_project_id: UUID | None = None
    species_ids: list[UUID] = []


class CommunityStoryUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    category: str | None = None
    community_id: UUID | None = None
    conservation_project_id: UUID | None = None
    location: str | None = None
    region: str | None = None
    featured_image: str | None = None
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    author: str | None = None
    date: str | None = None
    story_content: list[str] | None = None
    marine_connection: str | None = None
    featured: bool | None = None
    published: bool | None = None
    species_ids: list[UUID] | None = None


class CommunityStoryRead(CommunityStoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    community: CommunitySummary
    conservation_project: ConservationProjectSummary | None = None
    species: list[SpeciesSummary] = []
