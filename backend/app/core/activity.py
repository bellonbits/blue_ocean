"""Shared helper for writing to the activity log — see
app/models/activity_log.py for what gets logged and why.
"""

from sqlalchemy.orm import Session

from app.models.activity_log import ActivityAction, ActivityLogEntry
from app.models.user import User


def log_activity(db: Session, user: User, action: ActivityAction, resource_type: str, resource_label: str) -> None:
    db.add(
        ActivityLogEntry(
            user_id=user.id,
            action=action,
            resource_type=resource_type,
            resource_label=resource_label,
        )
    )
