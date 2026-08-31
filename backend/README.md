# Blue Ocean API (backend)

FastAPI + PostgreSQL backend for Blue Ocean Somalia.

- **Sprint B1 (Foundation)** — app boots, connects to Postgres, health check, CORS.
- **Sprint B2 (Authentication + Roles)** — JWT login, 5 admin roles, and
  role enforcement on protected routes.
- **Sprint B3 (Coast + Destinations)** — `Region` and `Destination` models,
  public read endpoints, role-gated write endpoints, seeded with the
  real content from `src/data/regions.js` / `destinations.js`.
- **Sprint B4 (Marine Life)** — `SpeciesCategory` and `Species` models,
  a real many-to-many link to `Destination`, seeded from
  `src/data/marineLife.js`.
- **Sprint B5 (Research)** — `ResearchArea`, `Methodology`, `ResearchTeam`,
  `ResearchProject`, and `Expedition` models, with real many-to-many
  links across `Methodology`/`Species`/`Destination`, seeded from
  `src/data/research.js`. First sprint using the `researcher` role.
- **Sprint B6 (Ocean Experiences)** — `ExperienceCategory` and
  `Experience` models, with real many-to-many links to `Destination` and
  `Species`, seeded from `src/data/experiences.js`.
- **Sprint B7 (Conservation + Communities)** — `ConservationFocusArea`,
  `ConservationIssue`, `ConservationProject`, `Community`, and
  `CommunityStory` models — the most cross-linked content type yet, with
  real many-to-many links spanning `Species`, `Destination`,
  `ResearchProject`, and `Community`, seeded from `src/data/conservation.js`
  and `src/data/communities.js`. First sprint using the `content_manager`
  role.
- **Sprint B8 (News)** — `NewsCategory` and `NewsArticle` models —
  the most cross-linked content type yet, with real many-to-many links
  spanning `Destination`, `Species`, `ResearchProject`,
  `ConservationProject`, `Experience`, and `Community`, seeded from
  `src/data/news.js`.
- **Sprint B9 (About + Contact)** — `OrganizationSettings`, a singleton
  settings resource for the About/Contact pages' mission, vision, story,
  and contact info (seeded from `src/data/organization.js`), and
  `ContactSubmission`, the first sprint to add a real write path for
  public site visitors rather than just admin-gated content management.
- **Sprint B10 (Media)** — `Media` model and a real file-upload API
  (`POST /api/v1/media`, multipart) backed by local disk storage, served
  back out through a `StaticFiles` mount. First sprint where the backend
  stores binary files, not just rows referencing frontend-static image
  paths.
- **Sprint B11 (Admin APIs)** — closes real gaps left open since B2:
  `PATCH`/`DELETE /api/v1/users/{id}` (with self-lockout guards),
  `POST /api/v1/auth/change-password` (self-service), and
  `GET /api/v1/admin/stats` (a live content/user/inbox count dashboard
  endpoint). Also fixed `Media.uploaded_by_id`'s FK to `ON DELETE SET
  NULL` — deleting a user who'd uploaded media was previously blocked
  by the database.

- **Sprint B12 (Search)** — unified full-text and substring search across all 7
  published content models (`Destination`, `Species`, `ResearchProject`,
  `Experience`, `ConservationProject`, `CommunityStory`, and `NewsArticle`) via
  `GET /api/v1/search?q=...&type=...&limit=...&offset=...`, with relevance
  ranking and content type breakdown.
- **Sprint B13 (SEO, Sitemap & RSS)** — dynamic sitemap (`/sitemap.xml`) indexing
  all static pages and published content, RSS 2.0 feed (`/rss.xml`), and
  OpenGraph, Twitter card, and Schema.org JSON-LD resolver (`/api/v1/seo/meta`).
- **Sprint B14 (Security Hardening)** — security headers middleware
  (`X-Content-Type-Options`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`),
  payload size guard, and sliding-window rate limiters on login, contact inbox,
  and media uploads.
- **Sprint B15 (Testing & Docker Setup)** — automated pytest suite covering 24
  tests across all modules, multi-stage production Dockerfile with non-root user,
  health check, and `docker-compose.yml` configuration.

This is a separate service from `server/`, which is a small dedicated
Express proxy for the chat feature only (talks to Groq) and stays as-is.

## Stack

- **FastAPI** — web framework
- **SQLAlchemy 2.x** — ORM
- **Alembic** — migrations
- **PostgreSQL** (via `psycopg` v3) — database
- **PyJWT + bcrypt** — auth (JWT access tokens, bcrypt password hashing)
- **uv** — dependency management (`pyproject.toml` / `uv.lock`)

## Project layout

