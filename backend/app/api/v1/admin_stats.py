"""
Admin dashboard summary — a single endpoint an admin CMS home screen
can call for content/user/inbox counts, instead of hitting every list
endpoint in this API and counting client-side. Every number here is a
live `COUNT(*)`, same "never store what you can compute" principle as
`Region.destinations_count` and every other `*_count` field since B3 —
there's just nothing to attach it to, so it's its own endpoint instead
of a field on some resource.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.community import Community
from app.models.community_story import CommunityStory
from app.models.conservation_focus_area import ConservationFocusArea
from app.models.conservation_issue import ConservationIssue
from app.models.conservation_project import ConservationProject
from app.models.contact_submission import ContactSubmission
from app.models.destination import Destination
from app.models.expedition import Expedition
from app.models.experience import Experience
from app.models.experience_category import ExperienceCategory
from app.models.media import Media
from app.models.methodology import Methodology
from app.models.news_article import NewsArticle
from app.models.news_category import NewsCategory
from app.models.region import Region
from app.models.research_area import ResearchArea
from app.models.research_project import ResearchProject
from app.models.research_team import ResearchTeam
from app.models.species import Species
from app.models.species_category import SpeciesCategory
from app.models.team_member import TeamMember
from app.models.user import User, UserRole
from app.schemas.admin_stats import AdminStatsRead, ContactSubmissionCounts, ContentCounts, UserCounts

router = APIRouter(prefix="/admin", tags=["admin"])

_view_stats = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _count(db: Session, model) -> int:
    return db.scalar(select(func.count()).select_from(model)) or 0


@router.get("/stats", response_model=AdminStatsRead)
def get_admin_stats(db: Session = Depends(get_db), _: User = Depends(_view_stats)) -> AdminStatsRead:
    content = ContentCounts(
        regions=_count(db, Region),
        destinations=_count(db, Destination),
        species_categories=_count(db, SpeciesCategory),
        species=_count(db, Species),
        research_areas=_count(db, ResearchArea),
        methodologies=_count(db, Methodology),
        research_teams=_count(db, ResearchTeam),
        research_projects=_count(db, ResearchProject),
        expeditions=_count(db, Expedition),
        experience_categories=_count(db, ExperienceCategory),
        experiences=_count(db, Experience),
        conservation_focus_areas=_count(db, ConservationFocusArea),
        conservation_issues=_count(db, ConservationIssue),
        conservation_projects=_count(db, ConservationProject),
        communities=_count(db, Community),
        community_stories=_count(db, CommunityStory),
        news_categories=_count(db, NewsCategory),
        news_articles=_count(db, NewsArticle),
        media=_count(db, Media),
        team_members=_count(db, TeamMember),
    )

    total_users = _count(db, User)
    active_users = db.scalar(select(func.count()).select_from(User).where(User.is_active.is_(True))) or 0
    by_role = dict(db.query(User.role, func.count()).group_by(User.role).all())

    users = UserCounts(
        total=total_users,
        active=active_users,
        inactive=total_users - active_users,
        by_role={role.value: count for role, count in by_role.items()},
    )

    total_submissions = _count(db, ContactSubmission)
    unread = db.scalar(select(func.count()).select_from(ContactSubmission).where(ContactSubmission.is_read.is_(False))) or 0

    contact_submissions = ContactSubmissionCounts(total=total_submissions, unread=unread)

    return AdminStatsRead(content=content, users=users, contact_submissions=contact_submissions)
