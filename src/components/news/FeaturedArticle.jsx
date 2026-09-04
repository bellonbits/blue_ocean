import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getFeaturedArticle, getLatestArticles } from '../../data/news';
import { useLanguage } from '../../context/LanguageContext';
import ArticleCard from './ArticleCard';
import '../research/FeaturedResearch.css';

export default function FeaturedArticle() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const featured = getFeaturedArticle(language);
  const others = getLatestArticles(3, featured.slug, language);

  return (
    <section className="featured-research section" aria-labelledby="featured-article-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">{t('news.featured.eyebrow')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="featured-article-heading">
            {t('news.featured.heading')}
          </h2>
        </div>

        <Link to={localizedPath(`/news/${featured.slug}`)} className="featured-research__card reveal">
          <div className="featured-research__media">
            <img src={featured.featuredImage} alt={featured.title} className="featured-research__img" loading="eager" />
            <div className="featured-research__overlay" />
          </div>

          <div className="featured-research__content">
            <span className="featured-research__area">{featured.categoryLabel}</span>
            <h3 className="featured-research__title">{featured.title}</h3>
            <p className="featured-research__summary">{featured.excerpt}</p>

            <div className="featured-research__meta">
              <span className="featured-research__meta-item">
                <Calendar size={13} />
                <span>{featured.displayDate}</span>
              </span>
              <span className="featured-research__meta-item">
                <Clock size={13} />
                <span>{featured.readTime}</span>
              </span>
            </div>

            <span className="featured-research__cta">
              <span>{t('news.featured.readMore')}</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {others.length > 0 && (
          <div className="featured-research__others reveal">
            {others.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
