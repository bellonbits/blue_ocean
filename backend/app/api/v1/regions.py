from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.destination import Destination
from app.models.region import Region
from app.models.user import User, UserRole
from app.schemas.region import RegionCreate, RegionRead, RegionUpdate

router = APIRouter(prefix="/regions", tags=["regions"])

_manage_regions = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _to_read(db: Session, region: Region) -> RegionRead:
    count = db.scalar(select(func.count()).select_from(Destination).where(Destination.region_id == region.id)) or 0
    return RegionRead.model_validate(region, from_attributes=True).model_copy(update={"destinations_count": count})


@router.get("", response_model=list[RegionRead])
def list_regions(db: Session = Depends(get_db)) -> list[RegionRead]:
    regions = db.query(Region).order_by(Region.name).all()
    return [_to_read(db, r) for r in regions]


@router.get("/{slug}", response_model=RegionRead)
def get_region(slug: str, db: Session = Depends(get_db)) -> RegionRead:
    region = db.query(Region).filter(Region.slug == slug).first()
    if region is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Region not found.")
    return _to_read(db, region)


# Regions have no published flag, so these exist purely for the admin CMS to
# look a row up by id (the public routes above are keyed by slug) rather than
# to reveal anything hidden from the public list.
@router.get("/admin/all", response_model=list[RegionRead])
def list_all_regions_admin(db: Session = Depends(get_db), _: User = Depends(_manage_regions)) -> list[RegionRead]:
    regions = db.query(Region).order_by(Region.name).all()
    return [_to_read(db, r) for r in regions]


@router.get("/admin/{region_id}", response_model=RegionRead)
def get_region_admin(region_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_regions)) -> RegionRead:
    region = db.get(Region, region_id)
    if region is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Region not found.")
    return _to_read(db, region)


@router.post("", response_model=RegionRead, status_code=status.HTTP_201_CREATED)
def create_region(
    payload: RegionCreate, db: Session = Depends(get_db), _: User = Depends(_manage_regions)
) -> RegionRead:
    if db.query(Region).filter(Region.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A region with this slug already exists.")

    region = Region(**payload.model_dump())
    db.add(region)
    db.commit()
    db.refresh(region)
    return _to_read(db, region)


@router.patch("/{region_id}", response_model=RegionRead)
def update_region(
    region_id: UUID,
    payload: RegionUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_regions),
) -> RegionRead:
    region = db.get(Region, region_id)
    if region is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Region not found.")

    updates = payload.model_dump(exclude_unset=True)
    if "slug" in updates and updates["slug"] != region.slug:
        if db.query(Region).filter(Region.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A region with this slug already exists.")

    for field, value in updates.items():
        setattr(region, field, value)

    db.commit()
    db.refresh(region)
    return _to_read(db, region)


@router.delete("/{region_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_region(region_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_regions)) -> None:
    region = db.get(Region, region_id)
    if region is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Region not found.")

    remaining = db.scalar(select(func.count()).select_from(Destination).where(Destination.region_id == region_id))
    if remaining:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete region with {remaining} destination(s) still assigned to it.",
        )

    db.delete(region)
    db.commit()
