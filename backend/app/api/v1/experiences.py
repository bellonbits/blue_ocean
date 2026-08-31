from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.destination import Destination
from app.models.experience import Experience, ExperienceStatus
from app.models.experience_category import ExperienceCategory
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.experience import ExperienceCreate, ExperienceRead, ExperienceUpdate

router = APIRouter(prefix="/experiences", tags=["experiences"])

_edit_experiences = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
_delete_experiences = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(Experience.category),
    joinedload(Experience.destinations),
    joinedload(Experience.marine_species),
)


def _resolve_by_ids(db: Session, model, ids: list[UUID], label: str) -> list:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    missing = set(ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown {label}(s): {', '.join(str(m) for m in missing)}",
        )
    return rows


@router.get("", response_model=list[ExperienceRead])
def list_experiences(
    category: str | None = Query(default=None, description="Filter by category slug"),
    region: str | None = Query(default=None),
    status_: ExperienceStatus | None = Query(default=None, alias="status"),
    featured: bool | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Experience]:
    query = db.query(Experience).options(*_EAGER).filter(Experience.published.is_(True))

    if category:
        query = query.join(ExperienceCategory).filter(ExperienceCategory.slug == category)
    if region:
        query = query.filter(Experience.region == region)
    if status_ is not None:
        query = query.filter(Experience.status == status_)
    if featured is not None:
        query = query.filter(Experience.featured.is_(featured))

    return query.order_by(Experience.title).all()


@router.get("/{slug}", response_model=ExperienceRead)
def get_experience(slug: str, db: Session = Depends(get_db)) -> Experience:
    experience = (
        db.query(Experience)
        .options(*_EAGER)
        .filter(Experience.slug == slug, Experience.published.is_(True))
        .first()
    )
    if experience is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")
    return experience


@router.get("/admin/all", response_model=list[ExperienceRead])
def list_all_experiences_admin(db: Session = Depends(get_db), _: User = Depends(_edit_experiences)) -> list[Experience]:
    return db.query(Experience).options(*_EAGER).order_by(Experience.title).all()


@router.get("/admin/{experience_id}", response_model=ExperienceRead)
def get_experience_admin(
    experience_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_experiences)
) -> Experience:
    experience = db.query(Experience).options(*_EAGER).filter(Experience.id == experience_id).first()
    if experience is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")
    return experience


@router.post("", response_model=ExperienceRead, status_code=status.HTTP_201_CREATED)
def create_experience(
    payload: ExperienceCreate, db: Session = Depends(get_db), current_user: User = Depends(_edit_experiences)
) -> Experience:
    if db.query(Experience).filter(Experience.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An experience with this slug already exists.")
    if db.get(ExperienceCategory, payload.category_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    data = payload.model_dump(exclude={"destination_ids", "marine_species_ids", "story"})
    experience = Experience(**data, story=payload.story.model_dump())
    experience.destinations = _resolve_by_ids(db, Destination, payload.destination_ids, "destination_id")
    experience.marine_species = _resolve_by_ids(db, Species, payload.marine_species_ids, "species_id")

    db.add(experience)
    log_activity(db, current_user, ActivityAction.CREATED, "experience", experience.title)
    if experience.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "experience", experience.title)
    db.commit()
    db.refresh(experience)
    return experience


@router.patch("/{experience_id}", response_model=ExperienceRead)
def update_experience(
    experience_id: UUID,
    payload: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_experiences),
) -> Experience:
    experience = db.get(Experience, experience_id)
    if experience is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")

    updates = payload.model_dump(exclude_unset=True, exclude={"destination_ids", "marine_species_ids", "story"})

    if "slug" in updates and updates["slug"] != experience.slug:
        if db.query(Experience).filter(Experience.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An experience with this slug already exists.")

    if "category_id" in updates and db.get(ExperienceCategory, updates["category_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    was_published = experience.published
    for field, value in updates.items():
        setattr(experience, field, value)

    if payload.story is not None:
        experience.story = payload.story.model_dump()
    if payload.destination_ids is not None:
        experience.destinations = _resolve_by_ids(db, Destination, payload.destination_ids, "destination_id")
    if payload.marine_species_ids is not None:
        experience.marine_species = _resolve_by_ids(db, Species, payload.marine_species_ids, "species_id")

    if updates:
        if not was_published and experience.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "experience", experience.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "experience", experience.title)

    db.commit()
    db.refresh(experience)
    return experience


@router.delete("/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_experience(
    experience_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_experiences)
) -> None:
    experience = db.get(Experience, experience_id)
    if experience is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")

    db.delete(experience)
    db.commit()
