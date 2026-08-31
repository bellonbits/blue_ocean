from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.research_area import ResearchArea
from app.models.research_project import ResearchProject
from app.models.user import User, UserRole
from app.schemas.research_area import ResearchAreaCreate, ResearchAreaRead, ResearchAreaUpdate

router = APIRouter(prefix="/research-areas", tags=["research-areas"])

_manage_areas = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, area: ResearchArea) -> ResearchAreaRead:
    count = db.scalar(select(func.count()).select_from(ResearchProject).where(ResearchProject.area_id == area.id)) or 0
    return ResearchAreaRead.model_validate(area, from_attributes=True).model_copy(update={"project_count": count})


@router.get("", response_model=list[ResearchAreaRead])
def list_areas(db: Session = Depends(get_db)) -> list[ResearchAreaRead]:
    areas = db.query(ResearchArea).order_by(ResearchArea.title).all()
    return [_to_read(db, a) for a in areas]


@router.get("/{slug}", response_model=ResearchAreaRead)
def get_area(slug: str, db: Session = Depends(get_db)) -> ResearchAreaRead:
    area = db.query(ResearchArea).filter(ResearchArea.slug == slug).first()
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research area not found.")
    return _to_read(db, area)


@router.get("/admin/all", response_model=list[ResearchAreaRead])
def list_all_areas_admin(db: Session = Depends(get_db), _: User = Depends(_manage_areas)) -> list[ResearchAreaRead]:
    areas = db.query(ResearchArea).order_by(ResearchArea.title).all()
    return [_to_read(db, a) for a in areas]


@router.get("/admin/{area_id}", response_model=ResearchAreaRead)
def get_area_admin(area_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_areas)) -> ResearchAreaRead:
    area = db.get(ResearchArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research area not found.")
    return _to_read(db, area)


@router.post("", response_model=ResearchAreaRead, status_code=status.HTTP_201_CREATED)
def create_area(
    payload: ResearchAreaCreate, db: Session = Depends(get_db), _: User = Depends(_manage_areas)
) -> ResearchAreaRead:
    if db.query(ResearchArea).filter(ResearchArea.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research area with this slug already exists.")

    area = ResearchArea(**payload.model_dump())
    db.add(area)
    db.commit()
    db.refresh(area)
    return _to_read(db, area)


@router.patch("/{area_id}", response_model=ResearchAreaRead)
def update_area(
    area_id: UUID, payload: ResearchAreaUpdate, db: Session = Depends(get_db), _: User = Depends(_manage_areas)
) -> ResearchAreaRead:
    area = db.get(ResearchArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research area not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != area.slug:
        if db.query(ResearchArea).filter(ResearchArea.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A research area with this slug already exists.")

    for field, value in updates.items():
        setattr(area, field, value)

    db.commit()
    db.refresh(area)
    return _to_read(db, area)


@router.delete("/{area_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_area(area_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_areas)) -> None:
    area = db.get(ResearchArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Research area not found.")

    remaining = db.scalar(select(func.count()).select_from(ResearchProject).where(ResearchProject.area_id == area_id))
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete area with {remaining} research project(s) still assigned to it.",
        )

    db.delete(area)
    db.commit()
