from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.community import Community
from app.models.user import User, UserRole
from app.schemas.community import CommunityCreate, CommunityRead, CommunityUpdate

router = APIRouter(prefix="/communities", tags=["communities"])

_edit_communities = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_communities = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


@router.get("", response_model=list[CommunityRead])
def list_communities(
    category: str | None = Query(default=None),
    region: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Community]:
    query = db.query(Community).filter(Community.published.is_(True))

    if category:
        query = query.filter(Community.category == category)
    if region:
        query = query.filter(Community.region == region)

    return query.order_by(Community.name).all()


@router.get("/{slug}", response_model=CommunityRead)
def get_community(slug: str, db: Session = Depends(get_db)) -> Community:
    community = db.query(Community).filter(Community.slug == slug, Community.published.is_(True)).first()
    if community is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community not found.")
    return community


@router.get("/admin/all", response_model=list[CommunityRead])
def list_all_communities_admin(db: Session = Depends(get_db), _: User = Depends(_edit_communities)) -> list[Community]:
    return db.query(Community).order_by(Community.name).all()


@router.get("/admin/{community_id}", response_model=CommunityRead)
def get_community_admin(
    community_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_communities)
) -> Community:
    community = db.get(Community, community_id)
    if community is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community not found.")
    return community


@router.post("", response_model=CommunityRead, status_code=status.HTTP_201_CREATED)
def create_community(
    payload: CommunityCreate, db: Session = Depends(get_db), current_user: User = Depends(_edit_communities)
) -> Community:
    if db.query(Community).filter(Community.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A community with this slug already exists.")

    community = Community(**payload.model_dump())
    db.add(community)
    log_activity(db, current_user, ActivityAction.CREATED, "community", community.name)
    if community.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "community", community.name)
    db.commit()
    db.refresh(community)
    return community


@router.patch("/{community_id}", response_model=CommunityRead)
def update_community(
    community_id: UUID, payload: CommunityUpdate, db: Session = Depends(get_db), current_user: User = Depends(_edit_communities)
) -> Community:
    community = db.get(Community, community_id)
    if community is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != community.slug:
        if db.query(Community).filter(Community.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A community with this slug already exists.")

    was_published = community.published
    for field, value in updates.items():
        setattr(community, field, value)

    if updates:
        if not was_published and community.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "community", community.name)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "community", community.name)

    db.commit()
    db.refresh(community)
    return community


@router.delete("/{community_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_community(community_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_communities)) -> None:
    community = db.get(Community, community_id)
    if community is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Community not found.")

    db.delete(community)
    db.commit()
