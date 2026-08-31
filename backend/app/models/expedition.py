"""Fieldwork expeditions people can join. `status` stays a plain string
(not an enum) — currently only 'coming-soon' appears in the source
content, and unlike ProjectStatus the frontend never defines this as a
fixed vocabulary, so it's left open for future values (e.g. 'open',
'full') without a migration."""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

expedition_species = Table(
    "expedition_species",
    Base.metadata,
    Column("expedition_id", UUID(as_uuid=True), ForeignKey("expeditions.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)


class Expedition(Base):
    __tablename__ = "expeditions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str | None] = mapped_column(String(255))
    region: Mapped[str | None] = mapped_column(String(100))
    dates: Mapped[str | None] = mapped_column(String(100))
    duration: Mapped[str | None] = mapped_column(String(100))
    purpose: Mapped[str | None] = mapped_column(Text)

    area_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("research_areas.id"), nullable=True)
    area: Mapped["ResearchArea | None"] = relationship()

    research_team_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("research_teams.id"), nullable=True
    )
    research_team: Mapped["ResearchTeam | None"] = relationship()

    requirements: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    status: Mapped[str] = mapped_column(String(50), default="coming-soon", nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    species: Mapped[list["Species"]] = relationship(secondary=expedition_species)
