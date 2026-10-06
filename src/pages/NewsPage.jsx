import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import NewsHero from '../components/news/NewsHero';
import FeaturedArticle from '../components/news/FeaturedArticle';
import NewsCategoryStrip from '../components/news/NewsCategoryStrip';
import ArticleCard from '../components/news/ArticleCard';
import { getLatestArticles, getFeaturedArticle } from '../data/news';
import '../components/experiences/ExperienceGrid.css';

import '../styles/portalDesignSystem.css';

export default function NewsPage() {
  useScrollReveal();
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const featured = getFeaturedArticle(language);
  const latest = getLatestArticles(6, featured.slug, language);

  useEffect(() => {
    document.title = 'News & Discoveries — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Blue Heaven News & Discoveries">
        {/* 1. Inset Rounded Hero */}
        <NewsHero />

        {/* 2. Featured Panorama Article */}
        <section className="portal-card-section" aria-label="Featured Article">
          <FeaturedArticle />
        </section>

        {/* 3. Category Strip */}
        <section className="portal-card-section portal-card-section--tint" aria-label="News Categories">
          <NewsCategoryStrip />
        </section>

        {/* 4. Latest Articles Grid */}
        <section className="portal-card-section" aria-labelledby="latest-articles-heading">
          <div className="portal-section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', textAlign: 'left', maxWidth: '100%', margin: '0 0 32px 0' }}>
            <div>
              <span className="portal-section-tag">{t('news.viewAllCta.eyebrow')}</span>
              <h2 className="portal-section-title" id="latest-articles-heading">{t('news.viewAllCta.heading')}</h2>
            </div>
            <Link to={localizedPath('/news/articles')} className="portal-btn-secondary">
              <span>{t('news.viewAllCta.cta')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="exp-grid__results reveal">
            {latest.map((a, i) => (
              <ArticleCard key={a.id} article={a} priority={i < 3} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

