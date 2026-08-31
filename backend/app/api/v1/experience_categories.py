from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.experience import Experience
from app.models.experience_category import ExperienceCategory
from app.models.user import User, UserRole
from app.schemas.experience_category import (
    ExperienceCategoryCreate,
    ExperienceCategoryRead,
    ExperienceCategoryUpdate,
)

router = APIRouter(prefix="/experience-categories", tags=["experience-categories"])

_manage_categories = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, category: ExperienceCategory) -> ExperienceCategoryRead:
    count = db.scalar(select(func.count()).select_from(Experience).where(Experience.category_id == category.id)) or 0
    return ExperienceCategoryRead.model_validate(category, from_attributes=True).model_copy(
        update={"experiences_count": count}
    )


@router.get("", response_model=list[ExperienceCategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[ExperienceCategoryRead]:
    categories = db.query(ExperienceCategory).order_by(ExperienceCategory.title).all()
    return [_to_read(db, c) for c in categories]


@router.get("/{slug}", response_model=ExperienceCategoryRead)
def get_category(slug: str, db: Session = Depends(get_db)) -> ExperienceCategoryRead:
    category = db.query(ExperienceCategory).filter(ExperienceCategory.slug == slug).first()
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience category not found.")
    return _to_read(db, category)


@router.get("/admin/all", response_model=list[ExperienceCategoryRead])
def list_all_categories_admin(db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> list[ExperienceCategoryRead]:
    categories = db.query(ExperienceCategory).order_by(ExperienceCategory.title).all()
    return [_to_read(db, c) for c in categories]


@router.get("/admin/{category_id}", response_model=ExperienceCategoryRead)
def get_category_admin(
    category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> ExperienceCategoryRead:
    category = db.get(ExperienceCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience category not found.")
    return _to_read(db, category)


@router.post("", response_model=ExperienceCategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: ExperienceCategoryCreate, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> ExperienceCategoryRead:
    if db.query(ExperienceCategory).filter(ExperienceCategory.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    category = ExperienceCategory(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.patch("/{category_id}", response_model=ExperienceCategoryRead)
def update_category(
    category_id: UUID,
    payload: ExperienceCategoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_categories),
) -> ExperienceCategoryRead:
    category = db.get(ExperienceCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience category not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != category.slug:
        if db.query(ExperienceCategory).filter(ExperienceCategory.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    for field, value in updates.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> None:
    category = db.get(ExperienceCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience category not found.")

    remaining = db.scalar(select(func.count()).select_from(Experience).where(Experience.category_id == category_id))
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete category with {remaining} experiences still assigned to it.",
        )

    db.delete(category)
    db.commit()
