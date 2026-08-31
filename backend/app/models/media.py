"""
Uploaded media assets (images) for the admin CMS.

Every content model built in B3-B9 stores images as plain string paths
(e.g. `/marine_sharks.jpg`) pointing at the frontend's own `public/`
folder — real site photography that already exists as static assets and
isn't touched by this table. `Media` is the storage layer for *new*
uploads made through the admin API going forward: content editors
attach an uploaded file's `url` to a `hero_image`/`gallery` field the
same way they'd paste any other image path, there's just now a real
upload endpoint behind it instead of hand-editing frontend files.

Local disk storage only (`Settings.media_root`), served back out via a
`StaticFiles` mount in `app.main` — no S3/cloud storage wired up yet.
`stored_name` is a generated UUID-based filename (never the original,
attacker-controlled filename) written to disk, to avoid path traversal
and collisions; `filename` keeps the original name for display only.
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Media(Base):
    __tablename__ = "media"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=False)
    size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    alt_text: Mapped[str | None] = mapped_column(String(255))

    uploaded_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    uploaded_by: Mapped["User | None"] = relationship()

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
