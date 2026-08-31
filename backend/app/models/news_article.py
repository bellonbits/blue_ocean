"""
News articles — the most cross-linked content type yet: real
many-to-many links to Destination, Species, ResearchProject (B5),
ConservationProject (B7), Experience (B6), and Community (B7).

`content` is a JSONB list of rich-text blocks (`{type, text}`, plus
`attribution` for pullquotes) — structured, ordered, and rendered as a
unit, same treatment as ResearchProject.findings. `date` and
`display_date` both come straight from the source content (an ISO-ish
string and its pre-formatted display string); nothing in this codebase
does date formatting yet, so both are stored as given rather than
deriving one from the other.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

news_article_destinations = Table(
    "news_article_destinations",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("destination_id", UUID(as_uuid=True), ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
)

news_article_species = Table(
    "news_article_species",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("species_id", UUID(as_uuid=True), ForeignKey("species.id", ondelete="CASCADE"), primary_key=True),
)

news_article_research_projects = Table(
    "news_article_research_projects",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("research_project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
)

news_article_conservation_projects = Table(
    "news_article_conservation_projects",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("conservation_project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
)

news_article_experiences = Table(
    "news_article_experiences",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("experience_id", UUID(as_uuid=True), ForeignKey("experiences.id", ondelete="CASCADE"), primary_key=True),
)

news_article_communities = Table(
    "news_article_communities",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("news_articles.id", ondelete="CASCADE"), primary_key=True),
    Column("community_id", UUID(as_uuid=True), ForeignKey("communities.id", ondelete="CASCADE"), primary_key=True),
)


class NewsArticle(Base):
    __tablename__ = "news_articles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)

    category_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("news_categories.id"), nullable=False)
    category: Mapped["NewsCategory"] = relationship(back_populates="articles")

    author: Mapped[str | None] = mapped_column(String(255))
    date: Mapped[str | None] = mapped_column(String(20))
    display_date: Mapped[str | None] = mapped_column(String(50))
    read_time: Mapped[str | None] = mapped_column(String(50))

    featured_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    excerpt: Mapped[str | None] = mapped_column(Text)
    content: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    destinations: Mapped[list["Destination"]] = relationship(secondary=news_article_destinations)
    species: Mapped[list["Species"]] = relationship(secondary=news_article_species)
    research_projects: Mapped[list["ResearchProject"]] = relationship(secondary=news_article_research_projects)
    conservation_projects: Mapped[list["ConservationProject"]] = relationship(secondary=news_article_conservation_projects)
    experiences: Mapped[list["Experience"]] = relationship(secondary=news_article_experiences)
    communities: Mapped[list["Community"]] = relationship(secondary=news_article_communities)
