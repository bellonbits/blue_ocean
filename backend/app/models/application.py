"""A submission from the "Get Involved" forms — Volunteer, Partner,
Support. Backs the member dashboard's "My Applications" list, so a
logged-in applicant can track the status of what they submitted.

Each of the three forms collects a different field set (skills +
availability for volunteers, partnership type for partners, ...), so
rather than three near-identical tables, `details` holds whatever
extra fields that form's `EnquiryForm` instance defined, keyed by
field name. name/email/phone are lifted out to real columns since
every form collects them and the dashboard list needs them directly.

user_id is nullable — like ContactSubmission, an applicant doesn't
have to be logged in to apply; when they are, their submission shows
up under their own "My Applications".
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ApplicationType(str, enum.Enum):
    VOLUNTEER = "volunteer"
    PARTNER = "partner"
    SUPPORT = "support"


class ApplicationStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    REVIEWING = "reviewing"
    ACCEPTED = "accepted"
    DECLINED = "declined"


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True)

    application_type: Mapped[ApplicationType] = mapped_column(Enum(ApplicationType, name="application_type"), nullable=False)
    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus, name="application_status"), nullable=False, default=ApplicationStatus.SUBMITTED
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(50))
    details: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
