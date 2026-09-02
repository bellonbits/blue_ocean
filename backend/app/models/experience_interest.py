"""A member's interest status in an Ocean Experience — "My Experiences"
on the user dashboard.

Deliberately not a booking system: this only tracks that a member has
expressed interest and where that interest currently stands
(Interested / Upcoming / Completed). If real tourism bookings are
introduced later, this table extends rather than requiring a redesign.
Kept separate from SavedItem — a plain bookmark and a stateful interest
pipeline aren't the same thing, and forcing "status" onto the other
three saved content types wouldn't mean anything for them.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ExperienceInterestStatus(str, enum.Enum):
    INTERESTED = "interested"
    UPCOMING = "upcoming"
    COMPLETED = "completed"


class ExperienceInterest(Base):
    __tablename__ = "experience_interests"
    __table_args__ = (
        UniqueConstraint("user_id", "experience_slug", name="uq_experience_interest_user_experience"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    experience_slug: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[ExperienceInterestStatus] = mapped_column(
        Enum(ExperienceInterestStatus, name="experience_interest_status"),
        nullable=False,
        default=ExperienceInterestStatus.INTERESTED,
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
