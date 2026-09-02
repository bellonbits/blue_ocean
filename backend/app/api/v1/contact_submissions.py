from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_optional_current_user, require_role
from app.core.rate_limit import limiter_contact_submission
from app.db.session import get_db
from app.models.contact_submission import ContactSubmission
from app.models.notification import Notification
from app.models.user import User, UserRole
from app.schemas.contact_submission import ContactSubmissionCreate, ContactSubmissionRead, ContactSubmissionUpdate

router = APIRouter(prefix="/contact-submissions", tags=["contact-submissions"])

# Submissions are an inbox, not editorial content — reading and
# triaging them is restricted to admins, not the wider content_manager
# / editor set that manages published site content elsewhere.
_manage_submissions = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


@router.post("", response_model=ContactSubmissionRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(limiter_contact_submission)])
def create_contact_submission(
    payload: ContactSubmissionCreate,
    db: Session = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
) -> ContactSubmission:
    submission = ContactSubmission(**payload.model_dump(), user_id=user.id if user else None)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("/me", response_model=list[ContactSubmissionRead])
def list_my_contact_submissions(
    db: Session = Depends(get_db), user: User = Depends(get_current_active_user)
) -> list[ContactSubmission]:
    return (
        db.query(ContactSubmission)
        .filter(ContactSubmission.user_id == user.id)
        .order_by(ContactSubmission.created_at.desc())
        .all()
    )


@router.get("", response_model=list[ContactSubmissionRead])
def list_contact_submissions(
    is_read: bool | None = Query(default=None),
    is_favorite: bool | None = Query(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_manage_submissions),
) -> list[ContactSubmission]:
    query = db.query(ContactSubmission)
    if is_read is not None:
        query = query.filter(ContactSubmission.is_read.is_(is_read))
    if is_favorite is not None:
        query = query.filter(ContactSubmission.is_favorite.is_(is_favorite))
    return query.order_by(ContactSubmission.created_at.desc()).all()


@router.get("/{submission_id}", response_model=ContactSubmissionRead)
def get_contact_submission(
    submission_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_submissions)
) -> ContactSubmission:
    submission = db.get(ContactSubmission, submission_id)
    if submission is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact submission not found.")
    return submission


@router.patch("/{submission_id}", response_model=ContactSubmissionRead)
def update_contact_submission(
    submission_id: UUID,
    payload: ContactSubmissionUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_manage_submissions),
) -> ContactSubmission:
    submission = db.get(ContactSubmission, submission_id)
    if submission is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact submission not found.")

    was_read = submission.is_read
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(submission, field, value)

    # Notify the submitter once their message goes from unread to read —
    # the one v1 notification trigger (see Notification model docstring).
    if submission.user_id and not was_read and submission.is_read:
        db.add(
            Notification(
                user_id=submission.user_id,
                title="Your message was reviewed",
                body=f'Your enquiry "{submission.subject}" has been reviewed by our team.',
                link="/dashboard/messages",
            )
        )

    db.commit()
    db.refresh(submission)
    return submission


@router.delete("/{submission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_submission(
    submission_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_submissions)
) -> None:
    submission = db.get(ContactSubmission, submission_id)
    if submission is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact submission not found.")

    db.delete(submission)
    db.commit()
