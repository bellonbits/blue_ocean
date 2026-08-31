import uuid
from pathlib import Path
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.config import get_settings
from app.core.rate_limit import limiter_media_upload
from app.db.session import get_db
from app.models.media import Media
from app.models.user import User, UserRole
from app.schemas.media import MediaRead, MediaUpdate

router = APIRouter(prefix="/media", tags=["media"])

# Media library management (upload/browse/edit alt text) follows the
# same editor/content_manager+ pattern as every other content-write
# path since B7 — whoever can attach an image to a project or article
# should be able to upload one. Deletion is more destructive (removes
# the file from disk too), so it's admin-only like every other delete.
_manage_media = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_media = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_ALLOWED_MIME_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}


@router.get("", response_model=list[MediaRead])
def list_media(db: Session = Depends(get_db), _: User = Depends(_manage_media)) -> list[Media]:
    return db.query(Media).options(joinedload(Media.uploaded_by)).order_by(Media.created_at.desc()).all()


@router.get("/{media_id}", response_model=MediaRead)
def get_media(media_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_media)) -> Media:
    media = db.query(Media).options(joinedload(Media.uploaded_by)).filter(Media.id == media_id).first()
    if media is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found.")
    return media


@router.post("", response_model=MediaRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(limiter_media_upload)])
async def upload_media(
    file: UploadFile = File(...),
    alt_text: str | None = Form(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(_manage_media),
) -> Media:
    extension = _ALLOWED_MIME_TYPES.get(file.content_type)
    if extension is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type {file.content_type!r}. Allowed: {', '.join(sorted(_ALLOWED_MIME_TYPES))}.",
        )

    settings = get_settings()
    contents = await file.read()
    if len(contents) > settings.media_max_upload_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds the {settings.media_max_upload_bytes // (1024 * 1024)} MB upload limit.",
        )
    if len(contents) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

    media_root = Path(settings.media_root)
    media_root.mkdir(parents=True, exist_ok=True)

    stored_name = f"{uuid.uuid4().hex}{extension}"
    (media_root / stored_name).write_bytes(contents)

    media = Media(
        filename=file.filename or stored_name,
        stored_name=stored_name,
        url=f"{settings.media_url_prefix}/{stored_name}",
        mime_type=file.content_type,
        size_bytes=len(contents),
        alt_text=alt_text,
        uploaded_by_id=current_user.id,
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


@router.patch("/{media_id}", response_model=MediaRead)
def update_media(
    media_id: UUID, payload: MediaUpdate, db: Session = Depends(get_db), _: User = Depends(_manage_media)
) -> Media:
    media = db.get(Media, media_id)
    if media is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found.")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(media, field, value)

    db.commit()
    db.refresh(media)
    return media


@router.delete("/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_media(media_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_media)) -> None:
    media = db.get(Media, media_id)
    if media is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found.")

    settings = get_settings()
    file_path = Path(settings.media_root) / media.stored_name
    file_path.unlink(missing_ok=True)

    db.delete(media)
    db.commit()
