from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ExperienceCategoryBase(BaseModel):
    slug: str
    title: str
    tagline: str | None = None
    description: str | None = None
    icon: str | None = None
    image: str | None = None


class ExperienceCategoryCreate(ExperienceCategoryBase):
    pass


class ExperienceCategoryUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    tagline: str | None = None
    description: str | None = None
    icon: str | None = None
    image: str | None = None


class ExperienceCategoryRead(ExperienceCategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    experiences_count: int = 0
