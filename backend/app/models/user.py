"""User accounts and roles.

Covers both admin/CMS staff (super_admin, admin, editor, researcher,
content_manager) and plain public accounts (member — visitors, tourists,
volunteers, researchers-in-the-lay-sense signing up for the site itself,
not the CMS). POST /auth/register is public and defaults new accounts to
MEMBER; see scripts/create_superuser.py for bootstrapping a staff account.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

# Defaults for User.notification_preferences — storage only for now (see
# ActivityLogEntry docstring: this CMS has no outbound email service yet,
# so these toggles record intent without triggering anything).
DEFAULT_NOTIFICATION_PREFERENCES = {
    "new_contact_messages": True,
    "volunteer_enquiries": True,
    "partnership_enquiries": True,
    "new_article_published": False,
    "system_updates": False,
}


class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    EDITOR = "editor"
    RESEARCHER = "researcher"
    CONTENT_MANAGER = "content_manager"
    # Plain visitor/tourist/volunteer account — no CMS access at all.
    # The default role for public self-registration (see auth.py).
    MEMBER = "member"


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="user_role"), nullable=False, default=UserRole.EDITOR)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    notification_preferences: Mapped[dict] = mapped_column(JSONB, default=lambda: dict(DEFAULT_NOTIFICATION_PREFERENCES))
    # Ocean Interests — self-selected tags from the dashboard Profile page
    # (e.g. "coral-reefs", "sea-turtles"). Storage only for now, same as
    # notification_preferences — nothing reads these to personalize content
    # yet (that's the spec's explicitly-deferred "Personal Recommendations").
    interests: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
