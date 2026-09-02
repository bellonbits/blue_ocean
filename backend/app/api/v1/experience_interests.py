from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.db.session import get_db
from app.models.experience_interest import ExperienceInterest
from app.models.user import User
from app.schemas.experience_interest import (
    ExperienceInterestCreate,
    ExperienceInterestRead,
    ExperienceInterestUpdate,
)

router = APIRouter(prefix="/experience-interests", tags=["experience-interests"])


@router.get("/me", response_model=list[ExperienceInterestRead])
def list_my_experience_interests(
    db: Session = Depends(get_db), user: User = Depends(get_current_active_user)
) -> list[ExperienceInterest]:
    return (
        db.query(ExperienceInterest)
        .filter(ExperienceInterest.user_id == user.id)
        .order_by(ExperienceInterest.updated_at.desc())
        .all()
    )


@router.post("", response_model=ExperienceInterestRead, status_code=status.HTTP_201_CREATED)
def set_experience_interest(
    payload: ExperienceInterestCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
) -> ExperienceInterest:
    """Upsert: marks an experience as interested (or whatever status is
    given). Calling this again for the same experience updates the
    existing row's status instead of erroring."""
    existing = (
        db.query(ExperienceInterest)
        .filter(ExperienceInterest.user_id == user.id, ExperienceInterest.experience_slug == payload.experience_slug)
        .first()
    )

    if existing is not None:
        existing.status = payload.status
        db.commit()
        db.refresh(existing)
        return existing

    interest = ExperienceInterest(user_id=user.id, experience_slug=payload.experience_slug, status=payload.status)
    db.add(interest)
    db.commit()
    db.refresh(interest)
    return interest


@router.patch("/{interest_id}", response_model=ExperienceInterestRead)
def update_experience_interest(
    interest_id: UUID,
    payload: ExperienceInterestUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
) -> ExperienceInterest:
    interest = (
        db.query(ExperienceInterest)
        .filter(ExperienceInterest.id == interest_id, ExperienceInterest.user_id == user.id)
        .first()
    )
    if interest is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience interest not found.")

    interest.status = payload.status
    db.commit()
    db.refresh(interest)
    return interest


@router.delete("/{interest_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_experience_interest(
    interest_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_active_user)
) -> None:
    interest = (
        db.query(ExperienceInterest)
        .filter(ExperienceInterest.id == interest_id, ExperienceInterest.user_id == user.id)
        .first()
    )
    if interest is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience interest not found.")

    db.delete(interest)
    db.commit()