```text
backend/
├── app/
│   ├── main.py              # FastAPI app instance, CORS, router mount
│   ├── core/
│   │   ├── config.py        # Settings (pydantic-settings, reads .env)
│   │   └── security.py      # password hashing, JWT create/decode
│   ├── db/
│   │   ├── base.py          # SQLAlchemy declarative Base (no model imports — see below)
│   │   ├── models_registry.py  # imports every model, for Alembic's autogenerate only
│   │   └── session.py       # engine, SessionLocal, get_db() dependency
│   ├── models/
│   │   ├── user.py             # User model + UserRole enum
│   │   ├── region.py           # Region model
│   │   ├── destination.py      # Destination model (FK -> Region)
│   │   ├── species_category.py # SpeciesCategory model
│   │   ├── species.py          # Species model + ConservationStatus enum + species_destinations link table
│   │   ├── research_area.py    # ResearchArea model
│   │   ├── methodology.py      # Methodology model (controlled vocabulary)
│   │   ├── research_team.py    # ResearchTeam model + team_focus_areas link table
│   │   ├── research_project.py # ResearchProject model + ProjectStatus enum + 3 link tables
│   │   ├── expedition.py       # Expedition model + expedition_species link table
│   │   ├── experience_category.py # ExperienceCategory model
│   │   ├── experience.py       # Experience model + ExperienceStatus enum + experience_destinations/experience_species link tables
│   │   ├── community.py        # Community model
│   │   ├── conservation_focus_area.py # ConservationFocusArea model
│   │   ├── conservation_issue.py # ConservationIssue model (controlled vocabulary)
│   │   ├── conservation_project.py # ConservationProject model + ConservationStatus enum + 5 link tables
│   │   ├── community_story.py  # CommunityStory model + community_story_species link table
│   │   ├── news_category.py    # NewsCategory model
│   │   ├── news_article.py     # NewsArticle model + 6 link tables
│   │   ├── organization_settings.py # OrganizationSettings model (singleton)
│   │   ├── contact_submission.py # ContactSubmission model
│   │   └── media.py             # Media model (uploaded file metadata)
│   ├── schemas/
│   │   ├── user.py              # UserCreate, UserRead
│   │   ├── token.py             # Token
│   │   ├── region.py            # RegionCreate/Update/Read
│   │   ├── destination.py       # DestinationCreate/Update/Read
│   │   ├── species_category.py  # SpeciesCategoryCreate/Update/Read
│   │   ├── species.py           # SpeciesCreate/Update/Read, GalleryImage
│   │   ├── research_area.py     # ResearchAreaCreate/Update/Read
│   │   ├── methodology.py       # MethodologyCreate/Update/Read
│   │   ├── research_team.py     # ResearchTeamCreate/Update/Read
│   │   ├── research_project.py  # ResearchProjectCreate/Update/Read, GalleryImage, Finding
│   │   ├── expedition.py        # ExpeditionCreate/Update/Read
│   │   ├── experience_category.py # ExperienceCategoryCreate/Update/Read
│   │   ├── experience.py        # ExperienceCreate/Update/Read, ExperienceStory, GalleryImage
│   │   ├── community.py         # CommunityCreate/Update/Read
│   │   ├── conservation_focus_area.py # ConservationFocusAreaCreate/Update/Read
│   │   ├── conservation_issue.py # ConservationIssueCreate/Update/Read
│   │   ├── conservation_project.py # ConservationProjectCreate/Update/Read, GalleryImage
│   │   ├── community_story.py   # CommunityStoryCreate/Update/Read
│   │   ├── news_category.py     # NewsCategoryCreate/Update/Read
│   │   ├── news_article.py      # NewsArticleCreate/Update/Read, ContentBlock, GalleryImage
│   │   ├── organization_settings.py # OrganizationSettingsRead/Update (no Create — singleton)
│   │   ├── contact_submission.py # ContactSubmissionCreate/Update/Read
│   │   └── media.py             # MediaUpdate/Read (no Create schema — multipart upload, not JSON)
│   └── api/
│       ├── deps.py          # get_current_user, require_role() — the actual security boundary
│       └── v1/
│           ├── router.py              # aggregates all v1 routes (imports models_registry first — see below)
│           ├── health.py              # GET /api/v1/health
│           ├── auth.py                # POST /api/v1/auth/login, GET /api/v1/auth/me
│           ├── users.py               # POST/GET /api/v1/users (admin-only)
│           ├── regions.py             # /api/v1/regions (public read, admin write)
│           ├── destinations.py        # /api/v1/destinations (public read, editor+ write)
│           ├── species_categories.py  # /api/v1/species-categories (public read, admin write)
│           ├── species.py             # /api/v1/species (public read, editor+ write)
│           ├── research_areas.py      # /api/v1/research-areas (public read, admin write)
│           ├── methodologies.py       # /api/v1/methodologies (public read, admin write)
│           ├── research_teams.py      # /api/v1/research-teams (public read, admin write)
│           ├── research_projects.py   # /api/v1/research-projects (public read, editor/researcher+ write)
│           ├── expeditions.py         # /api/v1/expeditions (public read, editor/researcher+ write)
│           ├── experience_categories.py # /api/v1/experience-categories (public read, admin write)
│           ├── experiences.py         # /api/v1/experiences (public read, editor+ write)
│           ├── conservation_focus_areas.py # /api/v1/conservation-focus-areas (public read, admin write)
│           ├── conservation_issues.py # /api/v1/conservation-issues (public read, admin write)
│           ├── conservation_projects.py # /api/v1/conservation-projects (public read, editor/content_manager+ write)
│           ├── communities.py         # /api/v1/communities (public read, editor/content_manager+ write)
│           ├── community_stories.py   # /api/v1/community-stories (public read, editor/content_manager+ write)
│           ├── news_categories.py     # /api/v1/news-categories (public read, admin write)
│           ├── news_articles.py       # /api/v1/news-articles (public read, editor/content_manager+ write)
│           ├── organization.py        # /api/v1/organization (public read, editor/content_manager+ write, no create/delete)
│           ├── contact_submissions.py # /api/v1/contact-submissions (public create, admin-only read/list/update/delete)
│           └── media.py               # /api/v1/media (editor/content_manager+ upload/browse/edit, admin-only delete)
├── media_storage/            # uploaded files (Sprint B10, gitignored) — created on first run
├── scripts/
│   ├── create_superuser.py  # bootstrap the first account (no public registration)
│   ├── seed_coast.py        # load regions/destinations from seed_data/*.json
│   ├── seed_marine_life.py  # load species categories/species from seed_data/*.json
│   ├── seed_research.py     # load areas/methodologies/teams/projects/expeditions from seed_data/*.json
│   ├── seed_experiences.py  # load experience categories/experiences from seed_data/*.json
│   ├── seed_conservation_communities.py # load focus areas/issues/projects/communities/stories from seed_data/*.json
│   ├── seed_news.py         # load news categories/articles from seed_data/*.json
│   └── seed_organization.py # load/update the singleton organization settings row from seed_data/*.json
├── seed_data/
│   ├── regions.json             # exported from src/data/regions.js
│   ├── destinations.json        # exported from src/data/destinations.js
│   ├── species_categories.json  # exported from src/data/marineLife.js (marineCategories)
│   ├── species.json             # exported from src/data/marineLife.js (speciesList)
│   ├── research_areas.json      # exported from src/data/research.js (researchAreas)
│   ├── methodologies.json       # exported from src/data/research.js (RESEARCH_METHODOLOGIES)
│   ├── research_teams.json      # exported from src/data/research.js (researchTeams)
│   ├── research_projects.json   # exported from src/data/research.js (researchProjects)
│   ├── expeditions.json         # exported from src/data/research.js (expeditions)
│   ├── experience_categories.json # exported from src/data/experiences.js (experienceCategories)
│   ├── experiences.json         # exported from src/data/experiences.js (experiences, raw/unresolved)
│   ├── conservation_focus_areas.json # exported from src/data/conservation.js (conservationFocusAreas)
│   ├── conservation_issues.json # exported from src/data/conservation.js (CONSERVATION_ISSUES)
│   ├── conservation_projects.json # exported from src/data/conservation.js (conservationProjects, raw/unresolved)
│   ├── communities.json         # exported from src/data/communities.js (communities)
│   ├── community_stories.json   # exported from src/data/communities.js (communityStories, raw/unresolved)
│   ├── news_categories.json     # exported from src/data/news.js (NEWS_CATEGORIES)
│   ├── news_articles.json       # exported from src/data/news.js (articles, raw/unresolved)
│   └── organization.json        # exported from src/data/organization.js (organization, contactDetails, contactSubjects, socialLinks)
├── alembic/                  # migrations (env.py reads DATABASE_URL from Settings)
├── pyproject.toml
└── .env.example
```

