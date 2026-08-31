from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.destination import Destination
from app.models.species import Species
from app.models.species_category import SpeciesCategory
from app.models.user import User, UserRole
from app.schemas.species import SpeciesCreate, SpeciesRead, SpeciesUpdate

router = APIRouter(prefix="/species", tags=["species"])

_edit_species = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
_delete_species = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _resolve_destinations(db: Session, destination_ids: list[UUID]) -> list[Destination]:
    if not destination_ids:
        return []
    destinations = db.query(Destination).filter(Destination.id.in_(destination_ids)).all()
    found_ids = {d.id for d in destinations}
    missing = set(destination_ids) - found_ids
    if missing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown destination_id(s): {', '.join(str(m) for m in missing)}",
        )
    return destinations


@router.get("", response_model=list[SpeciesRead])
def list_species(
    category: str | None = Query(default=None, description="Filter by category slug"),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Species]:
    query = (
        db.query(Species)
        .options(joinedload(Species.category), joinedload(Species.destinations))
        .filter(Species.published.is_(True))
    )

    if category:
        query = query.join(SpeciesCategory).filter(SpeciesCategory.slug == category)
    if featured is not None:
        query = query.filter(Species.featured.is_(featured))

    return query.order_by(Species.common_name).all()


@router.get("/{slug}", response_model=SpeciesRead)
def get_species(slug: str, db: Session = Depends(get_db)) -> Species:
    species = (
        db.query(Species)
        .options(joinedload(Species.category), joinedload(Species.destinations))
        .filter(Species.slug == slug, Species.published.is_(True))
        .first()
    )
    if species is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species not found.")
    return species


@router.get("/admin/all", response_model=list[SpeciesRead])
def list_all_species_admin(db: Session = Depends(get_db), _: User = Depends(_edit_species)) -> list[Species]:
    return (
        db.query(Species)
        .options(joinedload(Species.category), joinedload(Species.destinations))
        .order_by(Species.common_name)
        .all()
    )


@router.get("/admin/{species_id}", response_model=SpeciesRead)
def get_species_admin(species_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_species)) -> Species:
    species = (
        db.query(Species)
        .options(joinedload(Species.category), joinedload(Species.destinations))
        .filter(Species.id == species_id)
        .first()
    )
    if species is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species not found.")
    return species


@router.post("", response_model=SpeciesRead, status_code=status.HTTP_201_CREATED)
def create_species(
    payload: SpeciesCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_species),
) -> Species:
    if db.query(Species).filter(Species.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A species with this slug already exists.")
    if db.get(SpeciesCategory, payload.category_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    species = Species(**payload.model_dump(exclude={"destination_ids"}))
    species.destinations = _resolve_destinations(db, payload.destination_ids)

    db.add(species)
    log_activity(db, current_user, ActivityAction.CREATED, "species", species.common_name)
    if species.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "species", species.common_name)
    db.commit()
    db.refresh(species)
    return species


@router.patch("/{species_id}", response_model=SpeciesRead)
def update_species(
    species_id: UUID,
    payload: SpeciesUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_species),
) -> Species:
    species = db.get(Species, species_id)
    if species is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species not found.")

    updates = payload.model_dump(exclude_unset=True, exclude={"destination_ids"})

    if "slug" in updates and updates["slug"] != species.slug:
        if db.query(Species).filter(Species.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A species with this slug already exists.")

    if "category_id" in updates and db.get(SpeciesCategory, updates["category_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    was_published = species.published
    for field, value in updates.items():
        setattr(species, field, value)

    if payload.destination_ids is not None:
        species.destinations = _resolve_destinations(db, payload.destination_ids)

    if updates:
        if not was_published and species.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "species", species.common_name)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "species", species.common_name)

    db.commit()
    db.refresh(species)
    return species


@router.delete("/{species_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_species(species_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_species)) -> None:
    species = db.get(Species, species_id)
    if species is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species not found.")

    db.delete(species)
    db.commit()
