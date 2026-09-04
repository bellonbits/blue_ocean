from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ContactLocation(BaseModel):
    label: str
    value: str


class SocialLink(BaseModel):
    label: str
    href: str
    icon: str | None = None


class WhatWeDoStep(BaseModel):
    step: str
    title: str
    desc: str
    path: str | None = None
    cta: str | None = None


class OrganizationSettingsBase(BaseModel):
    name: str
    mission_statement: str | None = None
    mission_description: str | None = None
    vision_statement: str | None = None
    vision_description: str | None = None
    story_intro: str | None = None
    story_paragraphs: list[str] = []
    why_ocean_matters_heading: str | None = None
    why_ocean_matters_text: str | None = None
    who_we_work_with_heading: str | None = None
    who_we_work_with_text: str | None = None
    what_we_do: list[WhatWeDoStep] = []
    contact_email: str | None = None
    contact_locations: list[ContactLocation] = []
    contact_subjects: list[str] = []
    social_links: list[SocialLink] = []
    enabled_languages: list[str] = ["en", "so"]
    default_language: str = "en"


class OrganizationSettingsUpdate(BaseModel):
    name: str | None = None
    mission_statement: str | None = None
    mission_description: str | None = None
    vision_statement: str | None = None
    vision_description: str | None = None
    story_intro: str | None = None
    story_paragraphs: list[str] | None = None
    why_ocean_matters_heading: str | None = None
    why_ocean_matters_text: str | None = None
    who_we_work_with_heading: str | None = None
    who_we_work_with_text: str | None = None
    what_we_do: list[WhatWeDoStep] | None = None
    contact_email: str | None = None
    contact_locations: list[ContactLocation] | None = None
    contact_subjects: list[str] | None = None
    social_links: list[SocialLink] | None = None
    enabled_languages: list[str] | None = None
    default_language: str | None = None


class OrganizationSettingsRead(OrganizationSettingsBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
