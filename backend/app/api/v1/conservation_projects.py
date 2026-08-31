from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.community import Community
from app.models.conservation_focus_area import ConservationFocusArea
from app.models.conservation_issue import ConservationIssue
from app.models.conservation_project import ConservationProject, ConservationStatus
from app.models.destination import Destination
from app.models.research_project import ResearchProject
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.conservation_project import ConservationProjectCreate, ConservationProjectRead, ConservationProjectUpdate

router = APIRouter(prefix="/conservation-projects", tags=["conservation-projects"])

# No architecture-doc example names Content Manager explicitly the way it
# does Researcher, but conservation/communities content is exactly the
# general-content area the role exists for, and it's unused everywhere
# else — added alongside Editor the same way Researcher was added for
# Research (B5), not in place of it.
_edit_projects = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_projects = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(ConservationProject.focus_area),
    joinedload(ConservationProject.issues),
    joinedload(ConservationProject.species),
    joinedload(ConservationProject.destinations),
    joinedload(ConservationProject.research_projects),
    joinedload(ConservationProject.communities),
)


def _resolve_by_ids(db: Session, model, ids: list[UUID], label: str) -> list:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    missing = set(ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown {label}(s): {', '.join(str(m) for m in missing)}")
    return rows


def _apply_links(db: Session, project: ConservationProject, payload) -> None:
    if payload.issue_ids is not None:
        project.issues = _resolve_by_ids(db, ConservationIssue, payload.issue_ids, "issue_id")
    if payload.species_ids is not None:
        project.species = _resolve_by_ids(db, Species, payload.species_ids, "species_id")
    if payload.destination_ids is not None:
        project.destinations = _resolve_by_ids(db, Destination, payload.destination_ids, "destination_id")
    if payload.research_project_ids is not None:
        project.research_projects = _resolve_by_ids(db, ResearchProject, payload.research_project_ids, "research_project_id")
    if payload.community_ids is not None:
        project.communities = _resolve_by_ids(db, Community, payload.community_ids, "community_id")


@router.get("", response_model=list[ConservationProjectRead])
def list_conservation_projects(
    focus_area: str | None = Query(default=None, description="Filter by focus area slug"),
    status_filter: ConservationStatus | None = Query(default=None, alias="status"),
    region: str | None = Query(default=None),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[ConservationProject]:
    query = db.query(ConservationProject).options(*_EAGER).filter(ConservationProject.published.is_(True))

    if focus_area:
        query = query.join(ConservationFocusArea).filter(ConservationFocusArea.slug == focus_area)
    if status_filter:
        query = query.filter(ConservationProject.status == status_filter)
    if region:
        query = query.filter(ConservationProject.region == region)
    if featured is not None:
        query = query.filter(ConservationProject.featured.is_(featured))

    return query.order_by(ConservationProject.title).all()


@router.get("/{slug}", response_model=ConservationProjectRead)
def get_conservation_project(slug: str, db: Session = Depends(get_db)) -> ConservationProject:
    project = (
        db.query(ConservationProject)
        .options(*_EAGER)
        .filter(ConservationProject.slug == slug, ConservationProject.published.is_(True))
        .first()
    )
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation project not found.")
    return project


@router.get("/admin/all", response_model=list[ConservationProjectRead])
def list_all_conservation_projects_admin(
    db: Session = Depends(get_db), _: User = Depends(_edit_projects)
) -> list[ConservationProject]:
    return db.query(ConservationProject).options(*_EAGER).order_by(ConservationProject.title).all()


@router.get("/admin/{project_id}", response_model=ConservationProjectRead)
def get_conservation_project_admin(
    project_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_projects)
) -> ConservationProject:
    project = db.query(ConservationProject).options(*_EAGER).filter(ConservationProject.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation project not found.")
    return project


@router.post("", response_model=ConservationProjectRead, status_code=status.HTTP_201_CREATED)
def create_conservation_project(
    payload: ConservationProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_projects),
) -> ConservationProject:
    if db.query(ConservationProject).filter(ConservationProject.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A conservation project with this slug already exists.")
    if db.get(ConservationFocusArea, payload.focus_area_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="focus_area_id does not reference an existing focus area.")

    exclude = {"issue_ids", "species_ids", "destination_ids", "research_project_ids", "community_ids"}
    project = ConservationProject(**payload.model_dump(exclude=exclude))
    _apply_links(db, project, payload)

    db.add(project)
    log_activity(db, current_user, ActivityAction.CREATED, "conservation project", project.title)
    if project.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "conservation project", project.title)
    db.commit()
    db.refresh(project)
    return project


@router.patch("/{project_id}", response_model=ConservationProjectRead)
def update_conservation_project(
    project_id: UUID,
    payload: ConservationProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_projects),
) -> ConservationProject:
    project = db.get(ConservationProject, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation project not found.")

    exclude = {"issue_ids", "species_ids", "destination_ids", "research_project_ids", "community_ids"}
    updates = payload.model_dump(exclude_unset=True, exclude=exclude)

    if "slug" in updates and updates["slug"] != project.slug:
        if db.query(ConservationProject).filter(ConservationProject.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A conservation project with this slug already exists.")
    if "focus_area_id" in updates and db.get(ConservationFocusArea, updates["focus_area_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="focus_area_id does not reference an existing focus area.")

    was_published = project.published
    for field, value in updates.items():
        setattr(project, field, value)

    _apply_links(db, project, payload)

    if updates:
        if not was_published and project.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "conservation project", project.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "conservation project", project.title)

    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_conservation_project(
    project_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_projects)
) -> None:
    project = db.get(ConservationProject, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation project not found.")

    db.delete(project)
    db.commit()
