from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.destination import Destination
from app.models.methodology import Methodology
from app.models.research_area import ResearchArea
from app.models.research_project import ProjectStatus, ResearchProject
from app.models.research_team import ResearchTeam
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.research_project import ResearchProjectCreate, ResearchProjectRead, ResearchProjectUpdate

router = APIRouter(prefix="/research-projects", tags=["research-projects"])

# Matches the architecture doc's explicit example: "Researcher -> Can edit Research".
_edit_projects = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.RESEARCHER)
_delete_projects = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(ResearchProject.area),
    joinedload(ResearchProject.research_team),
    joinedload(ResearchProject.methodologies),
    joinedload(ResearchProject.species),
    joinedload(ResearchProject.destinations),
)


def _resolve_by_ids(db: Session, model, ids: list[UUID], label: str) -> list:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    missing = set(ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown {label}(s): {', '.join(str(m) for m in missing)}")
    return rows


@router.get("", response_model=list[ResearchProjectRead])
def list_research_projects(
    area: str | None = Query(default=None, description="Filter by research area slug"),
    status_filter: ProjectStatus | None = Query(default=None, alias="status"),
    region: str | None = Query(default=None),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[ResearchProject]:
    query = db.query(ResearchProject).options(*_EAGER).filter(ResearchProject.published.is_(True))

    if area:
        query = query.join(ResearchArea).filter(ResearchArea.slug == area)
    if status_filter:
        query = query.filter(ResearchProject.status == status_filter)
    if region:
        query = query.filter(ResearchProject.region == region)
    if featured is not None:
        query = query.filter(ResearchProject.featured.is_(featured))

    return query.order_by(ResearchProject.title).all()


@router.get("/{slug}", response_model=ResearchProjectRead)
def get_research_project(slug: str, db: Session = Depends(get_db)) -> ResearchProject:
    project = (
        db.query(ResearchProject)
        .options(*_EAGER)
        .filter(ResearchProject.slug == slug, ResearchProject.published.is_(True))
        .first()
    )
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research project not found.")
    return project


def _apply_links(db: Session, project: ResearchProject, payload) -> None:
    if payload.methodology_ids is not None:
        project.methodologies = _resolve_by_ids(db, Methodology, payload.methodology_ids, "methodology_id")
    if payload.species_ids is not None:
        project.species = _resolve_by_ids(db, Species, payload.species_ids, "species_id")
    if payload.destination_ids is not None:
        project.destinations = _resolve_by_ids(db, Destination, payload.destination_ids, "destination_id")


@router.get("/admin/all", response_model=list[ResearchProjectRead])
def list_all_research_projects_admin(
    db: Session = Depends(get_db), _: User = Depends(_edit_projects)
) -> list[ResearchProject]:
    return db.query(ResearchProject).options(*_EAGER).order_by(ResearchProject.title).all()


@router.get("/admin/{project_id}", response_model=ResearchProjectRead)
def get_research_project_admin(
    project_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_projects)
) -> ResearchProject:
    project = db.query(ResearchProject).options(*_EAGER).filter(ResearchProject.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research project not found.")
    return project


@router.post("", response_model=ResearchProjectRead, status_code=status.HTTP_201_CREATED)
def create_research_project(
    payload: ResearchProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_projects),
) -> ResearchProject:
    if db.query(ResearchProject).filter(ResearchProject.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research project with this slug already exists.")
    if db.get(ResearchArea, payload.area_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="area_id does not reference an existing research area.")
    if payload.research_team_id and db.get(ResearchTeam, payload.research_team_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="research_team_id does not reference an existing team.")

    exclude = {"methodology_ids", "species_ids", "destination_ids"}
    project = ResearchProject(**payload.model_dump(exclude=exclude))
    _apply_links(db, project, payload)

    db.add(project)
    log_activity(db, current_user, ActivityAction.CREATED, "research project", project.title)
    if project.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "research project", project.title)
    db.commit()
    db.refresh(project)
    return project


@router.patch("/{project_id}", response_model=ResearchProjectRead)
def update_research_project(
    project_id: UUID,
    payload: ResearchProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_projects),
) -> ResearchProject:
    project = db.get(ResearchProject, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research project not found.")

    exclude = {"methodology_ids", "species_ids", "destination_ids"}
    updates = payload.model_dump(exclude_unset=True, exclude=exclude)

    if "slug" in updates and updates["slug"] != project.slug:
        if db.query(ResearchProject).filter(ResearchProject.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research project with this slug already exists.")
    if "area_id" in updates and db.get(ResearchArea, updates["area_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="area_id does not reference an existing research area.")
    if updates.get("research_team_id") and db.get(ResearchTeam, updates["research_team_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="research_team_id does not reference an existing team.")

    was_published = project.published
    for field, value in updates.items():
        setattr(project, field, value)

    _apply_links(db, project, payload)

    if updates:
        if not was_published and project.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "research project", project.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "research project", project.title)

    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_research_project(
    project_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_projects)
) -> None:
    project = db.get(ResearchProject, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research project not found.")

    db.delete(project)
    db.commit()
