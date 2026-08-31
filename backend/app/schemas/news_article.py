from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None


class ContentBlock(BaseModel):
    type: str
    text: str
    attribution: str | None = None


class CategorySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    label: str
    badge_class: str | None = None


class DestinationSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class SpeciesSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    common_name: str
    scientific_name: str | None = None
    hero_image: str | None = None


class ResearchProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class ConservationProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class ExperienceSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class CommunitySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class NewsArticleBase(BaseModel):
    slug: str
    title: str
    author: str | None = None
    date: str | None = None
    display_date: str | None = None
    read_time: str | None = None
    featured_image: str | None = None
    gallery: list[GalleryImage] = []
    excerpt: str | None = None
    content: list[ContentBlock] = []
    featured: bool = False
    published: bool = True


class NewsArticleCreate(NewsArticleBase):
    category_id: UUID
    destination_ids: list[UUID] = []
    species_ids: list[UUID] = []
    research_project_ids: list[UUID] = []
    conservation_project_ids: list[UUID] = []
    experience_ids: list[UUID] = []
    community_ids: list[UUID] = []


class NewsArticleUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    category_id: UUID | None = None
    author: str | None = None
    date: str | None = None
    display_date: str | None = None
    read_time: str | None = None
    featured_image: str | None = None
    gallery: list[GalleryImage] | None = None
    excerpt: str | None = None
    content: list[ContentBlock] | None = None
    featured: bool | None = None
    published: bool | None = None
    destination_ids: list[UUID] | None = None
    species_ids: list[UUID] | None = None
    research_project_ids: list[UUID] | None = None
    conservation_project_ids: list[UUID] | None = None
    experience_ids: list[UUID] | None = None
    community_ids: list[UUID] | None = None


class NewsArticleRead(NewsArticleBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category: CategorySummary
    destinations: list[DestinationSummary] = []
    species: list[SpeciesSummary] = []
    research_projects: list[ResearchProjectSummary] = []
    conservation_projects: list[ConservationProjectSummary] = []
    experiences: list[ExperienceSummary] = []
    communities: list[CommunitySummary] = []
