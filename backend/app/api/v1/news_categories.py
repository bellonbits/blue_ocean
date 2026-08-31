from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.news_article import NewsArticle
from app.models.news_category import NewsCategory
from app.models.user import User, UserRole
from app.schemas.news_category import NewsCategoryCreate, NewsCategoryRead, NewsCategoryUpdate

router = APIRouter(prefix="/news-categories", tags=["news-categories"])

_manage_categories = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, category: NewsCategory) -> NewsCategoryRead:
    count = db.scalar(select(func.count()).select_from(NewsArticle).where(NewsArticle.category_id == category.id)) or 0
    return NewsCategoryRead.model_validate(category, from_attributes=True).model_copy(update={"article_count": count})


@router.get("", response_model=list[NewsCategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[NewsCategoryRead]:
    categories = db.query(NewsCategory).order_by(NewsCategory.label).all()
    return [_to_read(db, c) for c in categories]


@router.get("/{slug}", response_model=NewsCategoryRead)
def get_category(slug: str, db: Session = Depends(get_db)) -> NewsCategoryRead:
    category = db.query(NewsCategory).filter(NewsCategory.slug == slug).first()
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News category not found.")
    return _to_read(db, category)


@router.get("/admin/all", response_model=list[NewsCategoryRead])
def list_all_categories_admin(db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> list[NewsCategoryRead]:
    categories = db.query(NewsCategory).order_by(NewsCategory.label).all()
    return [_to_read(db, c) for c in categories]


@router.get("/admin/{category_id}", response_model=NewsCategoryRead)
def get_category_admin(
    category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> NewsCategoryRead:
    category = db.get(NewsCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News category not found.")
    return _to_read(db, category)


@router.post("", response_model=NewsCategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: NewsCategoryCreate, db: Session = Depends(get_db), _: User = Depends(_manage_categories)
) -> NewsCategoryRead:
    if db.query(NewsCategory).filter(NewsCategory.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    category = NewsCategory(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.patch("/{category_id}", response_model=NewsCategoryRead)
def update_category(
    category_id: UUID,
    payload: NewsCategoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_categories),
) -> NewsCategoryRead:
    category = db.get(NewsCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News category not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != category.slug:
        if db.query(NewsCategory).filter(NewsCategory.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A category with this slug already exists.")

    for field, value in updates.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return _to_read(db, category)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_categories)) -> None:
    category = db.get(NewsCategory, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News category not found.")

    remaining = db.scalar(select(func.count()).select_from(NewsArticle).where(NewsArticle.category_id == category_id))
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete category with {remaining} article(s) still assigned to it.",
        )

    db.delete(category)
    db.commit()
