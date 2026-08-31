"""
Blue Ocean API — FastAPI application entrypoint.

- Sprint B1 (Foundation): app boots, connects to Postgres, exposes a
  health check, and has CORS wired for the Vite frontend.
- Sprints B2-B11: Auth, Roles, Coast, Species, Research, Experiences,
  Conservation, Communities, News, About/Contact, Media, and Admin Stats.
- Sprint B12: Unified Search API.
- Sprint B13: SEO Metadata, Dynamic Sitemap (/sitemap.xml), and RSS Feed (/rss.xml).
- Sprint B14: Security Hardening (Security headers, request size limiter, sliding-window rate limiting).
"""

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1 import seo
from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.security_headers import RequestSizeLimitMiddleware, SecurityHeadersMiddleware

settings = get_settings()

app = FastAPI(title=settings.app_name, debug=settings.debug)

# Security hardening middlewares (Sprint B14)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestSizeLimitMiddleware)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root-level endpoints (Sitemap, RSS feed, etc.)
app.include_router(seo.router)

# Versioned API routes (/api/v1)
app.include_router(api_router, prefix=settings.api_v1_prefix)

# Media static file serving
media_root = Path(settings.media_root)
media_root.mkdir(parents=True, exist_ok=True)
app.mount(settings.media_url_prefix, StaticFiles(directory=media_root), name="media")


@app.get("/")
def root() -> dict:
    return {"name": settings.app_name, "status": "running"}
