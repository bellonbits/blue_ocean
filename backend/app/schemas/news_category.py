from uuid import UUID

from pydantic import BaseModel, ConfigDict


class NewsCategoryBase(BaseModel):
    slug: str
    label: str
    badge_class: str | None = None


class NewsCategoryCreate(NewsCategoryBase):
    pass


class NewsCategoryUpdate(BaseModel):
    slug: str | None = None
    label: str | None = None
    badge_class: str | None = None


class NewsCategoryRead(NewsCategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    article_count: int = 0
