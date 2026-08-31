"""destination status workflow

Revision ID: 26d1a1e68bdb
Revises: 05ea90722e2f
Create Date: 2026-08-30 18:13:44.075877

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '26d1a1e68bdb'
down_revision: Union[str, Sequence[str], None] = '05ea90722e2f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


destination_status = sa.Enum('DRAFT', 'PUBLISHED', 'ARCHIVED', name='destination_status')


def upgrade() -> None:
    """Upgrade schema."""
    destination_status.create(op.get_bind())
    op.add_column(
        'destinations',
        sa.Column('status', destination_status, nullable=False, server_default='DRAFT'),
    )
    op.execute("UPDATE destinations SET status = 'PUBLISHED' WHERE published IS TRUE")
    op.alter_column('destinations', 'status', server_default=None)
    op.drop_column('destinations', 'published')


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column('destinations', sa.Column('published', sa.Boolean(), nullable=False, server_default=sa.true()))
    op.execute("UPDATE destinations SET published = (status = 'PUBLISHED')")
    op.alter_column('destinations', 'published', server_default=None)
    op.drop_column('destinations', 'status')
    destination_status.drop(op.get_bind())
