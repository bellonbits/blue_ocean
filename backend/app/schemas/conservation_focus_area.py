from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ConservationFocusAreaBase(BaseModel):
    slug: str
    title: str
    description: str | None = None
    image: str | None = None


class ConservationFocusAreaCreate(ConservationFocusAreaBase):
    pass


class ConservationFocusAreaUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    description: str | None = None
    image: str | None = None


class ConservationFocusAreaRead(ConservationFocusAreaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    project_count: int = 0
