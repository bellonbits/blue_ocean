"""Per-user activity feed for the admin CMS profile page.

Deliberately narrow: only the primary content resources (the 9 with a
published/status workflow) log here, and only on create and on the
transition to published — not every PATCH, and not the lookup/taxonomy
tables. A log of every field edit on every category is noise, not a
useful "what have I been doing" feed; "created X" and "published X" are
the two events a CMS user actually wants to see about their own work.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ActivityAction(str, enum.Enum):
    CREATED = "created"
    UPDATED = "updated"
    PUBLISHED = "published"


class ActivityLogEntry(Base):
    __tablename__ = "activity_log_entries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    user: Mapped["User"] = relationship()

    action: Mapped[ActivityAction] = mapped_column(Enum(ActivityAction, name="activity_action"), nullable=False)
    resource_type: Mapped[str] = mapped_column(String(50), nullable=False)
    resource_label: Mapped[str] = mapped_column(String(255), nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
