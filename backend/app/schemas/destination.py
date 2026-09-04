from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.destination import DestinationStatus


class DestinationRegionSummary(BaseModel):
    """Minimal region info embedded in a destination response."""

    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class DestinationTranslationIn(BaseModel):
    title: str | None = None
    tagline: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    highlights: list[str] | None = None


class DestinationTranslationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    language: str
    title: str | None = None
    tagline: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    highlights: list[str] = []


class DestinationBase(BaseModel):
    slug: str
    name: str
    location: str | None = None
    coastline_area: str | None = None
    destination_type: str | None = None
    tagline: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    hero_image: str | None = None
    gallery: list[str] = []
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    best_season: str | None = None
    access: str | None = None
    featured: bool = False
    highlights: list[str] = []
    status: DestinationStatus = DestinationStatus.DRAFT
    # Keyed by language code (e.g. "so") — English lives in the fields
    # above, so this only ever carries the non-English translations.
    translations: dict[str, DestinationTranslationIn] | None = None


class DestinationCreate(DestinationBase):
    region_id: UUID


class DestinationUpdate(BaseModel):
    slug: str | None = None
    name: str | None = None
    region_id: UUID | None = None
    location: str | None = None
    coastline_area: str | None = None
    destination_type: str | None = None
    tagline: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    hero_image: str | None = None
    gallery: list[str] | None = None
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    best_season: str | None = None
    access: str | None = None
    featured: bool | None = None
    highlights: list[str] | None = None
    status: DestinationStatus | None = None
    translations: dict[str, DestinationTranslationIn] | None = None


class DestinationRead(DestinationBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    region: DestinationRegionSummary
    translations: list[DestinationTranslationRead] = []
