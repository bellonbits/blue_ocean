"""
Application configuration, loaded from environment variables / .env.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # --- App ---
    app_name: str = "Blue Ocean API"
    api_v1_prefix: str = "/api/v1"
    environment: str = "development"  # development | staging | production
    debug: bool = True

    # --- Database ---
    # postgresql+psycopg://user:password@host:port/dbname
    database_url: str = "postgresql+psycopg://blue_ocean:blue_ocean_dev_local@localhost:5432/blue_ocean"

    # --- CORS ---
    # Comma-separated list of allowed frontend origins.
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    # --- Auth (Sprint B2) ---
    # JWT signing secret. MUST be overridden via .env in every real
    # environment — this default only exists so the app doesn't crash
    # if .env is momentarily missing a value.
    secret_key: str = "insecure-dev-default-override-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # --- Media (Sprint B10) ---
    # Local disk storage for now — no S3/cloud storage wired up. Path is
    # relative to the backend/ working directory unless given as absolute.
    media_root: str = "media_storage"
    media_url_prefix: str = "/media"
    media_max_upload_bytes: int = 10 * 1024 * 1024  # 10 MB — images
    media_max_video_upload_bytes: int = 200 * 1024 * 1024  # 200 MB — video

    # --- Google Places (New) ---
    # Server-side only — never exposed to the frontend. Used to fetch real
    # photos of destinations (beaches, ports, dive sites, ...). Empty by
    # default so the feature no-ops (falls back to local images) until a
    # real key is configured.
    google_places_api_key: str = ""
    # How long a resolved place_id / fetched photo list stays cached
    # before Blue Ocean re-queries Google — keeps costs down without
    # storing Google's photo tokens indefinitely.
    google_places_cache_hours: int = 24


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance — env is read once per process."""
    return Settings()
