from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.application import ApplicationStatus, ApplicationType


class ApplicationCreate(BaseModel):
    application_type: ApplicationType
    name: str
    email: EmailStr
    phone: str | None = None
    details: dict = {}


class ApplicationUpdate(BaseModel):
    status: ApplicationStatus


class ApplicationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    application_type: ApplicationType
    status: ApplicationStatus
    name: str
    email: str
    phone: str | None = None
    details: dict
    created_at: datetime