**Why `app/db/base.py` has no model imports:** models import `Base`
from there; if `base.py` also imported the models back (a common
"register models on Base" pattern), the import order becomes fragile —
whichever module happens to import first can hit a circular-import
error depending on how far the other module has gotten. `models_registry.py`
exists so Alembic can still discover every model for autogenerate,
without `base.py` needing to know about them. Add one line there per
new model.

**Every standalone script that queries the ORM** should `import
app.db.models_registry` near the top, even if it doesn't use every
model directly — SQLAlchemy resolves `relationship()` string references
(e.g. `Destination.region: Mapped["Region"]`) against every model class
that's been imported into the process, not just the ones a given script
happens to import. Skipping this raises `InvalidRequestError: ... failed
to locate a name` the first time the ORM actually needs to configure
that mapper.

**This turned out to affect the running app too, not just scripts.**
`app/api/v1/router.py` imports every route module — which should be
enough for every model to get registered before any of them is used —
but a couple of route modules (`expeditions.py`, `research_projects.py`)
build `joinedload(...)` option tuples at *import time* (module-level
code, not inside a function). That forces SQLAlchemy to configure that
model's mappers immediately, mid-way through Python importing the other
route modules — before some of them had run. Whichever route module
happened to come first alphabetically decided whether it crashed. Fixed
the same way as the scripts: `router.py` now does `import
app.db.models_registry` as the *first* line, before importing any route
module, so every model is registered no matter what any individual
route module does at import time. If a future route module adds another
module-level `joinedload(...)` (or similar mapper-touching call), it's
already covered.

