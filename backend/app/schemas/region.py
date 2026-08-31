from uuid import UUID

from pydantic import BaseModel, ConfigDict


class RegionBase(BaseModel):
    slug: str
    name: str
    subtitle: str | None = None
    tagline: str | None = None
    description: str | None = None
    image: str | None = None
    coastline_km: str | None = None
    seas: list[str] = []
    highlights: list[str] = []


class RegionCreate(RegionBase):
    pass


class RegionUpdate(BaseModel):
    slug: str | None = None
    name: str | None = None
    subtitle: str | None = None
    tagline: str | None = None
    description: str | None = None
    image: str | None = None
    coastline_km: str | None = None
    seas: list[str] | None = None
    highlights: list[str] | None = None


class RegionRead(RegionBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    destinations_count: int = 0
