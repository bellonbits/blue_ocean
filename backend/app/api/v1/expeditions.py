from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.expedition import Expedition
from app.models.research_area import ResearchArea
from app.models.research_team import ResearchTeam
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.expedition import ExpeditionCreate, ExpeditionRead, ExpeditionUpdate

router = APIRouter(prefix="/expeditions", tags=["expeditions"])

_edit_expeditions = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.RESEARCHER)
_delete_expeditions = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(Expedition.area),
    joinedload(Expedition.research_team),
    joinedload(Expedition.species),
)


def _resolve_species(db: Session, species_ids: list[UUID]) -> list[Species]:
    if not species_ids:
        return []
    rows = db.query(Species).filter(Species.id.in_(species_ids)).all()
    missing = set(species_ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown species_id(s): {', '.join(str(m) for m in missing)}")
    return rows


@router.get("", response_model=list[ExpeditionRead])
def list_expeditions(
    area: str | None = Query(default=None, description="Filter by research area slug"),
    region: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Expedition]:
    query = db.query(Expedition).options(*_EAGER).filter(Expedition.published.is_(True))

    if area:
        query = query.join(ResearchArea).filter(ResearchArea.slug == area)
    if region:
        query = query.filter(Expedition.region == region)

    return query.order_by(Expedition.title).all()


@router.get("/{slug}", response_model=ExpeditionRead)
def get_expedition(slug: str, db: Session = Depends(get_db)) -> Expedition:
    expedition = (
        db.query(Expedition)
        .options(*_EAGER)
        .filter(Expedition.slug == slug, Expedition.published.is_(True))
        .first()
    )
    if expedition is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expedition not found.")
    return expedition


@router.get("/admin/all", response_model=list[ExpeditionRead])
def list_all_expeditions_admin(db: Session = Depends(get_db), _: User = Depends(_edit_expeditions)) -> list[Expedition]:
    return db.query(Expedition).options(*_EAGER).order_by(Expedition.title).all()


@router.get("/admin/{expedition_id}", response_model=ExpeditionRead)
def get_expedition_admin(
    expedition_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_expeditions)
) -> Expedition:
    expedition = db.query(Expedition).options(*_EAGER).filter(Expedition.id == expedition_id).first()
    if expedition is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expedition not found.")
    return expedition


@router.post("", response_model=ExpeditionRead, status_code=status.HTTP_201_CREATED)
def create_expedition(
    payload: ExpeditionCreate, db: Session = Depends(get_db), current_user: User = Depends(_edit_expeditions)
) -> Expedition:
    if db.query(Expedition).filter(Expedition.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An expedition with this slug already exists.")
    if payload.area_id and db.get(ResearchArea, payload.area_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="area_id does not reference an existing research area.")
    if payload.research_team_id and db.get(ResearchTeam, payload.research_team_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="research_team_id does not reference an existing team.")

    expedition = Expedition(**payload.model_dump(exclude={"species_ids"}))
    expedition.species = _resolve_species(db, payload.species_ids)

    db.add(expedition)
    log_activity(db, current_user, ActivityAction.CREATED, "expedition", expedition.title)
    if expedition.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "expedition", expedition.title)
    db.commit()
    db.refresh(expedition)
    return expedition


@router.patch("/{expedition_id}", response_model=ExpeditionRead)
def update_expedition(
    expedition_id: UUID,
    payload: ExpeditionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_expeditions),
) -> Expedition:
    expedition = db.get(Expedition, expedition_id)
    if expedition is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expedition not found.")

    updates = payload.model_dump(exclude_unset=True, exclude={"species_ids"})
    if "slug" in updates and updates["slug"] != expedition.slug:
        if db.query(Expedition).filter(Expedition.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An expedition with this slug already exists.")

    was_published = expedition.published
    for field, value in updates.items():
        setattr(expedition, field, value)

    if payload.species_ids is not None:
        expedition.species = _resolve_species(db, payload.species_ids)

    if updates:
        if not was_published and expedition.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "expedition", expedition.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "expedition", expedition.title)

    db.commit()
    db.refresh(expedition)
    return expedition


@router.delete("/{expedition_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expedition(
    expedition_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_expeditions)
) -> None:
    expedition = db.get(Expedition, expedition_id)
    if expedition is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expedition not found.")

    db.delete(expedition)
    db.commit()
