"""Individual public staff/researcher profiles — see
app/models/team_member.py for why this is separate from ResearchTeam.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.conservation_project import ConservationProject
from app.models.research_project import ResearchProject
from app.models.team_member import TeamMember
from app.models.user import User, UserRole
from app.schemas.team_member import TeamMemberCreate, TeamMemberRead, TeamMemberUpdate

router = APIRouter(prefix="/team-members", tags=["team-members"])

_edit_members = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_members = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (joinedload(TeamMember.research_projects), joinedload(TeamMember.conservation_projects))


def _resolve_by_ids(db: Session, model, ids: list[UUID], label: str) -> list:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    missing = set(ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown {label}(s): {', '.join(str(m) for m in missing)}")
    return rows


def _apply_links(db: Session, member: TeamMember, payload) -> None:
    if payload.research_project_ids is not None:
        member.research_projects = _resolve_by_ids(db, ResearchProject, payload.research_project_ids, "research_project_id")
    if payload.conservation_project_ids is not None:
        member.conservation_projects = _resolve_by_ids(db, ConservationProject, payload.conservation_project_ids, "conservation_project_id")


@router.get("", response_model=list[TeamMemberRead])
def list_team_members(featured: bool | None = Query(default=None), db: Session = Depends(get_db)) -> list[TeamMember]:
    query = db.query(TeamMember).options(*_EAGER).filter(TeamMember.published.is_(True))
    if featured is not None:
        query = query.filter(TeamMember.featured.is_(featured))
    return query.order_by(TeamMember.name).all()


@router.get("/{slug}", response_model=TeamMemberRead)
def get_team_member(slug: str, db: Session = Depends(get_db)) -> TeamMember:
    member = (
        db.query(TeamMember)
        .options(*_EAGER)
        .filter(TeamMember.slug == slug, TeamMember.published.is_(True))
        .first()
    )
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")
    return member


@router.get("/admin/all", response_model=list[TeamMemberRead])
def list_all_team_members_admin(db: Session = Depends(get_db), _: User = Depends(_edit_members)) -> list[TeamMember]:
    return db.query(TeamMember).options(*_EAGER).order_by(TeamMember.name).all()


@router.get("/admin/{member_id}", response_model=TeamMemberRead)
def get_team_member_admin(member_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_members)) -> TeamMember:
    member = db.query(TeamMember).options(*_EAGER).filter(TeamMember.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")
    return member


@router.post("", response_model=TeamMemberRead, status_code=status.HTTP_201_CREATED)
def create_team_member(
    payload: TeamMemberCreate, db: Session = Depends(get_db), current_user: User = Depends(_edit_members)
) -> TeamMember:
    if db.query(TeamMember).filter(TeamMember.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A team member with this slug already exists.")

    exclude = {"research_project_ids", "conservation_project_ids"}
    member = TeamMember(**payload.model_dump(exclude=exclude))
    _apply_links(db, member, payload)

    db.add(member)
    log_activity(db, current_user, ActivityAction.CREATED, "team member", member.name)
    if member.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "team member", member.name)
    db.commit()
    db.refresh(member)
    return member


@router.patch("/{member_id}", response_model=TeamMemberRead)
def update_team_member(
    member_id: UUID,
    payload: TeamMemberUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_members),
) -> TeamMember:
    member = db.get(TeamMember, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")

    exclude = {"research_project_ids", "conservation_project_ids"}
    updates = payload.model_dump(exclude_unset=True, exclude=exclude)

    if "slug" in updates and updates["slug"] != member.slug:
        if db.query(TeamMember).filter(TeamMember.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A team member with this slug already exists.")

    was_published = member.published
    for field, value in updates.items():
        setattr(member, field, value)

    _apply_links(db, member, payload)

    if updates:
        if not was_published and member.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "team member", member.name)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "team member", member.name)

    db.commit()
    db.refresh(member)
    return member


@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(member_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_members)) -> None:
    member = db.get(TeamMember, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")

    db.delete(member)
    db.commit()
