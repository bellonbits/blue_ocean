"""add_video_thumbnail_and_videos_to_content

Revision ID: 8e67a4868593
Revises: 0cb1f80faf88
Create Date: 2026-10-05 11:29:06.611242

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8e67a4868593'
down_revision: Union[str, Sequence[str], None] = '0cb1f80faf88'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


from sqlalchemy.dialects import postgresql


def upgrade() -> None:
    """Upgrade schema."""
    tables = [
        'community_stories',
        'conservation_projects',
        'destinations',
        'experiences',
        'news_articles',
        'research_projects',
        'species',
    ]
    for table in tables:
        op.add_column(table, sa.Column('video_thumbnail', sa.String(length=500), nullable=True))
        op.add_column(table, sa.Column('videos', postgresql.JSONB(astext_type=sa.Text()), server_default='[]', nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    tables = [
        'community_stories',
        'conservation_projects',
        'destinations',
        'experiences',
        'news_articles',
        'research_projects',
        'species',
    ]
    for table in tables:
        op.drop_column(table, 'videos')
        op.drop_column(table, 'video_thumbnail')
