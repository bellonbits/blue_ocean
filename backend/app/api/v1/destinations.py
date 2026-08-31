from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.destination import Destination, DestinationStatus
from app.models.region import Region
from app.models.user import User, UserRole
from app.schemas.destination import DestinationCreate, DestinationRead, DestinationUpdate

router = APIRouter(prefix="/destinations", tags=["destinations"])

# Deleting a destination is more destructive than creating/editing one,
# so it's restricted to a narrower set of roles than create/update.
_edit_destinations = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
_delete_destinations = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


@router.get("", response_model=list[DestinationRead])
def list_destinations(
    region: str | None = Query(default=None, description="Filter by region slug"),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Destination]:
    query = (
        db.query(Destination)
        .options(joinedload(Destination.region))
        .filter(Destination.status == DestinationStatus.PUBLISHED)
    )

    if region:
        query = query.join(Region).filter(Region.slug == region)
    if featured is not None:
        query = query.filter(Destination.featured.is_(featured))

    return query.order_by(Destination.name).all()


@router.get("/{slug}", response_model=DestinationRead)
def get_destination(slug: str, db: Session = Depends(get_db)) -> Destination:
    destination = (
        db.query(Destination)
        .options(joinedload(Destination.region))
        .filter(Destination.slug == slug, Destination.status == DestinationStatus.PUBLISHED)
        .first()
    )
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")
    return destination


@router.get("/admin/all", response_model=list[DestinationRead])
def list_all_destinations_admin(db: Session = Depends(get_db), _: User = Depends(_edit_destinations)) -> list[Destination]:
    return db.query(Destination).options(joinedload(Destination.region)).order_by(Destination.name).all()


@router.get("/admin/{destination_id}", response_model=DestinationRead)
def get_destination_admin(
    destination_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_destinations)
) -> Destination:
    destination = (
        db.query(Destination).options(joinedload(Destination.region)).filter(Destination.id == destination_id).first()
    )
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")
    return destination


@router.post("", response_model=DestinationRead, status_code=status.HTTP_201_CREATED)
def create_destination(
    payload: DestinationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_destinations),
) -> Destination:
    if db.query(Destination).filter(Destination.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A destination with this slug already exists.")
    if db.get(Region, payload.region_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="region_id does not reference an existing region.")

    destination = Destination(**payload.model_dump())
    db.add(destination)
    log_activity(db, current_user, ActivityAction.CREATED, "destination", destination.name)
    if destination.status == DestinationStatus.PUBLISHED:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "destination", destination.name)
    db.commit()
    db.refresh(destination)
    return destination


@router.patch("/{destination_id}", response_model=DestinationRead)
def update_destination(
    destination_id: UUID,
    payload: DestinationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_destinations),
) -> Destination:
    destination = db.get(Destination, destination_id)
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    updates = payload.model_dump(exclude_unset=True)

    if "slug" in updates and updates["slug"] != destination.slug:
        if db.query(Destination).filter(Destination.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A destination with this slug already exists.")

    if "region_id" in updates and db.get(Region, updates["region_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="region_id does not reference an existing region.")

    was_published = destination.status == DestinationStatus.PUBLISHED
    for field, value in updates.items():
        setattr(destination, field, value)

    if updates:
        if not was_published and destination.status == DestinationStatus.PUBLISHED:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "destination", destination.name)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "destination", destination.name)

    db.commit()
    db.refresh(destination)
    return destination


@router.delete("/{destination_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_destination(
    destination_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_destinations)
) -> None:
    destination = db.get(Destination, destination_id)
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found.")

    db.delete(destination)
    db.commit()
