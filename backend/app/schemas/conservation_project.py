from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.conservation_project import ConservationStatus


class GalleryImage(BaseModel):
    url: str
    caption: str | None = None


class FocusAreaSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class IssueSummary(BaseModel):
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


class ResearchProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str


class CommunitySummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str


class ConservationProjectBase(BaseModel):
    slug: str
    title: str
    status: ConservationStatus
    region: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    summary: str | None = None
    editorial_statement: str | None = None
    what_it_is: str | None = None
    why_it_matters: str | None = None
    who_is_involved: str | None = None
    aims: str | None = None
    problem_statement: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] = []
    featured: bool = False
    published: bool = True


class ConservationProjectCreate(ConservationProjectBase):
    focus_area_id: UUID
    issue_ids: list[UUID] = []
    species_ids: list[UUID] = []
    destination_ids: list[UUID] = []
    research_project_ids: list[UUID] = []
    community_ids: list[UUID] = []


class ConservationProjectUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    focus_area_id: UUID | None = None
    status: ConservationStatus | None = None
    region: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    summary: str | None = None
    editorial_statement: str | None = None
    what_it_is: str | None = None
    why_it_matters: str | None = None
    who_is_involved: str | None = None
    aims: str | None = None
    problem_statement: str | None = None
    hero_image: str | None = None
    gallery: list[GalleryImage] | None = None
    featured: bool | None = None
    published: bool | None = None
    issue_ids: list[UUID] | None = None
    species_ids: list[UUID] | None = None
    destination_ids: list[UUID] | None = None
    research_project_ids: list[UUID] | None = None
    community_ids: list[UUID] | None = None


class ConservationProjectRead(ConservationProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    focus_area: FocusAreaSummary
    issues: list[IssueSummary] = []
    species: list[SpeciesSummary] = []
    destinations: list[DestinationSummary] = []
    research_projects: list[ResearchProjectSummary] = []
    communities: list[CommunitySummary] = []
