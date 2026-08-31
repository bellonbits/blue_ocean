"""
Contact form submissions.

The frontend's `EnquiryForm` component (used by the Contact page) has
carried a "replace this setTimeout with a real API call once one
exists" comment since it was built — this is that endpoint. Scoped to
the Contact page only: Support/Partner/Volunteer use the same
`EnquiryForm` component but with different field sets (project,
partnership type, skills, ...) belonging to a "Get Involved" content
area that isn't part of the B1-B15 roadmap, so those stay frontend-only
and unwired, same as every other not-yet-built connection in this repo.

No `published` field — these aren't editorial content, they're an
inbox. `is_read` and `is_favorite` are the only pieces of admin-facing
state, to support a basic read/unread/starred inbox view.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(50))
    organization: Mapped[str | None] = mapped_column(String(255))
    subject: Mapped[str] = mapped_column(String(150), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)

    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_favorite: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
