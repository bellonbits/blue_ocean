import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import '../experiences/ExperienceCard.css';

export default function ArticleCard({ article, priority = false }) {
  return (
    <article className="exp-card">
      <Link to={`/news/${article.slug}`} className="exp-card__link" aria-label={`Read ${article.title}`}>
        <div className="exp-card__media-wrap">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="exp-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="exp-card__gradient" />

          <div className="exp-card__top-bar">
            <span className={`badge ${article.categoryBadgeClass}`}>{article.categoryLabel}</span>
          </div>
        </div>

        <div className="exp-card__body">
          <h3 className="exp-card__title">{article.title}</h3>
          <p className="exp-card__desc">{article.excerpt}</p>

          <div className="exp-card__meta-row">
            <span className="exp-card__meta-item">
              <Calendar size={12} />
              <span>{article.displayDate}</span>
            </span>
            <span className="exp-card__meta-item">
              <Clock size={12} />
              <span>{article.readTime}</span>
            </span>
          </div>

          <div className="exp-card__footer">
            <span className="exp-card__cta">
              <span>Read Story</span>
              <ArrowRight size={14} className="exp-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
