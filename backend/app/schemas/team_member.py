from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None
    location: str | None = None
    date: str | None = None
    credit: str | None = None


class SocialLink(BaseModel):
    label: str
    href: str


class ResearchProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str
    hero_image: str | None = None


class ConservationProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str
    hero_image: str | None = None


class TeamMemberBase(BaseModel):
    slug: str
    name: str
    role: str
    location: str | None = None
    biography: str | None = None
    expertise: list[str] = []
    profile_image: str | None = None
    cover_image: str | None = None
    gallery: list[GalleryImage] = []
    email: str | None = None
    phone: str | None = None
    social_links: list[SocialLink] = []
    featured: bool = False
    published: bool = True


class TeamMemberCreate(TeamMemberBase):
    research_project_ids: list[UUID] = []
    conservation_project_ids: list[UUID] = []


class TeamMemberUpdate(BaseModel):
    slug: str | None = None
    name: str | None = None
    role: str | None = None
    location: str | None = None
    biography: str | None = None
    expertise: list[str] | None = None
    profile_image: str | None = None
    cover_image: str | None = None
    gallery: list[GalleryImage] | None = None
    email: str | None = None
    phone: str | None = None
    social_links: list[SocialLink] | None = None
    featured: bool | None = None
    published: bool | None = None
    research_project_ids: list[UUID] | None = None
    conservation_project_ids: list[UUID] | None = None


class TeamMemberRead(TeamMemberBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    research_projects: list[ResearchProjectSummary] = []
    conservation_projects: list[ConservationProjectSummary] = []
