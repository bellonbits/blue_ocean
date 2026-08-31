"""Institutional research units (Cetacean & Marine Mammal Research Unit, ...).

No individual researcher profiles — this is intentional (see the note
at the top of the frontend's src/data/research.js): institutional
attribution only, since no real staff photos/bios exist yet.
"""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

team_focus_areas = Table(
    "team_focus_areas",
    Base.metadata,
    Column("team_id", UUID(as_uuid=True), ForeignKey("research_teams.id", ondelete="CASCADE"), primary_key=True),
    Column("area_id", UUID(as_uuid=True), ForeignKey("research_areas.id", ondelete="CASCADE"), primary_key=True),
)


class ResearchTeam(Base):
    __tablename__ = "research_teams"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    icon: Mapped[str | None] = mapped_column(String(100))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    focus_areas: Mapped[list["ResearchArea"]] = relationship(secondary=team_focus_areas)
