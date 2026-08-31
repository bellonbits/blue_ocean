from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AreaSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class ResearchTeamBase(BaseModel):
    slug: str
    name: str
    description: str | None = None
    icon: str | None = None


class ResearchTeamCreate(ResearchTeamBase):
    focus_area_ids: list[UUID] = []


class ResearchTeamUpdate(BaseModel):
    slug: str | None = None
    name: str | None = None
    description: str | None = None
    icon: str | None = None
    focus_area_ids: list[UUID] | None = None


class ResearchTeamRead(ResearchTeamBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    focus_areas: list[AreaSummary] = []
    project_count: int = 0
