from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SpeciesCategoryBase(BaseModel):
    slug: str
    title: str
    description: str | None = None
    image: str | None = None
    count: int | None = None
    count_label: str | None = None
    group: str | None = None


class SpeciesCategoryCreate(SpeciesCategoryBase):
    pass


class SpeciesCategoryUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    description: str | None = None
    image: str | None = None
    count: int | None = None
    count_label: str | None = None
    group: str | None = None


class SpeciesCategoryRead(SpeciesCategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    species_count: int = 0
