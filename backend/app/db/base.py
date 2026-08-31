"""
SQLAlchemy declarative base.

Every ORM model inherits from this. Kept deliberately free of any
model imports (models import Base, not the other way round) — a
trailing "import every model here" would create a circular import
depending on which module happens to load first. See
app/db/models_registry.py for the module Alembic uses to discover
models for autogenerate.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
