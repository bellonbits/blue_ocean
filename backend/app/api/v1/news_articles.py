from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import require_role
from app.core.activity import log_activity
from app.db.session import get_db
from app.models.activity_log import ActivityAction
from app.models.community import Community
from app.models.conservation_project import ConservationProject
from app.models.destination import Destination
from app.models.experience import Experience
from app.models.news_article import NewsArticle
from app.models.news_category import NewsCategory
from app.models.research_project import ResearchProject
from app.models.species import Species
from app.models.user import User, UserRole
from app.schemas.news_article import NewsArticleCreate, NewsArticleRead, NewsArticleUpdate

router = APIRouter(prefix="/news-articles", tags=["news-articles"])

# Same pattern as content_manager on conservation/communities (B7): added
# alongside editor, not in place of it.
_edit_articles = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.CONTENT_MANAGER)
_delete_articles = require_role(UserRole.SUPER_ADMIN, UserRole.ADMIN)

_EAGER = (
    joinedload(NewsArticle.category),
    joinedload(NewsArticle.destinations),
    joinedload(NewsArticle.species),
    joinedload(NewsArticle.research_projects),
    joinedload(NewsArticle.conservation_projects),
    joinedload(NewsArticle.experiences),
    joinedload(NewsArticle.communities),
)


def _resolve_by_ids(db: Session, model, ids: list[UUID], label: str) -> list:
    if not ids:
        return []
    rows = db.query(model).filter(model.id.in_(ids)).all()
    missing = set(ids) - {r.id for r in rows}
    if missing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Unknown {label}(s): {', '.join(str(m) for m in missing)}")
    return rows


def _apply_links(db: Session, article: NewsArticle, payload) -> None:
    if payload.destination_ids is not None:
        article.destinations = _resolve_by_ids(db, Destination, payload.destination_ids, "destination_id")
    if payload.species_ids is not None:
        article.species = _resolve_by_ids(db, Species, payload.species_ids, "species_id")
    if payload.research_project_ids is not None:
        article.research_projects = _resolve_by_ids(db, ResearchProject, payload.research_project_ids, "research_project_id")
    if payload.conservation_project_ids is not None:
        article.conservation_projects = _resolve_by_ids(db, ConservationProject, payload.conservation_project_ids, "conservation_project_id")
    if payload.experience_ids is not None:
        article.experiences = _resolve_by_ids(db, Experience, payload.experience_ids, "experience_id")
    if payload.community_ids is not None:
        article.communities = _resolve_by_ids(db, Community, payload.community_ids, "community_id")


@router.get("", response_model=list[NewsArticleRead])
def list_news_articles(
    category: str | None = Query(default=None, description="Filter by category slug"),
    featured: bool | None = Query(default=None),
    destination: str | None = Query(default=None, description="Filter to articles related to this destination slug"),
    species: str | None = Query(default=None, description="Filter to articles related to this species slug"),
    research_project: str | None = Query(default=None, description="Filter to articles related to this research project slug"),
    conservation_project: str | None = Query(default=None, description="Filter to articles related to this conservation project slug"),
    db: Session = Depends(get_db),
) -> list[NewsArticle]:
    query = db.query(NewsArticle).options(*_EAGER).filter(NewsArticle.published.is_(True))

    if category:
        query = query.join(NewsCategory).filter(NewsCategory.slug == category)
    if featured is not None:
        query = query.filter(NewsArticle.featured.is_(featured))
    if destination:
        query = query.join(NewsArticle.destinations).filter(Destination.slug == destination)
    if species:
        query = query.join(NewsArticle.species).filter(Species.slug == species)
    if research_project:
        query = query.join(NewsArticle.research_projects).filter(ResearchProject.slug == research_project)
    if conservation_project:
        query = query.join(NewsArticle.conservation_projects).filter(ConservationProject.slug == conservation_project)

    return query.order_by(NewsArticle.date.desc()).all()


@router.get("/{slug}", response_model=NewsArticleRead)
def get_news_article(slug: str, db: Session = Depends(get_db)) -> NewsArticle:
    article = (
        db.query(NewsArticle)
        .options(*_EAGER)
        .filter(NewsArticle.slug == slug, NewsArticle.published.is_(True))
        .first()
    )
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News article not found.")
    return article


@router.get("/admin/all", response_model=list[NewsArticleRead])
def list_all_news_articles_admin(db: Session = Depends(get_db), _: User = Depends(_edit_articles)) -> list[NewsArticle]:
    return db.query(NewsArticle).options(*_EAGER).order_by(NewsArticle.date.desc()).all()


@router.get("/admin/{article_id}", response_model=NewsArticleRead)
def get_news_article_admin(
    article_id: UUID, db: Session = Depends(get_db), _: User = Depends(_edit_articles)
) -> NewsArticle:
    article = db.query(NewsArticle).options(*_EAGER).filter(NewsArticle.id == article_id).first()
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News article not found.")
    return article


@router.post("", response_model=NewsArticleRead, status_code=status.HTTP_201_CREATED)
def create_news_article(
    payload: NewsArticleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_articles),
) -> NewsArticle:
    if db.query(NewsArticle).filter(NewsArticle.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A news article with this slug already exists.")
    if db.get(NewsCategory, payload.category_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    exclude = {"destination_ids", "species_ids", "research_project_ids", "conservation_project_ids", "experience_ids", "community_ids"}
    article = NewsArticle(**payload.model_dump(exclude=exclude))
    _apply_links(db, article, payload)

    db.add(article)
    log_activity(db, current_user, ActivityAction.CREATED, "news article", article.title)
    if article.published:
        log_activity(db, current_user, ActivityAction.PUBLISHED, "news article", article.title)
    db.commit()
    db.refresh(article)
    return article


@router.patch("/{article_id}", response_model=NewsArticleRead)
def update_news_article(
    article_id: UUID,
    payload: NewsArticleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(_edit_articles),
) -> NewsArticle:
    article = db.get(NewsArticle, article_id)
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News article not found.")

    exclude = {"destination_ids", "species_ids", "research_project_ids", "conservation_project_ids", "experience_ids", "community_ids"}
    updates = payload.model_dump(exclude_unset=True, exclude=exclude)

    if "slug" in updates and updates["slug"] != article.slug:
        if db.query(NewsArticle).filter(NewsArticle.slug == updates["slug"]).first() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A news article with this slug already exists.")
    if "category_id" in updates and db.get(NewsCategory, updates["category_id"]) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category_id does not reference an existing category.")

    was_published = article.published
    for field, value in updates.items():
        setattr(article, field, value)

    _apply_links(db, article, payload)

    if updates:
        if not was_published and article.published:
            log_activity(db, current_user, ActivityAction.PUBLISHED, "news article", article.title)
        else:
            log_activity(db, current_user, ActivityAction.UPDATED, "news article", article.title)

    db.commit()
    db.refresh(article)
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news_article(article_id: UUID, db: Session = Depends(get_db), _: User = Depends(_delete_articles)) -> None:
    article = db.get(NewsArticle, article_id)
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News article not found.")

    db.delete(article)
    db.commit()
