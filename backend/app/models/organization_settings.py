"""
Site-wide "About" and "Contact" content — the org's mission/vision/story
plus contact details, subjects, and social links.

This is a deliberate departure from every content model so far: the
frontend's `organization.js` has no per-item list of independently
addressable entities with slugs — it's a single settings-shaped object
the About and Contact pages both read from. Modeled as a singleton table
(exactly one row, bootstrapped by `scripts/seed_organization.py`) rather
than a collection, with a plain GET/PATCH API instead of the usual
list/detail/create/delete shape. Team profiles intentionally reuse
`ResearchTeam` (B5) rather than introducing a named-staff roster — same
call the frontend already made (see `organization.js`'s own comment).

`what_we_do` (the Explore/Research/Conserve/Connect steps) and
`contact_locations` / `social_links` stay JSONB — small, structured,
always read as a whole page section, never queried by sub-field. Unlike
`CONSERVATION_APPROACH_STEPS` (B7), which was left unmodeled entirely
because nothing ever serves it, this data *is* served — it's the actual
content of the About page.
"""

import uuid
from datetime import datetime

from sqlalchemy import ARRAY, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class OrganizationSettings(Base):
    __tablename__ = "organization_settings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    mission_statement: Mapped[str | None] = mapped_column(String(500))
    mission_description: Mapped[str | None] = mapped_column(Text)
    vision_statement: Mapped[str | None] = mapped_column(String(500))
    vision_description: Mapped[str | None] = mapped_column(Text)

    story_intro: Mapped[str | None] = mapped_column(Text)
    story_paragraphs: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)

    why_ocean_matters_heading: Mapped[str | None] = mapped_column(String(255))
    why_ocean_matters_text: Mapped[str | None] = mapped_column(Text)

    who_we_work_with_heading: Mapped[str | None] = mapped_column(String(255))
    who_we_work_with_text: Mapped[str | None] = mapped_column(Text)

    what_we_do: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    contact_email: Mapped[str | None] = mapped_column(String(255))
    contact_locations: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    contact_subjects: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    social_links: Mapped[list[dict]] = mapped_column(JSONB, default=list)

    # Site-wide language configuration (Settings → Languages in the admin).
    # `enabled_languages` gates which languages the switcher offers at all;
    # `default_language` is what a first-time, no-preference visitor gets
    # before browser-language detection/localStorage kicks in client-side.
    enabled_languages: Mapped[list[str]] = mapped_column(ARRAY(String), default=lambda: ["en", "so"])
    default_language: Mapped[str] = mapped_column(String(5), default="en", server_default="en")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
