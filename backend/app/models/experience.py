"""Ocean experiences (dhow tours, snorkeling, diving, ...) tourists can book.

`status` is a real closed enum (unlike Expedition.status) — the frontend
defines a fixed EXPERIENCE_STATUSES vocabulary of exactly four values,
each with its own label/description, so this follows the ProjectStatus
precedent rather than the Expedition one.

`story` is a small fixed-shape object (whatItIs/whereItHappens/
whatToExpect) — JSONB rather than three separate text columns, since it
is always read and written as a unit and never queried by sub-field.

The frontend also derives a `researchProjects` list per experience at
render time (via each linked species' own research-project links). That
cross-link isn't modeled here — Species doesn't expose a reverse link to
ResearchProject on the backend yet either, so replicating it here would
be inventing a relationship neither B4 nor B5 built. Left for a future
sprint if the frontend conversion needs it.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ExperienceStatus(str, enum.Enum):
    COMING_SOON = "coming-soon"
    AVAILABLE = "available"
    SEASONAL = "seasonal"
    UNAVAILABLE = "unavailable"


experience_destinations = Table(
    "experience_destinations",
    Base.metadata,
    Column("experience_id", UUID(as_uuid=True), ForeignKey("experiences.id", ondelete="CASCADE"), primary_key=True),
    Column("destination_id", UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
)

experience_species = Table(
    "experience_species",
    Base.metadata,
    Column("experience_id", UUID(as_uuid=True), ForeignKey("experiences.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)


class Experience(Base):
    __tablename__ = "experiences"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)

    category_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("experience_categories.id"), nullable=False)
    category: Mapped["ExperienceCategory"] = relationship(back_populates="experiences")

    status: Mapped[ExperienceStatus] = mapped_column(
        Enum(ExperienceStatus, name="experience_status"), nullable=False, default=ExperienceStatus.COMING_SOON
    )

    tagline: Mapped[str | None] = mapped_column(String(255))
    short_description: Mapped[str | None] = mapped_column(Text)
    story: Mapped[dict] = mapped_column(JSONB, default=dict)

    region: Mapped[str | None] = mapped_column(String(100))
    location: Mapped[str | None] = mapped_column(String(255))
    duration: Mapped[str | None] = mapped_column(String(100))
    difficulty: Mapped[str | None] = mapped_column(String(100))
    best_season: Mapped[str | None] = mapped_column(String(150))

    hero_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    video_url: Mapped[str | None] = mapped_column(String(500))
    video_title: Mapped[str | None] = mapped_column(String(255))
    video_description: Mapped[str | None] = mapped_column(Text)
    video_source: Mapped[str | None] = mapped_column(String(255))
    highlights: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    conservation_themes: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    destinations: Mapped[list["Destination"]] = relationship(secondary=experience_destinations)
    marine_species: Mapped[list["Species"]] = relationship(secondary=experience_species)
