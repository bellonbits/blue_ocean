"""
Import every model module here, purely for the side effect of
registering it on Base.metadata. Nothing in the app imports this
module — only Alembic's env.py does, for autogenerate — so it can
safely import every model without creating a cycle back to
app/db/base.py.

Add one line here per new model module as they're added in later
sprints (destinations, species, research, conservation, ...).
"""

from app.models.user import User  # noqa: F401
from app.models.region import Region  # noqa: F401
from app.models.destination import Destination  # noqa: F401
from app.models.species_category import SpeciesCategory  # noqa: F401
from app.models.species import Species  # noqa: F401
from app.models.research_area import ResearchArea  # noqa: F401
from app.models.methodology import Methodology  # noqa: F401
from app.models.research_team import ResearchTeam  # noqa: F401
from app.models.research_project import ResearchProject  # noqa: F401
from app.models.expedition import Expedition  # noqa: F401
from app.models.experience_category import ExperienceCategory  # noqa: F401
from app.models.experience import Experience  # noqa: F401
from app.models.community import Community  # noqa: F401
from app.models.conservation_focus_area import ConservationFocusArea  # noqa: F401
from app.models.conservation_issue import ConservationIssue  # noqa: F401
from app.models.conservation_project import ConservationProject  # noqa: F401
from app.models.community_story import CommunityStory  # noqa: F401
from app.models.news_category import NewsCategory  # noqa: F401
from app.models.news_article import NewsArticle  # noqa: F401
from app.models.organization_settings import OrganizationSettings  # noqa: F401
from app.models.contact_submission import ContactSubmission  # noqa: F401
from app.models.media import Media  # noqa: F401
from app.models.activity_log import ActivityLogEntry  # noqa: F401
from app.models.team_member import TeamMember  # noqa: F401
from app.models.saved_item import SavedItem  # noqa: F401
from app.models.experience_interest import ExperienceInterest  # noqa: F401
from app.models.notification import Notification  # noqa: F401
from app.models.application import Application  # noqa: F401
