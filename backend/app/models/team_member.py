"""Individual public profiles for Blue Ocean staff/researchers — distinct
from ResearchTeam (institutional units like "Cetacean & Marine Mammal
Research Unit"), which stays as-is. This table starts empty: no
fabricated names, photos, or bios. It's the org's job to populate real
people through the admin CMS.
"""

import uuid
from datetime import datetime

from sqlalchemy import ARRAY, Boolean, Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

team_member_research_projects = Table(
    "team_member_research_projects",
    Base.metadata,
    Column("team_member_id", UUID(as_uuid=True), ForeignKey("team_members.id", ondelete="CASCADE"), primary_key=True),
    Column("research_project_id", UUID(as_uuid=True), ForeignKey("research_projects.id", ondelete="CASCADE"), primary_key=True),
)

team_member_conservation_projects = Table(
    "team_member_conservation_projects",
    Base.metadata,
    Column("team_member_id", UUID(as_uuid=True), ForeignKey("team_members.id", ondelete="CASCADE"), primary_key=True),
    Column("conservation_project_id", UUID(as_uuid=True), ForeignKey("conservation_projects.id", ondelete="CASCADE"), primary_key=True),
)


class TeamMember(Base):
    __tablename__ = "team_members"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    role: Mapped[str] = mapped_column(String(200), nullable=False)
    location: Mapped[str | None] = mapped_column(String(255))

    biography: Mapped[str | None] = mapped_column(Text)
    expertise: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    profile_image: Mapped[str | None] = mapped_column(String(500))
    cover_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    email: Mapped[str | None] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(50))
    social_links: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    research_projects: Mapped[list["ResearchProject"]] = relationship(secondary=team_member_research_projects)
    conservation_projects: Mapped[list["ConservationProject"]] = relationship(secondary=team_member_conservation_projects)
