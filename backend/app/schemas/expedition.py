from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AreaSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class TeamSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class SpeciesSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    common_name: str
    scientific_name: str | None = None
    hero_image: str | None = None


class ExpeditionBase(BaseModel):
    slug: str
    title: str
    location: str | None = None
    region: str | None = None
    dates: str | None = None
    duration: str | None = None
    purpose: str | None = None
    requirements: list[str] = []
    status: str = "coming-soon"
    published: bool = True


class ExpeditionCreate(ExpeditionBase):
    area_id: UUID | None = None
    research_team_id: UUID | None = None
    species_ids: list[UUID] = []


class ExpeditionUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    location: str | None = None
    region: str | None = None
    dates: str | None = None
    duration: str | None = None
    purpose: str | None = None
    requirements: list[str] | None = None
    status: str | None = None
    published: bool | None = None
    area_id: UUID | None = None
    research_team_id: UUID | None = None
    species_ids: list[UUID] | None = None


class ExpeditionRead(ExpeditionBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    area: AreaSummary | None = None
    research_team: TeamSummary | None = None
    species: list[SpeciesSummary] = []
