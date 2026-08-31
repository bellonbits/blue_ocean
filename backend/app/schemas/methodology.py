from uuid import UUID

from pydantic import BaseModel, ConfigDict


class MethodologyBase(BaseModel):
    slug: str
    label: str
    icon: str | None = None


class MethodologyCreate(MethodologyBase):
    pass


class MethodologyUpdate(BaseModel):
    slug: str | None = None
    label: str | None = None
    icon: str | None = None


class MethodologyRead(MethodologyBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
