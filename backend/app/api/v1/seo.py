"""SEO, Sitemap, and RSS Feed API — Sprint B13.

Provides:
- `/sitemap.xml`: Search engine sitemap covering all static pages and published content
- `/rss.xml`: RSS 2.0 feed of latest news articles and community stories
- `/api/v1/seo/meta`: Dynamic OpenGraph, Twitter card, and Schema.org JSON-LD resolver for frontend routes
"""

from datetime import datetime, timezone
from email.utils import format_datetime
from xml.sax.saxutils import escape

from fastapi import APIRouter, Depends, Query, Response
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import get_db
from app.models.community_story import CommunityStory
from app.models.conservation_project import ConservationProject
from app.models.destination import Destination, DestinationStatus
from app.models.experience import Experience
from app.models.news_article import NewsArticle
from app.models.organization_settings import OrganizationSettings
from app.models.research_project import ResearchProject
from app.models.species import Species
from app.schemas.seo import SEOMetaResponse

router = APIRouter(tags=["seo"])


SITE_BASE_URL = "https://blueocean.so"
SITE_TITLE_DEFAULT = "Blue Ocean Somalia — Marine Conservation & Research"
SITE_DESC_DEFAULT = "Dedicated to documenting, protecting, and sustainably exploring the rich marine ecosystems along Somalia's 3,330 km coastline."
DEFAULT_OG_IMAGE = "https://blueocean.so/images/hero-marine.jpg"


STATIC_PAGES = [
    {"path": "/", "priority": "1.0", "changefreq": "weekly"},
    {"path": "/explore-the-coast", "priority": "0.9", "changefreq": "weekly"},
    {"path": "/marine-life", "priority": "0.9", "changefreq": "weekly"},
    {"path": "/research", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/ocean-experiences", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/conservation", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/coastal-communities", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/news", "priority": "0.8", "changefreq": "daily"},
    {"path": "/about", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/contact", "priority": "0.6", "changefreq": "monthly"},
]


@router.get("/sitemap.xml", response_class=Response)
def get_sitemap(db: Session = Depends(get_db)) -> Response:
    """Generates a dynamic XML sitemap conforming to sitemaps.org standard."""
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    urls: list[str] = []

    # 1. Static pages
    for page in STATIC_PAGES:
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}{page['path']}</loc>\n"
            f"    <lastmod>{now_iso}</lastmod>\n"
            f"    <changefreq>{page['changefreq']}</changefreq>\n"
            f"    <priority>{page['priority']}</priority>\n"
            f"  </url>"
        )

    # 2. Destinations
    destinations = db.query(Destination).filter(Destination.status == DestinationStatus.PUBLISHED).all()
    for d in destinations:
        mod = d.updated_at.strftime("%Y-%m-%d") if d.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/explore-the-coast/{d.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>weekly</changefreq>\n"
            f"    <priority>0.8</priority>\n"
            f"  </url>"
        )

    # 3. Species
    species_list = db.query(Species).filter(Species.published.is_(True)).all()
    for s in species_list:
        mod = s.updated_at.strftime("%Y-%m-%d") if s.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/marine-life/species/{s.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>weekly</changefreq>\n"
            f"    <priority>0.8</priority>\n"
            f"  </url>"
        )

    # 4. Research Projects
    research_projects = db.query(ResearchProject).filter(ResearchProject.published.is_(True)).all()
    for p in research_projects:
        mod = p.updated_at.strftime("%Y-%m-%d") if p.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/research/projects/{p.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>0.7</priority>\n"
            f"  </url>"
        )

    # 5. Ocean Experiences
    experiences = db.query(Experience).filter(Experience.published.is_(True)).all()
    for e in experiences:
        mod = e.updated_at.strftime("%Y-%m-%d") if e.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/ocean-experiences/{e.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>0.7</priority>\n"
            f"  </url>"
        )

    # 6. Conservation Projects
    conservation_projects = db.query(ConservationProject).filter(ConservationProject.published.is_(True)).all()
    for cp in conservation_projects:
        mod = cp.updated_at.strftime("%Y-%m-%d") if cp.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/conservation/projects/{cp.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>0.7</priority>\n"
            f"  </url>"
        )

    # 7. Community Stories
    stories = db.query(CommunityStory).filter(CommunityStory.published.is_(True)).all()
    for cs in stories:
        mod = cs.updated_at.strftime("%Y-%m-%d") if cs.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/coastal-communities/{cs.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>0.7</priority>\n"
            f"  </url>"
        )

    # 8. News Articles
    articles = db.query(NewsArticle).filter(NewsArticle.published.is_(True)).all()
    for art in articles:
        mod = art.updated_at.strftime("%Y-%m-%d") if art.updated_at else now_iso
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE_BASE_URL}/news/{art.slug}</loc>\n"
            f"    <lastmod>{mod}</lastmod>\n"
            f"    <changefreq>weekly</changefreq>\n"
            f"    <priority>0.7</priority>\n"
            f"  </url>"
        )

    sitemap_xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>"
    )

    return Response(content=sitemap_xml, media_type="application/xml")


