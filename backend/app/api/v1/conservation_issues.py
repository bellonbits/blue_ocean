from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.session import get_db
from app.models.conservation_issue import ConservationIssue
from app.models.user import User, UserRole
from app.schemas.conservation_issue import ConservationIssueCreate, ConservationIssueRead, ConservationIssueUpdate

router = APIRouter(prefix="/conservation-issues", tags=["conservation-issues"])

_manage_issues = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)


@router.get("", response_model=list[ConservationIssueRead])
def list_issues(db: Session = Depends(get_db)) -> list[ConservationIssue]:
    return db.query(ConservationIssue).order_by(ConservationIssue.label).all()


@router.get("/admin/all", response_model=list[ConservationIssueRead])
def list_all_issues_admin(db: Session = Depends(get_db), _: User = Depends(_manage_issues)) -> list[ConservationIssue]:
    return db.query(ConservationIssue).order_by(ConservationIssue.label).all()


@router.get("/admin/{issue_id}", response_model=ConservationIssueRead)
def get_issue_admin(
    issue_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_issues)
) -> ConservationIssue:
    issue = db.get(ConservationIssue, issue_id)
    if issue is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation issue not found.")
    return issue


@router.post("", response_model=ConservationIssueRead, status_code=status.HTTP_201_CREATED)
def create_issue(
    payload: ConservationIssueCreate, db: Session = Depends(get_db), _: User = Depends(_manage_issues)
) -> ConservationIssue:
    if db.query(ConservationIssue).filter(ConservationIssue.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An issue with this slug already exists.")

    issue = ConservationIssue(**payload.model_dump())
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue


@router.patch("/{issue_id}", response_model=ConservationIssueRead)
def update_issue(
    issue_id: UUID, payload: ConservationIssueUpdate, db: Session = Depends(get_db), _: User = Depends(_manage_issues)
) -> ConservationIssue:
    issue = db.get(ConservationIssue, issue_id)
    if issue is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation issue not found.")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(issue, field, value)

    db.commit()
    db.refresh(issue)
    return issue


@router.delete("/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_issue(issue_id: UUID, db: Session = Depends(get_db), _: User = Depends(_manage_issues)) -> None:
    issue = db.get(ConservationIssue, issue_id)
    if issue is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conservation issue not found.")

    db.delete(issue)
    db.commit()
