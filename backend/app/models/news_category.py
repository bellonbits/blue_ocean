"""News categories (Marine Life, Research, Tourism, Conservation, ...).

Mirrors ExperienceCategory (B6): a small controlled vocabulary that IS
expanded into resolved output (`categoryLabel`/`categoryBadgeClass` on
every article), unlike `Community.category` which stays an unexpanded
flat string — so this earns its own table the same way ExperienceCategory
did. `article_count` is computed live, same principle as every other
`*_count` field so far.
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class NewsCategory(Base):
    __tablename__ = "news_categories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    label: Mapped[str] = mapped_column(String(150), nullable=False)
    badge_class: Mapped[str | None] = mapped_column(String(100))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    articles: Mapped[list["NewsArticle"]] = relationship(back_populates="category")
