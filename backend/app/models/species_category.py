"""Marine life taxonomic categories (Dolphins & Whales, Sharks & Rays, ...).

`count`/`count_label` are editorial figures for "estimated species
present in Somali waters" (e.g. "420+ Documented Species" for fish) —
deliberately a separate, larger claim from how many detailed Species
profiles exist in the catalog, so they're stored/editable content, not
computed from row counts.
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class SpeciesCategory(Base):
    __tablename__ = "species_categories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    image: Mapped[str | None] = mapped_column(String(500))
    count: Mapped[int | None] = mapped_column(Integer)
    count_label: Mapped[str | None] = mapped_column(String(100))
    group: Mapped[str | None] = mapped_column(String(150))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    species: Mapped[list["Species"]] = relationship(back_populates="category")