@router.get("/rss.xml", response_class=Response)
def get_rss_feed(db: Session = Depends(get_db)) -> Response:
    """Generates an RSS 2.0 syndication feed for news and stories."""
    now_rfc = format_datetime(datetime.now(timezone.utc))

    items_xml: list[str] = []

    # Recent news articles (up to 20)
    articles = (
        db.query(NewsArticle)
        .filter(NewsArticle.published.is_(True))
        .order_by(NewsArticle.created_at.desc())
        .limit(20)
        .all()
    )

    for art in articles:
        pub_dt = art.created_at if art.created_at.tzinfo else art.created_at.replace(tzinfo=timezone.utc)
        pub_rfc = format_datetime(pub_dt)
        title = escape(art.title)
        desc = escape(art.excerpt or art.title)
        link = f"{SITE_BASE_URL}/news/{art.slug}"

        items_xml.append(
            f"    <item>\n"
            f"      <title>{title}</title>\n"
            f"      <link>{link}</link>\n"
            f"      <guid isPermaLink=\"true\">{link}</guid>\n"
            f"      <description>{desc}</description>\n"
            f"      <pubDate>{pub_rfc}</pubDate>\n"
            f"      <author>{escape(art.author or 'Blue Ocean Somalia')}</author>\n"
            f"    </item>"
        )

    # Recent community stories (up to 10)
    stories = (
        db.query(CommunityStory)
        .filter(CommunityStory.published.is_(True))
        .order_by(CommunityStory.created_at.desc())
        .limit(10)
        .all()
    )

    for cs in stories:
        pub_dt = cs.created_at if cs.created_at.tzinfo else cs.created_at.replace(tzinfo=timezone.utc)
        pub_rfc = format_datetime(pub_dt)
        title = escape(cs.title)
        desc = escape(cs.marine_connection or (cs.story_content[0] if cs.story_content else cs.title))
        link = f"{SITE_BASE_URL}/coastal-communities/{cs.slug}"

        items_xml.append(
            f"    <item>\n"
            f"      <title>{title}</title>\n"
            f"      <link>{link}</link>\n"
            f"      <guid isPermaLink=\"true\">{link}</guid>\n"
            f"      <description>{desc}</description>\n"
            f"      <pubDate>{pub_rfc}</pubDate>\n"
            f"      <author>{escape(cs.author or 'Blue Ocean Somalia')}</author>\n"
            f"    </item>"
        )

    rss_xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n'
        '  <channel>\n'
        f"    <title>{escape(SITE_TITLE_DEFAULT)}</title>\n"
        f"    <link>{SITE_BASE_URL}</link>\n"
        f"    <description>{escape(SITE_DESC_DEFAULT)}</description>\n"
        f"    <language>en-us</language>\n"
        f"    <lastBuildDate>{now_rfc}</lastBuildDate>\n"
        f"    <atom:link href=\"{SITE_BASE_URL}/rss.xml\" rel=\"self\" type=\"application/rss+xml\" />\n"
        + "\n".join(items_xml)
        + "\n  </channel>\n"
        "</rss>"
    )

    return Response(content=rss_xml, media_type="application/rss+xml")


