"""Somalia's coastal regions (Puntland, Jubaland, Central & Southern Coast)."""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Region(Base):
    __tablename__ = "regions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    subtitle: Mapped[str | None] = mapped_column(String(255))
    tagline: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    image: Mapped[str | None] = mapped_column(String(500))
    # Kept as a display string ("Approx. 2,000 km") to match how this is
    # authored today, rather than forcing it into a bare number.
    coastline_km: Mapped[str | None] = mapped_column(String(100))
    seas: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    destinations: Mapped[list["Destination"]] = relationship(back_populates="region")
    translations: Mapped[list["RegionTranslation"]] = relationship(
        back_populates="region", cascade="all, delete-orphan"
    )


class RegionTranslation(Base):
    """Non-English content for a region — same pattern as
    DestinationTranslation in app/models/destination.py: English lives on
    the base Region row, this table only ever holds the other languages."""

    __tablename__ = "region_translations"
    __table_args__ = (UniqueConstraint("region_id", "language", name="uq_region_translation_language"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    region_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("regions.id", ondelete="CASCADE"), nullable=False, index=True
    )
    language: Mapped[str] = mapped_column(String(5), nullable=False)

    name: Mapped[str | None] = mapped_column(String(150))
    subtitle: Mapped[str | None] = mapped_column(String(255))
    tagline: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    region: Mapped["Region"] = relationship(back_populates="translations")
