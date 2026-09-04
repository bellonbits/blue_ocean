from uuid import UUID

from pydantic import BaseModel, ConfigDict


class RegionTranslationIn(BaseModel):
    name: str | None = None
    subtitle: str | None = None
    tagline: str | None = None
    description: str | None = None
    highlights: list[str] | None = None


class RegionTranslationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    language: str
    name: str | None = None
    subtitle: str | None = None
    tagline: str | None = None
    description: str | None = None
    highlights: list[str] = []


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
    # Keyed by language code (e.g. "so") — English lives in the fields
    # above, so this only ever carries the non-English translations.
    translations: dict[str, RegionTranslationIn] | None = None


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
    translations: dict[str, RegionTranslationIn] | None = None


class RegionRead(RegionBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    destinations_count: int = 0
    translations: list[RegionTranslationRead] = []
