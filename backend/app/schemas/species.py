from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.species import ConservationStatus


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None
    photographer: str | None = None


class SpeciesCategorySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class DestinationSummary(BaseModel):
    """Minimal destination info embedded in a species response."""

    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class SpeciesBase(BaseModel):
    slug: str
    common_name: str
    somali_name: str | None = None
    scientific_name: str | None = None
    taxonomic_group: str | None = None
    tagline: str | None = None
    editorial_statement: str | None = None
    description: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] = []
    habitat: str | None = None
    depth: str | None = None
    distribution: str | None = None
    diet: str | None = None
    size: str | None = None
    weight: str | None = None
    lifespan: str | None = None
    conservation_status: ConservationStatus = ConservationStatus.LEAST_CONCERN
    status_explanation: str | None = None
    interesting_facts: list[str] = []
    featured: bool = False
    published: bool = True


class SpeciesCreate(SpeciesBase):
    category_id: UUID
    destination_ids: list[UUID] = []


class SpeciesUpdate(BaseModel):
    slug: str | None = None
    common_name: str | None = None
    somali_name: str | None = None
    scientific_name: str | None = None
    category_id: UUID | None = None
    taxonomic_group: str | None = None
    tagline: str | None = None
    editorial_statement: str | None = None
    description: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] | None = None
    habitat: str | None = None
    depth: str | None = None
    distribution: str | None = None
    diet: str | None = None
    size: str | None = None
    weight: str | None = None
    lifespan: str | None = None
    conservation_status: ConservationStatus | None = None
    status_explanation: str | None = None
    interesting_facts: list[str] | None = None
    featured: bool | None = None
    published: bool | None = None
    destination_ids: list[UUID] | None = None


class SpeciesRead(SpeciesBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category: SpeciesCategorySummary
    destinations: list[DestinationSummary] = []