@router.get("/api/v1/seo/meta", response_model=SEOMetaResponse)
def get_seo_meta(
    path: str = Query(default="/", description="Frontend route path e.g. /news/whale-shark-puntland"),
    db: Session = Depends(get_db),
) -> SEOMetaResponse:
    """Returns dynamic OpenGraph, Twitter card, and Schema.org JSON-LD for any site route."""
    clean_path = "/" + path.strip().lstrip("/")
    canonical_url = f"{SITE_BASE_URL}{clean_path if clean_path != '/' else ''}"

    # Default fallback metadata
    title = SITE_TITLE_DEFAULT
    desc = SITE_DESC_DEFAULT
    image = DEFAULT_OG_IMAGE
    og_type = "website"
    json_ld: dict = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "Blue Ocean Somalia",
        "url": SITE_BASE_URL,
        "logo": f"{SITE_BASE_URL}/images/logo.png",
        "description": SITE_DESC_DEFAULT,
    }

    # Match static routes
    if clean_path == "/" or clean_path == "":
        title = f"Blue Ocean Somalia — Documenting & Protecting 3,330 km of Coastline"
        desc = SITE_DESC_DEFAULT
    elif clean_path == "/explore-the-coast":
        title = "Explore the Somali Coastline — Blue Ocean Somalia"
        desc = "Discover pristine coral reefs, coastal towns, archipelagos, and ancient trade ports along the Somali coast."
    elif clean_path == "/marine-life":
        title = "Marine Life of Somalia — Blue Ocean Somalia"
        desc = "Explore Somalia's marine biodiversity: dolphins, whales, whale sharks, sea turtles, corals, and coastal fishes."
    elif clean_path == "/research":
        title = "Marine Research & Expeditions — Blue Ocean Somalia"
        desc = "Scientific surveys, acoustic tagging, and environmental monitoring across Somali waters."
    elif clean_path == "/ocean-experiences":
        title = "Ocean Experiences — Blue Ocean Somalia"
        desc = "Boat tours, snorkeling, diving, island exploration, and sustainable marine tourism on the Somali coast."
    elif clean_path == "/conservation":
        title = "Conservation Initiatives — Blue Ocean Somalia"
        desc = "Community-led turtle protection, mangrove restoration, reef monitoring, and marine protected area frameworks."
    elif clean_path == "/coastal-communities":
        title = "Coastal Communities — Blue Ocean Somalia"
        desc = "Stories and sustainable livelihoods from the fishing cooperatives, youth guardians, and coastal towns of Somalia."
    elif clean_path == "/news":
        title = "News & Field Dispatch — Blue Ocean Somalia"
        desc = "Latest updates, expedition dispatches, research findings, and conservation milestones from Somali waters."
    elif clean_path == "/about":
        org = db.query(OrganizationSettings).first()
        title = "About Blue Ocean — Our Mission, Vision & Team"
        desc = org.mission if org and org.mission else "Learn about Blue Ocean Somalia's mission to safeguard marine ecosystems."
    elif clean_path == "/contact":
        title = "Contact Us — Blue Ocean Somalia"
        desc = "Get in touch with the Blue Ocean team for research partnerships, conservation inquiries, or media requests."

    # Match dynamic entity routes
    parts = [p for p in clean_path.split("/") if p]
    if len(parts) == 2:
        section, slug = parts[0], parts[1]

        if section == "explore-the-coast":
            dest = db.query(Destination).filter(Destination.slug == slug, Destination.status == DestinationStatus.PUBLISHED).first()
            if dest:
                title = f"{dest.name} — Coastal Guide | Blue Ocean Somalia"
                desc = dest.tagline or dest.short_description or SITE_DESC_DEFAULT
                image = dest.hero_image or DEFAULT_OG_IMAGE
                og_type = "place"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "TouristDestination",
                    "name": dest.name,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                    "touristType": dest.destination_type or "Coastal Exploration",
                }

        elif section == "news":
            art = db.query(NewsArticle).filter(NewsArticle.slug == slug, NewsArticle.published.is_(True)).first()
            if art:
                title = f"{art.title} | Blue Ocean News"
                desc = art.excerpt or SITE_DESC_DEFAULT
                image = art.featured_image or DEFAULT_OG_IMAGE
                og_type = "article"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": art.title,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                    "author": {"@type": "Person", "name": art.author or "Blue Ocean Somalia"},
                    "publisher": {"@type": "Organization", "name": "Blue Ocean Somalia"},
                    "datePublished": art.date or art.created_at.isoformat(),
                }

        elif section == "coastal-communities":
            cs = db.query(CommunityStory).filter(CommunityStory.slug == slug, CommunityStory.published.is_(True)).first()
            if cs:
                title = f"{cs.title} — Community Story | Blue Ocean Somalia"
                desc = cs.marine_connection or SITE_DESC_DEFAULT
                image = cs.featured_image or DEFAULT_OG_IMAGE
                og_type = "article"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": cs.title,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                    "author": {"@type": "Person", "name": cs.author or "Blue Ocean Somalia"},
                }

        elif section == "ocean-experiences":
            exp = db.query(Experience).filter(Experience.slug == slug, Experience.published.is_(True)).first()
            if exp:
                title = f"{exp.title} — Ocean Experience | Blue Ocean Somalia"
                desc = exp.tagline or exp.short_description or SITE_DESC_DEFAULT
                image = exp.hero_image or DEFAULT_OG_IMAGE
                og_type = "product"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "TouristTrip",
                    "name": exp.title,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                }

    elif len(parts) == 3:
        section, sub, slug = parts[0], parts[1], parts[2]
        if section == "marine-life" and sub == "species":
            sp = db.query(Species).filter(Species.slug == slug, Species.published.is_(True)).first()
            if sp:
                title = f"{sp.common_name} ({sp.scientific_name}) — Marine Life | Blue Ocean Somalia"
                desc = sp.tagline or sp.description or SITE_DESC_DEFAULT
                image = sp.hero_image or DEFAULT_OG_IMAGE
                og_type = "article"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "Taxon",
                    "name": sp.common_name,
                    "scientificName": sp.scientific_name,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                }

        elif section == "research" and sub == "projects":
            rp = db.query(ResearchProject).filter(ResearchProject.slug == slug, ResearchProject.published.is_(True)).first()
            if rp:
                title = f"{rp.title} — Research Project | Blue Ocean Somalia"
                desc = rp.summary or rp.editorial_statement or SITE_DESC_DEFAULT
                image = rp.hero_image or DEFAULT_OG_IMAGE
                og_type = "article"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "ResearchProject",
                    "name": rp.title,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                }

        elif section == "conservation" and sub == "projects":
            cp = db.query(ConservationProject).filter(ConservationProject.slug == slug, ConservationProject.published.is_(True)).first()
            if cp:
                title = f"{cp.title} — Conservation Initiative | Blue Ocean Somalia"
                desc = cp.summary or cp.editorial_statement or SITE_DESC_DEFAULT
                image = cp.hero_image or DEFAULT_OG_IMAGE
                og_type = "article"
                json_ld = {
                    "@context": "https://schema.org",
                    "@type": "Project",
                    "name": cp.title,
                    "description": desc,
                    "image": image,
                    "url": canonical_url,
                }

    return SEOMetaResponse(
        path=clean_path,
        title=title,
        description=desc,
        canonical_url=canonical_url,
        og_title=title,
        og_description=desc,
        og_image=image,
        og_type=og_type,
        twitter_card="summary_large_image",
        twitter_title=title,
        twitter_description=desc,
        twitter_image=image,
        json_ld=json_ld,
    )
