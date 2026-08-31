from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ResearchAreaBase(BaseModel):
    slug: str
    title: str
    description: str | None = None
    image: str | None = None
    tag: str | None = None
    color: str | None = None
    border_color: str | None = None
    text_color: str | None = None


class ResearchAreaCreate(ResearchAreaBase):
    pass


class ResearchAreaUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    description: str | None = None
    image: str | None = None
    tag: str | None = None
    color: str | None = None
    border_color: str | None = None
    text_color: str | None = None


class ResearchAreaRead(ResearchAreaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    project_count: int = 0
