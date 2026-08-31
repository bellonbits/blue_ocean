from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UploaderSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: str
    full_name: str | None = None


class MediaUpdate(BaseModel):
    alt_text: str | None = None


class MediaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    filename: str
    url: str
    mime_type: str
    size_bytes: int
    alt_text: str | None = None
    uploaded_by: UploaderSummary | None = None
    created_at: datetime
