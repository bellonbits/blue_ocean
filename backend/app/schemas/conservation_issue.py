from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ConservationIssueBase(BaseModel):
    slug: str
    label: str
    icon: str | None = None


class ConservationIssueCreate(ConservationIssueBase):
    pass


class ConservationIssueUpdate(BaseModel):
    slug: str | None = None
    label: str | None = None
    icon: str | None = None


class ConservationIssueRead(ConservationIssueBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
