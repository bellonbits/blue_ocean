from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.db.session import get_db
from app.models.destination import Destination
from app.models.region import Region, RegionTranslation
from app.models.user import User, UserRole
from app.schemas.region import RegionCreate, RegionRead, RegionUpdate

router = APIRouter(prefix="/regions", tags=["regions"])

_manage_regions = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


def _localize(region: Region, lang: str | None) -> Region:
    """Overlays a non-English translation onto the in-memory ORM object
    before it's serialized — never committed. Mirrors `_localize` in
    destinations.py."""
    if not lang or lang == "en":
        return region

    translation = next((t for t in region.translations if t.language == lang), None)
    if translation is None:
        return region

    if translation.name:
        region.name = translation.name
    if translation.subtitle:
        region.subtitle = translation.subtitle
    if translation.tagline:
        region.tagline = translation.tagline
    if translation.description:
        region.description = translation.description
    if translation.highlights:
        region.highlights = translation.highlights
    return region


def _upsert_translations(db: Session, region: Region, translations: dict[str, dict] | None) -> None:
    if not translations:
        return
    existing = {t.language: t for t in region.translations}
    for language, data in translations.items():
        if language in existing:
            for field, value in data.items():
                setattr(existing[language], field, value)
        else:
            db.add(RegionTranslation(region_id=region.id, language=language, **data))


def _to_read(db: Session, region: Region, lang: str | None = None) -> RegionRead:
    count = db.scalar(select(func.count()).select_from(Destination).where(Destination.region_id == region.id)) or 0
    region = _localize(region, lang)
    return RegionRead.model_validate(region, from_attributes=True).model_copy(update={"destinations_count": count})


@router.get("", response_model=list[RegionRead])
def list_regions(
    lang: str | None = Query(default=None, description="Language code, e.g. 'so' — omit or 'en' for English"),
    db: Session = Depends(get_db),
) -> list[RegionRead]:
    regions = db.query(Region).options(joinedload(Region.translations)).order_by(Region.name).all()
    return [_to_read(db, r, lang) for r in regions]


@router.get("/{slug}", response_model=RegionRead)
def get_region(slug: str, lang: str | None = Query(default=None), db: Session = Depends(get_db)) -> RegionRead:
    region = (
        db.query(Region).options(joinedload(Region.translations)).filter(Region.slug == slug).first()
    )
    if region is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Region not found.")
    return _to_read(db, region, lang)


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

    data = payload.model_dump()
    translations = data.pop("translations", None)

    region = Region(**data)
    db.add(region)
    db.flush()
    _upsert_translations(db, region, translations)
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
    translations = updates.pop("translations", None)
    if "slug" in updates and updates["slug"] != region.slug:
        if db.query(Region).filter(Region.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A region with this slug already exists.")

    for field, value in updates.items():
        setattr(region, field, value)

    if translations:
        _upsert_translations(db, region, translations)

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
