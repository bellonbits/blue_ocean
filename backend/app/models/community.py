"""Coastal communities Blue Ocean partners with (fishing cooperatives,
traditional-knowledge keepers, youth groups, ...).

`category` stays a plain string (like `Expedition.status`), not its own
table — the frontend's `COMMUNITY_CATEGORIES` vocabulary is never
expanded into a nested object in resolved output (unlike
`ExperienceCategory` or `ConservationIssue`), it's read back as the same
flat id it was written as, so a join table would add a relationship
nothing actually queries through.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Community(Base):
    __tablename__ = "communities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str | None] = mapped_column(String(100))
    location: Mapped[str | None] = mapped_column(String(255))
    region: Mapped[str | None] = mapped_column(String(100))
    hero_image: Mapped[str | None] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text)
    livelihoods: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    marine_connection: Mapped[str | None] = mapped_column(Text)
    conservation_activities: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    stories: Mapped[list["CommunityStory"]] = relationship(back_populates="community")
