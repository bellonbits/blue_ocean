"""A member's bookmarked content — the "Saved" section of the user
dashboard.

One generic table across all four bookmarkable content types
(destinations, species, experiences, research projects): same
semantics (binary saved/not-saved), same heart-icon UI, one CRUD
surface. Deliberately references the target by slug, not a FK to each
content table — species/experiences/research aren't live-API-backed
yet (they're still static src/data/*.js on the frontend), so a slug is
the only identifier that exists for all four today.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SavedItemType(str, enum.Enum):
    DESTINATION = "destination"
    SPECIES = "species"
    EXPERIENCE = "experience"
    RESEARCH = "research"


class SavedItem(Base):
    __tablename__ = "saved_items"
    __table_args__ = (
        UniqueConstraint("user_id", "content_type", "content_slug", name="uq_saved_item_user_content"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    content_type: Mapped[SavedItemType] = mapped_column(Enum(SavedItemType, name="saved_item_type"), nullable=False)
    content_slug: Mapped[str] = mapped_column(String(255), nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
