"""
SQLAlchemy engine, session factory, and the FastAPI DB dependency.

Supports an optional fallback database (Settings.fallback_database_url,
e.g. a Supabase Postgres instance) — if the primary database is
unreachable, requests transparently fail over to it. This is a
resilience mechanism, not a sync mechanism: data written while running
on the fallback exists ONLY there until someone manually reconciles it
back to the primary once it's healthy again. Both databases must carry
the same schema (`alembic upgrade head` run against each) for queries to
behave the same way on either side.

Failover is detected with an explicit `SELECT 1` per request rather than
relying solely on pool_pre_ping, because a brand-new SessionLocal()
never actually opens a connection until first use — pre-ping alone only
protects checkout of an *existing* pooled connection, so a fully
unreachable primary host wouldn't be caught until something already used
the session. The tradeoff is one small extra round-trip per request;
that's the accepted cost of detecting an outage automatically instead of
only on a periodic health check.
"""

import logging
from collections.abc import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

_fallback_engine = None
_FallbackSessionLocal = None
if settings.fallback_database_url:
    _fallback_engine = create_engine(settings.fallback_database_url, pool_pre_ping=True)
    _FallbackSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=_fallback_engine)

# Tracks whether the *last* request ran against the fallback, purely so
# failover/failback transitions get logged once instead of on every
# single request while the outage persists.
using_fallback = False


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: yields a DB session, always closes it.

    Tries the primary database first. If it's unreachable and a fallback
    is configured, switches to the fallback for this request. If no
    fallback is configured, the original error propagates as before —
    this dependency behaves exactly like the pre-failover version until
    FALLBACK_DATABASE_URL is actually set.
    """
    global using_fallback

    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
    except OperationalError:
        db.close()
        if _FallbackSessionLocal is None:
            raise

        if not using_fallback:
            logger.error(
                "Primary database unreachable — failing over to the fallback "
                "database. Writes made while on the fallback will NOT exist "
                "in the primary once it recovers; reconcile manually."
            )
            using_fallback = True
        db = _FallbackSessionLocal()
    else:
        if using_fallback:
            logger.info("Primary database reachable again — switching back.")
            using_fallback = False

    try:
        yield db
    finally:
        db.close()
