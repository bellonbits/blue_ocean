"""
Individual documented species.

Links to destinations are a real many-to-many (Destination already
exists as of Sprint B3). Links to research/conservation projects stay
unmodeled until those tables exist (Sprints B5, B7).
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ConservationStatus(str, enum.Enum):
    LEAST_CONCERN = "Least Concern"
    NEAR_THREATENED = "Near Threatened"
    VULNERABLE = "Vulnerable"
    ENDANGERED = "Endangered"
    CRITICALLY_ENDANGERED = "Critically Endangered"
    DATA_DEFICIENT = "Data Deficient"


species_destinations = Table(
    "species_destinations",
    Base.metadata,
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
    Column("destination_id", UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
)


class Species(Base):
    __tablename__ = "species"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    common_name: Mapped[str] = mapped_column(String(150), nullable=False)
    somali_name: Mapped[str | None] = mapped_column(String(150))
    scientific_name: Mapped[str | None] = mapped_column(String(200))

    category_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("species_categories.id"), nullable=False)
    category: Mapped["SpeciesCategory"] = relationship(back_populates="species")

    taxonomic_group: Mapped[str | None] = mapped_column(String(150))
    tagline: Mapped[str | None] = mapped_column(String(255))
    editorial_statement: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)

    hero_image: Mapped[str | None] = mapped_column(String(500))
    # [{url, caption, photographer}, ...] — structured, so JSONB rather
    # than a plain string array.
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    habitat: Mapped[str | None] = mapped_column(String(255))
    depth: Mapped[str | None] = mapped_column(String(100))
    distribution: Mapped[str | None] = mapped_column(Text)
    diet: Mapped[str | None] = mapped_column(Text)
    size: Mapped[str | None] = mapped_column(String(100))
    weight: Mapped[str | None] = mapped_column(String(100))
    lifespan: Mapped[str | None] = mapped_column(String(100))

    conservation_status: Mapped[ConservationStatus] = mapped_column(
        Enum(ConservationStatus, name="conservation_status"), nullable=False, default=ConservationStatus.LEAST_CONCERN
    )
    status_explanation: Mapped[str | None] = mapped_column(Text)
    interesting_facts: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    destinations: Mapped[list["Destination"]] = relationship(secondary=species_destinations)
