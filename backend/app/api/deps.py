"""
Shared FastAPI dependencies for authentication and role enforcement.

This is the one place that decides who's allowed to do what — every
protected route depends on get_current_user or require_role(...), never
re-implements its own check. Frontend route guards are UX only; this is
the actual security boundary.
"""

from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import InvalidTokenError, decode_access_token
from app.db.session import get_db
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = decode_access_token(token)
    except InvalidTokenError as exc:
        raise _credentials_exception from exc

    user_id = payload.get("sub")
    if user_id is None:
        raise _credentials_exception

    user = db.get(User, UUID(user_id))
    if user is None:
        raise _credentials_exception

    return user


def get_current_active_user(user: User = Depends(get_current_user)) -> User:
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user account")
    return user


def require_role(*allowed_roles: UserRole):
    """Dependency factory: Depends(require_role(UserRole.ADMIN, UserRole.SUPER_ADMIN))."""

    def _check(user: User = Depends(get_current_active_user)) -> User:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{user.role.value}' is not permitted to perform this action.",
            )
        return user

    return _check
