"""
User management — creating, listing, updating, and removing admin/CMS
accounts.

There's no public self-registration (see the module docstring in
app/models/user.py). Only SUPER_ADMIN and ADMIN can create, list, or
update other accounts; this is the concrete proof that require_role()
actually enforces something, not just that a token is present.

PATCH deliberately refuses to let a user change their own role or
active status — every other write endpoint in this API lets you edit
your own content, but self-role-change and self-deactivation are a
lockout risk with no recovery path (there's no password-reset flow,
and the only other bootstrap route is scripts/create_superuser.py). An
admin who needs their own role changed needs another admin to do it.
DELETE is narrower still — SUPER_ADMIN only, and blocked on self — since
removing an account outright is more consequential than any other
delete in this API, admin accounts included.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.core.security import hash_password
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])

_manage_users = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)
_delete_users = require_role(UserRole.SUPER_ADMIN)


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_users),
) -> User:
    if db.query(User).filter(User.email == payload.email).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A user with this email already exists.")

    user = User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role=payload.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db), _: User = Depends(_manage_users)) -> list[User]:
    return db.query(User).order_by(User.created_at).all()


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_users)) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return user


@router.patch("/{user_id}", response_model=UserRead)
def update_user(
    user_id: UUID,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_manage_users),
) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    updates = payload.model_dump(exclude_unset=True)
    if user_id == current_user.id and ("role" in updates or "is_active" in updates):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot change your own role or active status — ask another admin.",
        )

    for field, value in updates.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(_delete_users)) -> None:
    if user_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot delete your own account.")

    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    db.delete(user)
    db.commit()
