from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.methodology import Methodology
from app.models.user import User, UserRole
from app.schemas.methodology import MethodologyCreate, MethodologyRead, MethodologyUpdate

router = APIRouter(prefix="/methodologies", tags=["methodologies"])

_manage_methodologies = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


@router.get("", response_model=list[MethodologyRead])
def list_methodologies(db: Session = Depends(get_db)) -> list[Methodology]:
    return db.query(Methodology).order_by(Methodology.label).all()


@router.get("/admin/all", response_model=list[MethodologyRead])
def list_all_methodologies_admin(db: Session = Depends(get_db), _: User = Depends(_manage_methodologies)) -> list[Methodology]:
    return db.query(Methodology).order_by(Methodology.label).all()


@router.get("/admin/{methodology_id}", response_model=MethodologyRead)
def get_methodology_admin(
    methodology_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_methodologies)
) -> Methodology:
    methodology = db.get(Methodology, methodology_id)
    if methodology is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Methodology not found.")
    return methodology


@router.post("", response_model=MethodologyRead, status_code=status.HTTP_201_CREATED)
def create_methodology(
    payload: MethodologyCreate, db: Session = Depends(get_db), _: User = Depends(_manage_methodologies)
) -> Methodology:
    if db.query(Methodology).filter(Methodology.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A methodology with this slug already exists.")

    methodology = Methodology(**payload.model_dump())
    db.add(methodology)
    db.commit()
    db.refresh(methodology)
    return methodology


@router.patch("/{methodology_id}", response_model=MethodologyRead)
def update_methodology(
    methodology_id: UUID,
    payload: MethodologyUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_methodologies),
) -> Methodology:
    methodology = db.get(Methodology, methodology_id)
    if methodology is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Methodology not found.")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(methodology, field, value)

    db.commit()
    db.refresh(methodology)
    return methodology


@router.delete("/{methodology_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_methodology(
    methodology_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_methodologies)
) -> None:
    methodology = db.get(Methodology, methodology_id)
    if methodology is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Methodology not found.")

    db.delete(methodology)
    db.commit()
