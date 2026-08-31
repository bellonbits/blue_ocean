"""Editorial stories about a community's conservation work.

`story_content` is a list of paragraph strings — ARRAY(String), same
treatment as free-text lists elsewhere (e.g. Species.interesting_facts)
since paragraphs are read/rendered in order and never queried
individually. `community_id` is required (every story belongs to
exactly one community in the source data); `conservation_project_id` is
optional in the schema even though every current story has one, since
nothing structurally requires it.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

community_story_species = Table(
    "community_story_species",
    Base.metadata,
    Column("story_id", UUID(as_uuid=True), ForeignKey("community_stories.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)


class CommunityStory(Base):
    __tablename__ = "community_stories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str | None] = mapped_column(String(100))

    community_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("communities.id"), nullable=False)
    community: Mapped["Community"] = relationship(back_populates="stories")

    conservation_project_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("conservation_projects.id"), nullable=True
    )
    conservation_project: Mapped["ConservationProject | None"] = relationship()

    location: Mapped[str | None] = mapped_column(String(255))
    region: Mapped[str | None] = mapped_column(String(100))
    featured_image: Mapped[str | None] = mapped_column(String(500))
    author: Mapped[str | None] = mapped_column(String(255))
    date: Mapped[str | None] = mapped_column(String(20))
    story_content: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)
    marine_connection: Mapped[str | None] = mapped_column(Text)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    species: Mapped[list["Species"]] = relationship(secondary=community_story_species)
