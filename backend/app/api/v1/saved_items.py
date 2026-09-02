from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.db.session import get_db
from app.models.saved_item import SavedItem, SavedItemType
from app.models.user import User
from app.schemas.saved_item import SavedItemCreate, SavedItemRead

router = APIRouter(prefix="/saved-items", tags=["saved-items"])


@router.get("/me", response_model=list[SavedItemRead])
def list_my_saved_items(
    content_type: SavedItemType | None = Query(default=None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
) -> list[SavedItem]:
    query = db.query(SavedItem).filter(SavedItem.user_id == user.id)
    if content_type is not None:
        query = query.filter(SavedItem.content_type == content_type)
    return query.order_by(SavedItem.created_at.desc()).all()


@router.post("/toggle", response_model=SavedItemRead | None)
def toggle_saved_item(
    payload: SavedItemCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    """Single endpoint for a heart/save button: saves if not already
    saved, un-saves if it is. Returns the row when saved, null when
    un-saved — the frontend doesn't need to track the row's id."""
    existing = (
        db.query(SavedItem)
        .filter(
            SavedItem.user_id == user.id,
            SavedItem.content_type == payload.content_type,
            SavedItem.content_slug == payload.content_slug,
        )
        .first()
    )

    if existing is not None:
        db.delete(existing)
        db.commit()
        return None

    item = SavedItem(user_id=user.id, content_type=payload.content_type, content_slug=payload.content_slug)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_saved_item(
    item_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_active_user)
) -> None:
    item = db.query(SavedItem).filter(SavedItem.id == item_id, SavedItem.user_id == user.id).first()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Saved item not found.")

    db.delete(item)
    db.commit()
