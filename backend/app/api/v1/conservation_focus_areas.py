from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.conservation_focus_area import ConservationFocusArea
from app.models.conservation_project import ConservationProject
from app.models.user import User, UserRole
from app.schemas.conservation_focus_area import (
    ConservationFocusAreaCreate,
    ConservationFocusAreaRead,
    ConservationFocusAreaUpdate,
)

router = APIRouter(prefix="/conservation-focus-areas", tags=["conservation-focus-areas"])

_manage_areas = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, area: ConservationFocusArea) -> ConservationFocusAreaRead:
    count = (
        db.scalar(select(func.count()).select_from(ConservationProject).where(ConservationProject.focus_area_id == area.id))
        or 0
    )
    return ConservationFocusAreaRead.model_validate(area, from_attributes=True).model_copy(
        update={"project_count": count}
    )


@router.get("", response_model=list[ConservationFocusAreaRead])
def list_areas(db: Session = Depends(get_db)) -> list[ConservationFocusAreaRead]:
    areas = db.query(ConservationFocusArea).order_by(ConservationFocusArea.title).all()
    return [_to_read(db, a) for a in areas]


@router.get("/{slug}", response_model=ConservationFocusAreaRead)
def get_area(slug: str, db: Session = Depends(get_db)) -> ConservationFocusAreaRead:
    area = db.query(ConservationFocusArea).filter(ConservationFocusArea.slug == slug).first()
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation focus area not found.")
    return _to_read(db, area)


@router.get("/admin/all", response_model=list[ConservationFocusAreaRead])
def list_all_areas_admin(db: Session = Depends(get_db), _: User = Depends(_manage_areas)) -> list[ConservationFocusAreaRead]:
    areas = db.query(ConservationFocusArea).order_by(ConservationFocusArea.title).all()
    return [_to_read(db, a) for a in areas]


@router.get("/admin/{area_id}", response_model=ConservationFocusAreaRead)
def get_area_admin(
    area_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_areas)
) -> ConservationFocusAreaRead:
    area = db.get(ConservationFocusArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation focus area not found.")
    return _to_read(db, area)


@router.post("", response_model=ConservationFocusAreaRead, status_code=status.HTTP_201_CREATED)
def create_area(
    payload: ConservationFocusAreaCreate, db: Session = Depends(get_db), _: User = Depends(_manage_areas)
) -> ConservationFocusAreaRead:
    if db.query(ConservationFocusArea).filter(ConservationFocusArea.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A focus area with this slug already exists.")

    area = ConservationFocusArea(**payload.model_dump())
    db.add(area)
    db.commit()
    db.refresh(area)
    return _to_read(db, area)


@router.patch("/{area_id}", response_model=ConservationFocusAreaRead)
def update_area(
    area_id: UUID,
    payload: ConservationFocusAreaUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_areas),
) -> ConservationFocusAreaRead:
    area = db.get(ConservationFocusArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation focus area not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != area.slug:
        if db.query(ConservationFocusArea).filter(ConservationFocusArea.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A focus area with this slug already exists.")

    for field, value in updates.items():
        setattr(area, field, value)

    db.commit()
    db.refresh(area)
    return _to_read(db, area)


@router.delete("/{area_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_area(area_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_areas)) -> None:
    area = db.get(ConservationFocusArea, area_id)
    if area is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation focus area not found.")

    remaining = db.scalar(
        select(func.count()).select_from(ConservationProject).where(ConservationProject.focus_area_id == area_id)
    )
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete focus area with {remaining} project(s) still assigned to it.",
        )

    db.delete(area)
    db.commit()
