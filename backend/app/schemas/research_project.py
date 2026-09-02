from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.research_project import ProjectStatus


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None


class Finding(BaseModel):
    title: str
    description: str | None = None
    source: str | None = None


class AreaSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class TeamSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class MethodologySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    label: str
    icon: str | None = None


class SpeciesSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    common_name: str
    scientific_name: str | None = None
    hero_image: str | None = None


class DestinationSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class ResearchProjectBase(BaseModel):
    slug: str
    title: str
    status: ProjectStatus
    region: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    summary: str | None = None
    editorial_statement: str | None = None
    research_question: str | None = None
    purpose: str | None = None
    geographic_scope: str | None = None
    expected_outcomes: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] = []
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    objectives: list[str] = []
    findings: list[Finding] = []
    conservation_themes: list[str] = []
    featured: bool = False
    published: bool = True


class ResearchProjectCreate(ResearchProjectBase):
    area_id: UUID
    research_team_id: UUID | None = None
    methodology_ids: list[UUID] = []
    species_ids: list[UUID] = []
    destination_ids: list[UUID] = []


class ResearchProjectUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    area_id: UUID | None = None
    research_team_id: UUID | None = None
    status: ProjectStatus | None = None
    region: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    summary: str | None = None
    editorial_statement: str | None = None
    research_question: str | None = None
    purpose: str | None = None
    geographic_scope: str | None = None
    expected_outcomes: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] | None = None
    video_url: str | None = None
    video_title: str | None = None
    video_description: str | None = None
    video_source: str | None = None
    objectives: list[str] | None = None
    findings: list[Finding] | None = None
    conservation_themes: list[str] | None = None
    featured: bool | None = None
    published: bool | None = None
    methodology_ids: list[UUID] | None = None
    species_ids: list[UUID] | None = None
    destination_ids: list[UUID] | None = None


class ResearchProjectRead(ResearchProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    area: AreaSummary
    research_team: TeamSummary | None = None
    methodologies: list[MethodologySummary] = []
    species: list[SpeciesSummary] = []
    destinations: list[DestinationSummary] = []
