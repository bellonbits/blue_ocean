from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_optional_current_user
from app.core.rate_limit import limiter_application_submission
from app.db.session import get_db
from app.models.application import Application
from app.models.user import User
from app.schemas.application import ApplicationCreate, ApplicationRead

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("", response_model=ApplicationRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(limiter_application_submission)])
def create_application(
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
) -> Application:
    application = Application(**payload.model_dump(), user_id=user.id if user else None)
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.get("/me", response_model=list[ApplicationRead])
def list_my_applications(
    db: Session = Depends(get_db), user: User = Depends(get_current_active_user)
) -> list[Application]:
    return (
        db.query(Application)
        .filter(Application.user_id == user.id)
        .order_by(Application.created_at.desc())
        .all()
    )
