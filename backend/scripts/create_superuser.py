"""
Bootstrap the first SUPER_ADMIN account.

There's no public registration endpoint on purpose — this is an admin
CMS, not a public sign-up flow. Run this once to create the first
account; every account after that gets created via POST /api/v1/users
by an existing ADMIN/SUPER_ADMIN.

Usage:
    uv run python scripts/create_superuser.py <email> <password> ["Full Name"]
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

import app.db.models_registry  # noqa: E402,F401  (registers every model so relationship() string refs resolve)
from app.core.security import hash_password  # noqa: E402
from app.db.session import SessionLocal  # noqa: E402
from app.models.user import User, UserRole  # noqa: E402


def main() -> None:
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    email, password = sys.argv[1], sys.argv[2]
    full_name = sys.argv[3] if len(sys.argv) > 3 else None

    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == email).first() is not None:
            print(f"A user with email {email!r} already exists.")
            sys.exit(1)

        user = User(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
            role=UserRole.SUPER_ADMIN,
        )
        db.add(user)
        db.commit()
        print(f"Created SUPER_ADMIN {email}.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
