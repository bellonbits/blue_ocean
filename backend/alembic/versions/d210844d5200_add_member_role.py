"""add member role

Revision ID: d210844d5200
Revises: 81e3ec5edbcc
Create Date: 2026-09-01 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'd210844d5200'
down_revision: Union[str, Sequence[str], None] = '81e3ec5edbcc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add 'MEMBER' to the user_role enum — the default role for public
    self-registration (visitors/tourists/volunteers), distinct from the
    CMS staff roles.

    The enum's DB-side labels are the Python enum members' *names*
    (SUPER_ADMIN, ADMIN, EDITOR, ...), not their lowercase `.value` — see
    the existing rows in `users.role`. Must match that casing or
    SQLAlchemy's INSERT of UserRole.MEMBER will hit an invalid-enum-value
    error against this type.
    """
    op.execute("ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'MEMBER'")


def downgrade() -> None:
    # Postgres has no ALTER TYPE ... DROP VALUE — removing an enum value
    # requires rebuilding the type, which isn't safe to do generically
    # here (would fail if any row already uses 'member'). Not supported.
    raise NotImplementedError("Cannot drop an enum value in Postgres; downgrade not supported.")
