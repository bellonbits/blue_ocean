from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.species import Species
from app.models.species_category import SpeciesCategory
from app.models.user import User, UserRole
from app.schemas.species_category import SpeciesCategoryCreate, SpeciesCategoryRead, SpeciesCategoryUpdate

router = APIRouter(prefix="/species-categories", tags=["species-categories"])

_manage_categories = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, category: SpeciesCategory) -> SpeciesCategoryRead:
    count = db.scalar(select(func.count()).select_from(Species).where(Species.category_id == category.id)) or 0
    return SpeciesCategoryRead.model_validate(category, from_attributes=True).model_copy(
        update={"species_count": count}
    )


@router.get("", response_model=list[SpeciesCategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[SpeciesCategoryRead]:
    categories = db.query(SpeciesCategory).order_by(SpeciesCategory.title).all()
    return [_to_read(db, c) for c in categories]


@router.get("/{slug}", response_model=SpeciesCategoryRead)
def get_category(slug: str, db: Session = Depends(get_db)) -> SpeciesCategoryRead:
    category = db.query(SpeciesCategory).filter(SpeciesCategory.slug == slug).first()
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species category not found.")
    return _to_read(db, category)


@router.get("/admin/all", response_model=list[SpeciesCategoryRead])
def list_all_categories_admin(db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> list[SpeciesCategoryRead]:
    categories = db.query(SpeciesCategory).order_by(SpeciesCategory.title).all()
    return [_to_read(db, c) for c in categories]


@router.get("/admin/{category_id}", response_model=SpeciesCategoryRead)
def get_category_admin(
    category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> SpeciesCategoryRead:
    category = db.get(SpeciesCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species category not found.")
    return _to_read(db, category)


@router.post("", response_model=SpeciesCategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: SpeciesCategoryCreate, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> SpeciesCategoryRead:
    if db.query(SpeciesCategory).filter(SpeciesCategory.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    category = SpeciesCategory(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.patch("/{category_id}", response_model=SpeciesCategoryRead)
def update_category(
    category_id: UUID,
    payload: SpeciesCategoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_categories),
) -> SpeciesCategoryRead:
    category = db.get(SpeciesCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species category not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != category.slug:
        if db.query(SpeciesCategory).filter(SpeciesCategory.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    for field, value in updates.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> None:
    category = db.get(SpeciesCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species category not found.")

    remaining = db.scalar(select(func.count()).select_from(Species).where(Species.category_id == category_id))
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete category with {remaining} species still assigned to it.",
        )

    db.delete(category)
    db.commit()
