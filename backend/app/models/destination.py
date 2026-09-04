"""
Individual coastal destinations (Bosaso, Eyl, Kismayo, ...).

Cross-links to species, research projects, and experiences (present in
the frontend's static data) aren't modeled here yet — those tables
don't exist until Sprints B4 (Marine Life), B5 (Research), and B6
(Experiences). Wiring real foreign keys happens then rather than
guessing the shape now.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, Float, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DestinationStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class Destination(Base):
    __tablename__ = "destinations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)

    region_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("regions.id"), nullable=False)
    region: Mapped["Region"] = relationship(back_populates="destinations")

    location: Mapped[str | None] = mapped_column(String(255))
    coastline_area: Mapped[str | None] = mapped_column(String(255))
    destination_type: Mapped[str | None] = mapped_column(String(255))
    tagline: Mapped[str | None] = mapped_column(Text)
    short_description: Mapped[str | None] = mapped_column(Text)
    full_description: Mapped[str | None] = mapped_column(Text)

    hero_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    video_url: Mapped[str | None] = mapped_column(String(500))
    video_title: Mapped[str | None] = mapped_column(String(255))
    video_description: Mapped[str | None] = mapped_column(Text)
    video_source: Mapped[str | None] = mapped_column(String(255))

    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)

    best_season: Mapped[str | None] = mapped_column(String(255))
    access: Mapped[str | None] = mapped_column(String(255))
    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    status: Mapped[DestinationStatus] = mapped_column(
        Enum(DestinationStatus, name="destination_status"), nullable=False, default=DestinationStatus.DRAFT
    )

    # --- Google Places (New) photo sourcing ---
    # google_place_id is a stable Google identifier — safe to persist.
    # google_photos_cache/fetched_at are a short-lived cache of the photo
    # metadata Places returns (never the raw image), refreshed by
    # GOOGLE_PLACES_CACHE_HOURS rather than kept forever — see
    # app/services/google_places.py.
    google_place_id: Mapped[str | None] = mapped_column(String(255))
    google_photos_cache: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    google_photos_fetched_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    translations: Mapped[list["DestinationTranslation"]] = relationship(
        back_populates="destination", cascade="all, delete-orphan"
    )


class DestinationTranslation(Base):
    """Non-English content for a destination — English itself lives on the
    base `Destination` row (name/tagline/short_description/full_description/
    highlights), so this table only ever holds the other languages (today,
    just 'so' for Somali). A missing row for a given language just means
    that translation hasn't been written yet; the public API falls back to
    the English base fields rather than showing a blank page (see
    `_localize` in destinations.py) — first-draft-then-human-review Somali
    content is still better represented as "not yet translated" than as
    silently-wrong English.
    """

    __tablename__ = "destination_translations"
    __table_args__ = (UniqueConstraint("destination_id", "language", name="uq_destination_translation_language"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    destination_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), nullable=False, index=True
    )
    language: Mapped[str] = mapped_column(String(5), nullable=False)

    title: Mapped[str | None] = mapped_column(String(150))
    tagline: Mapped[str | None] = mapped_column(Text)
    short_description: Mapped[str | None] = mapped_column(Text)
    full_description: Mapped[str | None] = mapped_column(Text)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    destination: Mapped["Destination"] = relationship(back_populates="translations")