Later sprints add one router module per content area (`conservation.py`,
`communities.py`, `news.py`, ...), each registered in `app/api/v1/router.py`,
following the `research_projects.py` pattern for a content type with
several relationships, and the `species_destinations` /
`project_species` pattern for real many-to-many links once both sides
of a relationship exist as tables.

## Local setup

Requires PostgreSQL running locally and `uv` installed
(`brew install uv` or see [astral.sh/uv](https://astral.sh/uv)).

```bash
cd backend

# 1. Create a dedicated Postgres role + database (one-time)
psql -U postgres -c "CREATE ROLE blue_ocean WITH LOGIN PASSWORD 'blue_ocean_dev_local';"
psql -U postgres -c "CREATE DATABASE blue_ocean OWNER blue_ocean;"

# 2. Install dependencies
uv sync

# 3. Configure environment
cp .env.example .env
# edit .env: set real Postgres credentials, and generate a real SECRET_KEY:
#   python3 -c "import secrets; print(secrets.token_urlsafe(48))"

# 4. Run migrations
uv run alembic upgrade head

# 5. Bootstrap the first admin account (there's no public sign-up)
uv run python scripts/create_superuser.py you@example.com "a-strong-password" "Your Name"

# 6. Start the dev server
uv run uvicorn app.main:app --reload --port 8000
```

Verify it's up:

```bash
curl http://localhost:8000/api/v1/health
# {"status":"ok","database":"connected"}
```

Interactive API docs: http://localhost:8000/docs

## Authentication & roles

Five roles, defined in `app/models/user.py`: `super_admin`, `admin`,
`editor`, `researcher`, `content_manager`. `content_manager` first does
something as of Sprint B7 (conservation + communities content) — same
pattern as `researcher` in B5: added alongside `editor` on the routes for
its content area, not in place of it, so `editor` stays the universal
content role and each specialized role only widens access, never narrows
what `editor` can already do. There's deliberately no
public registration endpoint — this is an internal admin CMS, not a
public sign-up flow:

- The **first** account is created via `scripts/create_superuser.py`
  (direct DB write, run once).
- Every account after that is created via `POST /api/v1/users`, which
  only `admin` / `super_admin` accounts can call.

```bash
# Login (OAuth2 password flow — "username" field is the email)
curl -X POST http://localhost:8000/api/v1/auth/login \
  -d "username=you@example.com&password=your-password"
# -> {"access_token": "...", "token_type": "bearer"}

# Use the token
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer <token>"
```

**Enforcing roles on a new route:** use the `require_role()` dependency
from `app/api/deps.py` — this is the actual security boundary, not
anything in the frontend:

```python
from app.api.deps import require_role
from app.models.user import UserRole

@router.post("/some-protected-thing")
def do_something(_: User = Depends(require_role(UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN))):
    ...
```

Access tokens are short-lived JWTs (`ACCESS_TOKEN_EXPIRE_MINUTES`, default
60) with no refresh-token flow yet — logging in again is the only way to
get a new one for now. Revisit if session length becomes a real problem.

## Coast content (regions & destinations)

Public, no auth required:

```bash
GET /api/v1/regions
GET /api/v1/regions/{slug}
GET /api/v1/destinations                # ?region=<slug>, ?featured=true|false
GET /api/v1/destinations/{slug}
```

Only `published: true` destinations are returned by the public list/detail
endpoints. `Region.destinations_count` is computed at request time from
the actual rows — never stored, so it can't drift.

Write access:

| Action | Roles |
|---|---|
| Create/update a destination | `editor`, `admin`, `super_admin` |
| Delete a destination | `admin`, `super_admin` |
| Create/update/delete a region | `admin`, `super_admin` |

Deleting a region with destinations still assigned to it returns `409`
rather than cascading — reassign or delete those destinations first.

**Seeding real content:** `scripts/seed_coast.py` loads
`seed_data/regions.json` and `seed_data/destinations.json` — direct
exports of `src/data/regions.js` / `destinations.js` — and upserts them
by slug, so it's safe to re-run after re-exporting newer frontend content:

```bash
uv run python scripts/seed_coast.py
```

Research and experience cross-links now exist — see below — via the
reverse side of `ResearchProject.destinations` and
`Experience.destinations`. A direct `Destination -> Experience` listing
endpoint isn't modeled as its own route yet; query `/api/v1/experiences`
instead.

## Marine life content (species categories & species)

Public, no auth required:

```bash
GET /api/v1/species-categories
GET /api/v1/species-categories/{slug}
GET /api/v1/species                # ?category=<slug>, ?featured=true|false
GET /api/v1/species/{slug}
```

`SpeciesCategoryRead.count` / `count_label` are stored editorial figures
("420+ Documented Species") — a broader, separately-maintained claim
about species believed present in Somali waters, not how many detailed
profiles exist. `species_count` alongside them *is* computed live from
actual `Species` rows, same principle as `Region.destinations_count`.

`Species.destinations` is a real many-to-many relationship to
`Destination` (via the `species_destinations` join table) — set it on
create/update with `destination_ids: [<uuid>, ...]`; sending the field
replaces the full set, it doesn't append.

Write access mirrors the coast content pattern:

| Action | Roles |
|---|---|
| Create/update a species | `editor`, `admin`, `super_admin` |
| Delete a species | `admin`, `super_admin` |
| Create/update/delete a category | `admin`, `super_admin` |

Deleting a category with species still assigned returns `409`, same as
regions with destinations.

**Seeding real content:** destinations must be seeded first (species
link to them), then:

```bash
uv run python scripts/seed_coast.py
uv run python scripts/seed_marine_life.py
```

`seed_marine_life.py` loads `seed_data/species_categories.json` and
`seed_data/species.json` — direct exports of `src/data/marineLife.js`'s
`marineCategories` and `speciesList` — resolves each species' real
destination links by slug, and upserts by slug (safe to re-run).
Research and experience project cross-links present in the source JSON
now partly exist (via `ResearchProject.species` and
`Experience.marine_species`) — `Species` itself still has no reverse
relationship back to either, so a species' full list of related
projects/experiences isn't queryable from its own endpoint yet.

## Research content (areas, methodologies, teams, projects, expeditions)

Public, no auth required:

```bash
GET /api/v1/research-areas
GET /api/v1/research-areas/{slug}
GET /api/v1/methodologies
GET /api/v1/research-teams
GET /api/v1/research-teams/{slug}
GET /api/v1/research-projects        # ?area=<slug>, ?status=Planned|Active|Completed|Published, ?region=<name>, ?featured=true|false
GET /api/v1/research-projects/{slug}
GET /api/v1/expeditions              # ?area=<slug>, ?region=<name>
GET /api/v1/expeditions/{slug}
```

`ResearchArea.project_count` and `ResearchTeam.project_count` are
computed live, same principle as `Region.destinations_count` /
`SpeciesCategory.species_count`.

`ResearchProject` is the richest content type so far — real many-to-many
links to `Methodology`, `Species`, and `Destination` (`methodology_ids`
/ `species_ids` / `destination_ids` on create/update, full-set-replace
semantics like `Species.destination_ids` in B4). `findings` and
`gallery` stay JSONB (structured, but scoped to one project with no
independent querying need — same call as `Species.gallery`).
`conservation_themes` stays free-text (`ARRAY(String)`) since
Conservation isn't a table yet (Sprint B7) — that's the one cross-link
from the frontend's research data still unmodeled.

`Expedition` links to `ResearchArea`, `ResearchTeam` (both optional —
`area_id`/`research_team_id` may be null), and `Species` (`species_ids`).
`status` is a plain string, not an enum — the frontend never treats it
as a fixed vocabulary (only `'coming-soon'` appears in the source data
today), so it stays open for future values without a migration.

Write access — this is the first content area where the `researcher`
role does anything, matching the architecture doc's example
("Researcher → Can edit Research"):

| Action | Roles |
|---|---|
| Create/update a research project | `editor`, `researcher`, `admin`, `super_admin` |
| Delete a research project | `admin`, `super_admin` |
| Create/update an expedition | `editor`, `researcher`, `admin`, `super_admin` |
| Delete an expedition | `admin`, `super_admin` |
| Create/update/delete an area, methodology, or team | `admin`, `super_admin` |

A `researcher` account can edit research projects and expeditions but
gets `403` on everything else (destinations, species, users, ...) —
verified directly against the running server, not just asserted.

**Seeding real content:** destinations and species must already be
seeded (projects/expeditions link to both), then:

```bash
uv run python scripts/seed_coast.py
uv run python scripts/seed_marine_life.py
uv run python scripts/seed_research.py
```

`seed_research.py` loads all five `seed_data/*.json` files — direct
exports of `src/data/research.js` — resolves every cross-link by slug,
and upserts by slug (safe to re-run).

## Ocean experiences content (categories & experiences)

Public, no auth required:

```bash
GET /api/v1/experience-categories
GET /api/v1/experience-categories/{slug}
GET /api/v1/experiences        # ?category=<slug>, ?region=<name>, ?status=coming-soon|available|seasonal|unavailable, ?featured=true|false
GET /api/v1/experiences/{slug}
```

`ExperienceCategory.experiences_count` is computed live, same principle
as `Region.destinations_count` / `SpeciesCategory.species_count` /
`ResearchArea.project_count`.

`Experience.status` is a real closed enum (`ExperienceStatus`) — unlike
`Expedition.status`, the frontend defines a fixed `EXPERIENCE_STATUSES`
vocabulary of exactly four values (`coming-soon`, `available`,
`seasonal`, `unavailable`), each with its own label/description, so this
follows the `ProjectStatus` precedent instead. `story` (`whatItIs` /
`whereItHappens` / `whatToExpect`) is JSONB — a small fixed-shape object
always read/written as a unit, never queried by sub-field.

`Experience.destinations` and `Experience.marine_species` are real
many-to-many relationships (`destination_ids` / `marine_species_ids` on
create/update, full-set-replace semantics like every other cross-link
so far). The frontend also derives a `researchProjects` list per
experience at render time, via each linked species' own research-project
links — that reverse cross-link isn't modeled here, since `Species`
doesn't expose a reverse link to `ResearchProject` on the backend yet
either (nothing in B4 or B5 built it). Left for a future sprint if the
frontend conversion needs it.

Write access:

| Action | Roles |
|---|---|
| Create/update an experience | `editor`, `admin`, `super_admin` |
| Delete an experience | `admin`, `super_admin` |
| Create/update/delete a category | `admin`, `super_admin` |

Deleting a category with experiences still assigned returns `409`, same
as regions with destinations and species categories with species.

**Seeding real content:** destinations and species must already be
seeded (experiences link to both), then:

```bash
uv run python scripts/seed_coast.py
uv run python scripts/seed_marine_life.py
uv run python scripts/seed_experiences.py
```

`seed_experiences.py` loads `seed_data/experience_categories.json` and
`seed_data/experiences.json` — direct exports of `src/data/experiences.js`
(`experienceCategories` and the raw, unresolved `experiences` array) —
resolves every cross-link by slug, and upserts by slug (safe to re-run).

## Conservation & communities content

Public, no auth required:

```bash
GET /api/v1/conservation-focus-areas
GET /api/v1/conservation-focus-areas/{slug}
GET /api/v1/conservation-issues
GET /api/v1/conservation-projects   # ?focus_area=<slug>, ?status=Planned|Active|Completed|Coming Soon, ?region=<name>, ?featured=true|false
GET /api/v1/conservation-projects/{slug}
GET /api/v1/communities             # ?category=<id>, ?region=<name>
GET /api/v1/communities/{slug}
GET /api/v1/community-stories       # ?community=<slug>, ?category=<id>, ?featured=true|false
GET /api/v1/community-stories/{slug}
```

`ConservationFocusArea.project_count` is computed live, same principle
as every other `*_count` field so far.

`ConservationProject` is the most cross-linked content type yet — real
many-to-many links to `ConservationIssue`, `Species`, `Destination`,
`ResearchProject` (B5), and `Community` (this sprint), each set with the
usual full-set-replace `*_ids` fields on create/update
(`issue_ids` / `species_ids` / `destination_ids` / `research_project_ids`
/ `community_ids`). `status` is a real closed enum (`ConservationStatus`)
— the frontend's `CONSERVATION_STATUSES` is a fixed 4-value list, same
call as `ProjectStatus` (B5) and `ExperienceStatus` (B6).
`CONSERVATION_APPROACH_STEPS` (the "Research → Understand → Engage →
Protect → Measure" steps) isn't modeled anywhere — it's static "Our
Approach" page copy, never referenced by slug from any entity, unlike
`CONSERVATION_ISSUES`.

`Community.category` and `CommunityStory.category` stay plain strings
(same treatment as `Expedition.status`), not their own table — the
frontend's `COMMUNITY_CATEGORIES` vocabulary is never expanded into a
nested object in resolved output (unlike `ExperienceCategory` or
`ConservationIssue`), so a join table would add a relationship nothing
actually queries through.

`CommunityStory.community_id` is required (every story belongs to one
community); `conservation_project_id` is optional in the schema even
though every story in the current content has one, since nothing
structurally requires it. `CommunityStory.species` is a real
many-to-many link, same `species_ids` full-set-replace pattern.

Write access — this is the first content area where the
`content_manager` role does anything:

| Action | Roles |
|---|---|
| Create/update a conservation project | `editor`, `content_manager`, `admin`, `super_admin` |
| Delete a conservation project | `admin`, `super_admin` |
| Create/update a community or community story | `editor`, `content_manager`, `admin`, `super_admin` |
| Delete a community or community story | `admin`, `super_admin` |
| Create/update/delete a focus area or issue | `admin`, `super_admin` |

A `content_manager` account can edit conservation projects, communities,
and community stories but gets `403` on everything else (destinations,
species, research, users, focus areas/issues themselves, ...) — verified
directly against the running server, same bar as every prior sprint.

**Seeding real content:** destinations, species, and research projects
must already be seeded (conservation projects link to all three), then:

```bash
uv run python scripts/seed_coast.py
uv run python scripts/seed_marine_life.py
uv run python scripts/seed_research.py
uv run python scripts/seed_conservation_communities.py
```

`seed_conservation_communities.py` loads all five `seed_data/*.json`
files — direct exports of `src/data/conservation.js` and
`src/data/communities.js` — seeds communities first (conservation
projects link to them), resolves every cross-link by slug, and upserts
by slug (safe to re-run).

## News content (categories & articles)

Public, no auth required:

```bash
GET /api/v1/news-categories
GET /api/v1/news-categories/{slug}
GET /api/v1/news-articles          # ?category=<slug>, ?featured=true|false
GET /api/v1/news-articles/{slug}
```

`NewsArticle` is the most cross-linked content type yet — real
many-to-many links to `Destination`, `Species`, `ResearchProject` (B5),
`ConservationProject` (B7), `Experience` (B6), and `Community` (B7),
each set with the usual full-set-replace `*_ids` fields on create/update.
`NewsCategory.article_count` is computed live, same principle as every
other `*_count` field so far.

`NewsCategory` gets its own table (unlike `Community.category`) because
the frontend's `NEWS_CATEGORIES` vocabulary *is* expanded into resolved
output (`categoryLabel`/`categoryBadgeClass` on every article) — same
call as `ExperienceCategory` (B6) and `ConservationIssue` (B7).

`content` is a JSONB list of rich-text blocks (`paragraph` / `pullquote`
/ `heading`, each `{type, text}` plus optional `attribution` for
pullquotes) — structured and rendered as a unit, same treatment as
`ResearchProject.findings`. `date` (an ISO-ish string) and `display_date`
(its pre-formatted display string, e.g. `"August 22, 2026"`) are both
stored as given — nothing in this codebase formats dates yet — and the
public list endpoint sorts by `date` descending.

Write access — same shape as conservation/communities (B7):

| Action | Roles |
|---|---|
| Create/update a news article | `editor`, `content_manager`, `admin`, `super_admin` |
| Delete a news article | `admin`, `super_admin` |
| Create/update/delete a news category | `admin`, `super_admin` |

**Seeding real content:** destinations, species, research projects,
conservation projects, experiences, and communities should already be
seeded (articles link to all of them), then:

```bash
uv run python scripts/seed_coast.py
uv run python scripts/seed_marine_life.py
uv run python scripts/seed_research.py
uv run python scripts/seed_experiences.py
uv run python scripts/seed_conservation_communities.py
uv run python scripts/seed_news.py
```

`seed_news.py` loads `seed_data/news_categories.json` and
`seed_data/news_articles.json` — direct exports of `src/data/news.js`
(`NEWS_CATEGORIES` and the raw, unresolved `articles` array) — resolves
every cross-link by slug, and upserts by slug (safe to re-run).

## About & contact content

Unlike every content area above, this isn't a collection of independently
addressable entities — the frontend's `organization.js` is a single
settings-shaped object the About and Contact pages both read from, so
`OrganizationSettings` is modeled as a singleton table (exactly one row)
with a plain GET/PATCH API instead of the usual list/detail/create/delete
shape:

```bash
GET /api/v1/organization
```

Public, no auth required; `404` if `scripts/seed_organization.py` hasn't
been run yet. Covers mission, vision, story, "why the ocean matters,"
"who we work with," the four `what_we_do` steps (Explore/Research/
Conserve/Connect), plus contact email, field-office locations, the
`contact_subjects` dropdown vocabulary, and social links.

Team profiles intentionally reuse `ResearchTeam` (`GET
/api/v1/research-teams`, B5) rather than introducing a named-staff
roster — the frontend never built one either (see `organization.js`'s
own comment); there are no real staff photos or biographies yet.

Write access:

| Action | Roles |
|---|---|
| Update organization settings | `editor`, `content_manager`, `admin`, `super_admin` |

No create/delete — the row is bootstrapped by the seed script and
updated in place.

**Seeding real content:**

```bash
uv run python scripts/seed_organization.py
```

Loads `seed_data/organization.json` — a direct export of
`src/data/organization.js`'s `organization`, `contactDetails`,
`contactSubjects`, and `socialLinks` — and updates the single row in
place if one already exists (safe to re-run; never creates a second row).

### Contact form submissions

```bash
POST /api/v1/contact-submissions
```

Public, no auth required — this is the real backend the frontend's
`EnquiryForm` component has been waiting for. Its code comment has said
*"replace this setTimeout with a real API call once one exists"* since
before this backend existed; the frontend itself isn't wired up to call
it yet (same as every other endpoint — see "Frontend connection" below),
but the endpoint is now real.

Reading and triaging submissions is admin-only — this is an inbox, not
published content, so it doesn't follow the `editor`/`content_manager`
pattern used everywhere else in this sprint:

| Action | Roles |
|---|---|
| Submit a contact form | anyone (public) |
| List/read/mark-read/delete submissions | `admin`, `super_admin` |

```bash
GET /api/v1/contact-submissions              # ?is_read=true|false
GET /api/v1/contact-submissions/{id}
PATCH /api/v1/contact-submissions/{id}        # { "is_read": true }
DELETE /api/v1/contact-submissions/{id}
```

Three other pages (`SupportPage`, `PartnerPage`, `VolunteerPage`) reuse
the same `EnquiryForm` component with different field sets (project,
partnership type, skills/availability, ...) belonging to a "Get
Involved" content area that isn't part of the B1-B15 roadmap — those
stay frontend-only and unwired for now, same as every other not-yet-built
connection in this repo.

## Media (uploads)

Every content model built in B3-B9 stores images as plain string paths
(e.g. `/marine_sharks.jpg`) pointing at the frontend's own `public/`
folder — real site photography that already exists as a static asset
and isn't touched by this sprint. `Media` is the storage layer for *new*
uploads made through the admin API going forward — local disk only
(`Settings.media_root`, default `media_storage/`), no S3/cloud storage
wired up.

```bash
POST   /api/v1/media           # multipart: file + optional alt_text
GET    /api/v1/media           # list, newest first
GET    /api/v1/media/{id}
PATCH  /api/v1/media/{id}      # { "alt_text": "..." }
DELETE /api/v1/media/{id}      # also deletes the file from disk
```

Uploaded files are served back out through a `StaticFiles` mount at
`Settings.media_url_prefix` (default `/media`, mounted in `app.main`
alongside the API, not under `/api/v1`) — so a returned `url` like
`/media/<uuid>.png` is fetched directly, not through the JSON API.

Upload validation: only `image/jpeg`, `image/png`, `image/webp`,
`image/gif` are accepted (checked against `Content-Type`, not the
filename); anything else is `400`. Files over
`Settings.media_max_upload_bytes` (default 10 MB) are rejected with
`413`. The file is written to disk under a generated UUID-based
`stored_name` — never the original, client-controlled filename — to
rule out path traversal and collisions; the original `filename` is kept
only for display.

Write access — upload/browse/edit-alt-text follows the same
editor/content_manager+ pattern as every content-write path since B7
(whoever can attach an image to a project or article should be able to
upload one); delete is admin-only, same as every other delete, since it
also removes the file from disk:

| Action | Roles |
|---|---|
| Upload / list / view / edit alt text | `editor`, `content_manager`, `admin`, `super_admin` |
| Delete (removes the file from disk too) | `admin`, `super_admin` |

No seed script — there's no "real content" to migrate here, only new
upload infrastructure. `media_storage/` is created automatically on
first run (both by `app.main`'s static mount and the upload endpoint)
and is gitignored.

## Adding a new migration

After adding/changing a model (add it to `app/db/models_registry.py` so
Alembic's autogenerate can see it):

```bash
uv run alembic revision --autogenerate -m "add destinations table"
uv run alembic upgrade head
```

Always read the autogenerated migration before applying it — autogenerate
is a starting point, not a guarantee, especially for column renames and
data migrations.

## Frontend connection

The Vite frontend should call this API via `VITE_API_URL` (see the root
`.env.example`), e.g. `VITE_API_URL=http://localhost:8000/api/v1`. Wiring
the frontend's API service layer and `AuthContext` up to these endpoints
is a separate step — the frontend still reads from `src/data/*.js` and
has no login UI yet.

## Environment variables

See `.env.example`. In production: set `DATABASE_URL` to the real
Postgres instance, `CORS_ORIGINS` to the deployed frontend's origin(s),
and generate a fresh `SECRET_KEY` — never reuse the dev value, never
commit a real one. `MEDIA_ROOT`'s local-disk storage (B10) won't survive
a redeploy on most hosting platforms and isn't shared across multiple
app instances — swap it for real object storage (S3 or equivalent)
before this goes anywhere beyond a single-instance dev/staging box.
