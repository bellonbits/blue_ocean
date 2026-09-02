"""
Research projects — the richest content type so far, with real
many-to-many links to Methodology, Species (B4), and Destination (B3).

`findings` stays JSONB (title/description/source per entry) — same call
as Species.gallery in B4: structured, but scoped entirely to one
project with no independent querying need, so a child table would just
be overhead. `conservation_themes` stays free-text (ARRAY(String)) since
Conservation doesn't exist as a table yet (Sprint B7).
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ProjectStatus(str, enum.Enum):
    PLANNED = "Planned"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    PUBLISHED = "Published"


project_methodologies = Table(
    "project_methodologies",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("methodology_id", UUID(as_uuid=True), ForeignKey("methodologies.id", ondelete="CASCADE"), primary_key=True),
)

project_species = Table(
    "project_species",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)

project_destinations = Table(
    "project_destinations",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("destination_id", UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
)


class ResearchProject(Base):
    __tablename__ = "research_projects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)

    area_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_areas.id"), nullable=False)
    area: Mapped["ResearchArea"] = relationship()

    research_team_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("research_teams.id"), nullable=True
    )
    research_team: Mapped["ResearchTeam | None"] = relationship()

    status: Mapped[ProjectStatus] = mapped_column(Enum(ProjectStatus, name="project_status"), nullable=False)
    region: Mapped[str | None] = mapped_column(String(100))
    start_date: Mapped[str | None] = mapped_column(String(20))
    end_date: Mapped[str | None] = mapped_column(String(20))

    summary: Mapped[str | None] = mapped_column(Text)
    editorial_statement: Mapped[str | None] = mapped_column(Text)
    research_question: Mapped[str | None] = mapped_column(Text)
    purpose: Mapped[str | None] = mapped_column(Text)
    geographic_scope: Mapped[str | None] = mapped_column(Text)
    expected_outcomes: Mapped[str | None] = mapped_column(Text)

    hero_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    video_url: Mapped[str | None] = mapped_column(String(500))
    video_title: Mapped[str | None] = mapped_column(String(255))
    video_description: Mapped[str | None] = mapped_column(Text)
    video_source: Mapped[str | None] = mapped_column(String(255))
    objectives: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    findings: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    conservation_themes: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    methodologies: Mapped[list["Methodology"]] = relationship(secondary=project_methodologies)
    species: Mapped[list["Species"]] = relationship(secondary=project_species)
    destinations: Mapped[list["Destination"]] = relationship(secondary=project_destinations)
