from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.db.session import get_db
from app.models.research_area import ResearchArea
from app.models.research_project import ResearchProject
from app.models.research_team import ResearchTeam
from app.models.user import User, UserRole
from app.schemas.research_team import ResearchTeamCreate, ResearchTeamRead, ResearchTeamUpdate

router = APIRouter(prefix="/research-teams", tags=["research-teams"])

_manage_teams = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _resolve_areas(db: Session, area_ids: list[UUID]) -> list[ResearchArea]:
    if not area_ids:
        return []
    areas = db.query(ResearchArea).filter(ResearchArea.id.in_(area_ids)).all()
    missing = set(area_ids) - {a.id for a in areas}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown area_id(s): {', '.join(str(m) for m in missing)}")
    return areas


def _to_read(db: Session, team: ResearchTeam) -> ResearchTeamRead:
    count = (
        db.scalar(select(func.count()).select_from(ResearchProject).where(ResearchProject.research_team_id == team.id))
        or 0
    )
    return ResearchTeamRead.model_validate(team, from_attributes=True).model_copy(update={"project_count": count})


@router.get("", response_model=list[ResearchTeamRead])
def list_teams(db: Session = Depends(get_db)) -> list[ResearchTeamRead]:
    teams = db.query(ResearchTeam).options(joinedload(ResearchTeam.focus_areas)).order_by(ResearchTeam.name).all()
    return [_to_read(db, t) for t in teams]


@router.get("/{slug}", response_model=ResearchTeamRead)
def get_team(slug: str, db: Session = Depends(get_db)) -> ResearchTeamRead:
    team = (
        db.query(ResearchTeam)
        .options(joinedload(ResearchTeam.focus_areas))
        .filter(ResearchTeam.slug == slug)
        .first()
    )
    if team is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research team not found.")
    return _to_read(db, team)


@router.get("/admin/all", response_model=list[ResearchTeamRead])
def list_all_teams_admin(db: Session = Depends(get_db), _: User = Depends(_manage_teams)) -> list[ResearchTeamRead]:
    teams = db.query(ResearchTeam).options(joinedload(ResearchTeam.focus_areas)).order_by(ResearchTeam.name).all()
    return [_to_read(db, t) for t in teams]


@router.get("/admin/{team_id}", response_model=ResearchTeamRead)
def get_team_admin(team_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_teams)) -> ResearchTeamRead:
    team = (
        db.query(ResearchTeam).options(joinedload(ResearchTeam.focus_areas)).filter(ResearchTeam.id == team_id).first()
    )
    if team is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research team not found.")
    return _to_read(db, team)


@router.post("", response_model=ResearchTeamRead, status_code=status.HTTP_201_CREATED)
def create_team(
    payload: ResearchTeamCreate, db: Session = Depends(get_db), _: User = Depends(_manage_teams)
) -> ResearchTeamRead:
    if db.query(ResearchTeam).filter(ResearchTeam.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research team with this slug already exists.")

    team = ResearchTeam(**payload.model_dump(exclude={"focus_area_ids"}))
    team.focus_areas = _resolve_areas(db, payload.focus_area_ids)
    db.add(team)
    db.commit()
    db.refresh(team)
    return _to_read(db, team)


@router.patch("/{team_id}", response_model=ResearchTeamRead)
def update_team(
    team_id: UUID, payload: ResearchTeamUpdate, db: Session = Depends(get_db), _: User = Depends(_manage_teams)
) -> ResearchTeamRead:
    team = db.get(ResearchTeam, team_id)
    if team is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research team not found.")

    updates = payload.model_dump(exclude_unset=True, exclude={"focus_area_ids"})
    if "slug" in updates and updates["slug"] != team.slug:
        if db.query(ResearchTeam).filter(ResearchTeam.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research team with this slug already exists.")

    for field, value in updates.items():
        setattr(team, field, value)

    if payload.focus_area_ids is not None:
        team.focus_areas = _resolve_areas(db, payload.focus_area_ids)

    db.commit()
    db.refresh(team)
    return _to_read(db, team)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team(team_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_teams)) -> None:
    team = db.get(ResearchTeam, team_id)
    if team is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research team not found.")

    remaining = db.scalar(
        select(func.count()).select_from(ResearchProject).where(ResearchProject.research_team_id == team_id)
    )
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete team with {remaining} research project(s) still assigned to it.",
        )

    db.delete(team)
    db.commit()
