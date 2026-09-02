from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.experience import ExperienceStatus


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None


class ExperienceStory(BaseModel):
    whatItIs: str | None = None
    whereItHappens: str | None = None
    whatToExpect: str | None = None


class CategorySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


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


class ExperienceBase(BaseModel):
    slug: str
    title: str
    status: ExperienceStatus = ExperienceStatus.COMING_SOON
    tagline: str | None = None
    short_description: str | None = None
    story: ExperienceStory = ExperienceStory()
    region: str | None = None
    location: str | None = None
    duration: str | None = None
    difficulty: str | None = None
    best_season: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] = []
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    highlights: list[str] = []
    conservation_themes: list[str] = []
    featured: bool = False
    published: bool = True


class ExperienceCreate(ExperienceBase):
    category_id: UUID
    destination_ids: list[UUID] = []
    marine_species_ids: list[UUID] = []


class ExperienceUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    category_id: UUID | None = None
    status: ExperienceStatus | None = None
    tagline: str | None = None
    short_description: str | None = None
    story: ExperienceStory | None = None
    region: str | None = None
    location: str | None = None
    duration: str | None = None
    difficulty: str | None = None
    best_season: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] | None = None
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    highlights: list[str] | None = None
    conservation_themes: list[str] | None = None
    featured: bool | None = None
    published: bool | None = None
    destination_ids: list[UUID] | None = None
    marine_species_ids: list[UUID] | None = None


class ExperienceRead(ExperienceBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category: CategorySummary
    destinations: list[DestinationSummary] = []
    marine_species: list[SpeciesSummary] = []
