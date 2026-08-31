"""Pytest fixtures for Blue Ocean backend tests."""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.db.session import SessionLocal
from app.main import app
from app.models.user import User, UserRole


@pytest.fixture(scope="session")
def client() -> TestClient:
    """Synchronous test client configured for the FastAPI app."""
    return TestClient(app)


@pytest.fixture(scope="session")
def db_session() -> Session:
    """Database session for test setup / assertions."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture(scope="session")
def super_admin_token(db_session: Session) -> str:
    user = db_session.query(User).filter(User.role == UserRole.SUPER_ADMIN).first()
    if not user:
        pytest.skip("Seeded super_admin user not found.")
    return create_access_token(user_id=user.id, role=user.role)


@pytest.fixture(scope="session")
def admin_token(db_session: Session) -> str:
    user = db_session.query(User).filter(User.role == UserRole.ADMIN).first()
    if not user:
        user = db_session.query(User).filter(User.role == UserRole.SUPER_ADMIN).first()
    return create_access_token(user_id=user.id, role=user.role)


@pytest.fixture(scope="session")
def editor_token(db_session: Session) -> str:
    user = db_session.query(User).filter(User.role == UserRole.EDITOR).first()
    if not user:
        user = db_session.query(User).first()
    return create_access_token(user_id=user.id, role=user.role)


@pytest.fixture(scope="session")
def researcher_token(db_session: Session) -> str:
    user = db_session.query(User).filter(User.role == UserRole.RESEARCHER).first()
    if not user:
        user = db_session.query(User).first()
    return create_access_token(user_id=user.id, role=user.role)


@pytest.fixture(scope="session")
def content_manager_token(db_session: Session) -> str:
    user = db_session.query(User).filter(User.role == UserRole.CONTENT_MANAGER).first()
    if not user:
        user = db_session.query(User).first()
    return create_access_token(user_id=user.id, role=user.role)
