from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.saved_item import SavedItemType


class SavedItemCreate(BaseModel):
    content_type: SavedItemType
    content_slug: str


class SavedItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    content_type: SavedItemType
    content_slug: str
    created_at: datetime
