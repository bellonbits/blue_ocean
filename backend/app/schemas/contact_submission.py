from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    organization: str | None = None
    subject: str
    message: str


class ContactSubmissionUpdate(BaseModel):
    is_read: bool | None = None
    is_favorite: bool | None = None


class ContactSubmissionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: str
    phone: str | None = None
    organization: str | None = None
    subject: str
    message: str
    is_read: bool
    is_favorite: bool
    created_at: datetime
