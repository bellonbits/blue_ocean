from pydantic import BaseModel


class ContentCounts(BaseModel):
    regions: int
    destinations: int
    species_categories: int
    species: int
    research_areas: int
    methodologies: int
    research_teams: int
    research_projects: int
    expeditions: int
    experience_categories: int
    experiences: int
    conservation_focus_areas: int
    conservation_issues: int
    conservation_projects: int
    communities: int
    community_stories: int
    news_categories: int
    news_articles: int
    media: int
    team_members: int


class UserCounts(BaseModel):
    total: int
    active: int
    inactive: int
    by_role: dict[str, int]


class ContactSubmissionCounts(BaseModel):
    total: int
    unread: int


class AdminStatsRead(BaseModel):
    content: ContentCounts
    users: UserCounts
    contact_submissions: ContactSubmissionCounts
