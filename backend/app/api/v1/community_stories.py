from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.community import Community
from app.models.community_story import CommunityStory
from app.models.conservation_project import ConservationProject
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.community_story import CommunityStoryCreate, CommunityStoryRead, CommunityStoryUpdate

router = APIRouter(prefix="/community-stories", tags=["community-stories"])

_edit_stories = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_stories = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(CommunityStory.community),
    joinedload(CommunityStory.conservation_project),
    joinedload(CommunityStory.species),
)


def _resolve_species(db: Session, species_ids: list[UUID]) -> list[Species]:
    if not species_ids:
        return []
    rows = db.query(Species).filter(Species.id.in_(species_ids)).all()
    missing = set(species_ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown species_id(s): {', '.join(str(m) for m in missing)}")
    return rows


@router.get("", response_model=list[CommunityStoryRead])
def list_community_stories(
    community: str | None = Query(default=None, description="Filter by community slug"),
    category: str | None = Query(default=None),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[CommunityStory]:
    query = db.query(CommunityStory).options(*_EAGER).filter(CommunityStory.published.is_(True))

    if community:
        query = query.join(Community).filter(Community.slug == community)
    if category:
        query = query.filter(CommunityStory.category == category)
    if featured is not None:
        query = query.filter(CommunityStory.featured.is_(featured))

    return query.order_by(CommunityStory.title).all()


@router.get("/{slug}", response_model=CommunityStoryRead)
def get_community_story(slug: str, db: Session = Depends(get_db)) -> CommunityStory:
    story = (
        db.query(CommunityStory)
        .options(*_EAGER)
        .filter(CommunityStory.slug == slug, CommunityStory.published.is_(True))
        .first()
    )
    if story is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community story not found.")
    return story


@router.get("/admin/all", response_model=list[CommunityStoryRead])
def list_all_community_stories_admin(
    db: Session = Depends(get_db), _: User = Depends(_edit_stories)
) -> list[CommunityStory]:
    return db.query(CommunityStory).options(*_EAGER).order_by(CommunityStory.title).all()


@router.get("/admin/{story_id}", response_model=CommunityStoryRead)
def get_community_story_admin(
    story_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_stories)
) -> CommunityStory:
    story = db.query(CommunityStory).options(*_EAGER).filter(CommunityStory.id == story_id).first()
    if story is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community story not found.")
    return story


@router.post("", response_model=CommunityStoryRead, status_code=status.HTTP_201_CREATED)
def create_community_story(
    payload: CommunityStoryCreate, db: Session = Depends(get_db), current_user: User = Depends(_edit_stories)
) -> CommunityStory:
    if db.query(CommunityStory).filter(CommunityStory.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A community story with this slug already exists.")
    if db.get(Community, payload.community_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="community_id does not reference an existing community.")
    if payload.conservation_project_id and db.get(ConservationProject, payload.conservation_project_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="conservation_project_id does not reference an existing project.")

    story = CommunityStory(**payload.model_dump(exclude={"species_ids"}))
    story.species = _resolve_species(db, payload.species_ids)

    db.add(story)
    log_activity(db, current_user, ActivityAction.CREATED, "community story", story.title)
    if story.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "community story", story.title)
    db.commit()
    db.refresh(story)
    return story


@router.patch("/{story_id}", response_model=CommunityStoryRead)
def update_community_story(
    story_id: UUID,
    payload: CommunityStoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_stories),
) -> CommunityStory:
    story = db.get(CommunityStory, story_id)
    if story is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community story not found.")

    updates = payload.model_dump(exclude_unset=True, exclude={"species_ids"})

    if "slug" in updates and updates["slug"] != story.slug:
        if db.query(CommunityStory).filter(CommunityStory.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A community story with this slug already exists.")
    if "community_id" in updates and db.get(Community, updates["community_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="community_id does not reference an existing community.")
    if updates.get("conservation_project_id") and db.get(ConservationProject, updates["conservation_project_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="conservation_project_id does not reference an existing project.")

    was_published = story.published
    for field, value in updates.items():
        setattr(story, field, value)

    if payload.species_ids is not None:
        story.species = _resolve_species(db, payload.species_ids)

    if updates:
        if not was_published and story.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "community story", story.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "community story", story.title)

    db.commit()
    db.refresh(story)
    return story


@router.delete("/{story_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_community_story(story_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_stories)) -> None:
    story = db.get(CommunityStory, story_id)
    if story is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community story not found.")

    db.delete(story)
    db.commit()
