"""Authentication and user self-service API."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.core.rate_limit import limiter_auth_login
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.activity_log import ActivityLogEntry
from app.models.user import User, UserRole
from app.schemas.token import Token
from app.schemas.user import (
    ActivityLogEntryRead,
    AuthResponse,
    ChangePasswordRequest,
    LoginJsonRequest,
    UpdateInterestsRequest,
    UpdateLanguageRequest,
    UpdateNotificationPreferencesRequest,
    UpdateOwnProfileRequest,
    UserRead,
    UserRegister,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(limiter_auth_login)])
def register_user(payload: UserRegister, db: Session = Depends(get_db)) -> AuthResponse:
    """Creates a new user account, stores hashed credentials, and returns an access token."""
    existing = db.query(User).filter(User.email == payload.email.lower()).first()
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please log in instead.",
        )

    user = User(
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=UserRole.MEMBER,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user_id=user.id, role=user.role)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserRead.model_validate(user),
    )


@router.post("/login", response_model=Token, dependencies=[Depends(limiter_auth_login)])
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    """OAuth2 password form login (used by Swagger UI & standard form clients)."""
    user = db.query(User).filter(User.email == form_data.username.lower()).first()

    if user is None or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user account.")

    token = create_access_token(user_id=user.id, role=user.role)
    return Token(access_token=token)


@router.post("/login-json", response_model=AuthResponse, dependencies=[Depends(limiter_auth_login)])
def login_json(payload: LoginJsonRequest, db: Session = Depends(get_db)) -> AuthResponse:
    """JSON-based login endpoint for frontend client applications."""
    user = db.query(User).filter(User.email == payload.email.lower()).first()

    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user account.")

    token = create_access_token(user_id=user.id, role=user.role)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserRead.model_validate(user),
    )


@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_active_user)) -> User:
    """Returns the authenticated user's profile."""
    return current_user


@router.patch("/me", response_model=UserRead)
def update_own_profile(
    payload: UpdateOwnProfileRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> User:
    current_user.full_name = payload.full_name
    current_user.phone = payload.phone
    current_user.avatar_url = payload.avatar_url
    db.commit()
    db.refresh(current_user)
    return current_user


@router.patch("/me/notifications", response_model=UserRead)
def update_notification_preferences(
    payload: UpdateNotificationPreferencesRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> User:
    """Storage only — there's no outbound email service wired up yet, so
    these toggles record intent without triggering anything (yet)."""
    updates = payload.model_dump(exclude_unset=True)
    current_user.notification_preferences = {**current_user.notification_preferences, **updates}
    db.commit()
    db.refresh(current_user)
    return current_user


@router.patch("/me/interests", response_model=UserRead)
def update_own_interests(
    payload: UpdateInterestsRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> User:
    """The dashboard Profile page's "Ocean Interests" checkboxes — storage
    only, same as notification_preferences (see that endpoint's docstring)."""
    current_user.interests = payload.interests
    db.commit()
    db.refresh(current_user)
    return current_user


@router.patch("/me/language", response_model=UserRead)
def update_preferred_language(
    payload: UpdateLanguageRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> User:
    """Persists the account's language choice so it follows the user across
    devices — the anonymous/pre-login case is handled entirely client-side
    (browser-language detection + localStorage, see LanguageContext.jsx)."""
    current_user.preferred_language = payload.preferred_language
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/me/activity", response_model=list[ActivityLogEntryRead])
def read_own_activity(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> list[ActivityLogEntry]:
    return (
        db.query(ActivityLogEntry)
        .filter(ActivityLogEntry.user_id == current_user.id)
        .order_by(ActivityLogEntry.created_at.desc())
        .limit(20)
        .all()
    )


@router.post("/change-password", status_code=status.HTTP_204_NO_CONTENT)
def change_password(
    payload: ChangePasswordRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> None:
    if not verify_password(payload.current_password, current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Current password is incorrect.")

    current_user.hashed_password = hash_password(payload.new_password)
    db.commit()
