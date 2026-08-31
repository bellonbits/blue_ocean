from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.organization_settings import OrganizationSettings
from app.models.user import User, UserRole
from app.schemas.organization_settings import OrganizationSettingsRead, OrganizationSettingsUpdate

router = APIRouter(prefix="/organization", tags=["organization"])

# Same pattern as content_manager on conservation/communities/news
# (B7/B8): added alongside editor, not in place of it.
_edit_settings = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)


@router.get("", response_model=OrganizationSettingsRead)
def get_organization(db: Session = Depends(get_db)) -> OrganizationSettings:
    settings = db.query(OrganizationSettings).first()
    if settings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization settings have not been seeded yet — run scripts/seed_organization.py.",
        )
    return settings


@router.patch("", response_model=OrganizationSettingsRead)
def update_organization(
    payload: OrganizationSettingsUpdate, db: Session = Depends(get_db), _: User = Depends(_edit_settings)
) -> OrganizationSettings:
    settings = db.query(OrganizationSettings).first()
    if settings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization settings have not been seeded yet — run scripts/seed_organization.py.",
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(settings, field, value)

    db.commit()
    db.refresh(settings)
    return settings
