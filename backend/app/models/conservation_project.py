"""
Conservation initiatives — the frontend's most cross-linked content type
yet: real many-to-many links to ConservationIssue, Species, Destination,
ResearchProject (B5), and Community (this sprint).

`status` is a real closed enum (ConservationStatus) — the frontend's
CONSERVATION_STATUSES is a fixed 4-value list, same call as
ProjectStatus (B5) and ExperienceStatus (B6).

CONSERVATION_APPROACH_STEPS (the "Research -> Understand -> Engage ->
Protect -> Measure" steps) isn't modeled anywhere — it's static
"Our Approach" page copy, never referenced by slug from any project or
other entity, unlike CONSERVATION_ISSUES.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ConservationStatus(str, enum.Enum):
    PLANNED = "Planned"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    COMING_SOON = "Coming Soon"


conservation_project_issues = Table(
    "conservation_project_issues",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("issue_id", UUID(as_uuid=True), ForeignKey("conservation_issues.id", ondelete="CASCADE"), primary_key=True),
)

conservation_project_species = Table(
    "conservation_project_species",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)

conservation_project_destinations = Table(
    "conservation_project_destinations",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("destination_id", UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
)

conservation_project_research_projects = Table(
    "conservation_project_research_projects",
    Base.metadata,
    Column("conservation_project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("research_project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
)

conservation_project_communities = Table(
    "conservation_project_communities",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
    Column("community_id", UUID(as_uuid=True), ForeignKey("communities.id", ondelete="CASCADE"), primary_key=True),
)


class ConservationProject(Base):
    __tablename__ = "conservation_projects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)

    focus_area_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("conservation_focus_areas.id"), nullable=False)
    focus_area: Mapped["ConservationFocusArea"] = relationship(back_populates="projects")

    status: Mapped[ConservationStatus] = mapped_column(Enum(ConservationStatus, name="conservation_project_status"), nullable=False)
    region: Mapped[str | None] = mapped_column(String(100))
    start_date: Mapped[str | None] = mapped_column(String(20))
    end_date: Mapped[str | None] = mapped_column(String(20))

    summary: Mapped[str | None] = mapped_column(Text)
    editorial_statement: Mapped[str | None] = mapped_column(Text)
    what_it_is: Mapped[str | None] = mapped_column(Text)
    why_it_matters: Mapped[str | None] = mapped_column(Text)
    who_is_involved: Mapped[str | None] = mapped_column(Text)
    aims: Mapped[str | None] = mapped_column(Text)
    problem_statement: Mapped[str | None] = mapped_column(Text)

    hero_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    issues: Mapped[list["ConservationIssue"]] = relationship(secondary=conservation_project_issues)
    species: Mapped[list["Species"]] = relationship(secondary=conservation_project_species)
    destinations: Mapped[list["Destination"]] = relationship(secondary=conservation_project_destinations)
    research_projects: Mapped[list["ResearchProject"]] = relationship(secondary=conservation_project_research_projects)
    communities: Mapped[list["Community"]] = relationship(secondary=conservation_project_communities)
