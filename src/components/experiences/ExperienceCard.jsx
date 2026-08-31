import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import './ExperienceCard.css';

export default function ExperienceCard({ experience, priority = false }) {
  const isComingSoon = experience.status === 'coming-soon';

  return (
    <article className="exp-card">
      <Link to={`/experiences/${experience.slug}`} className="exp-card__link" aria-label={`Explore ${experience.title}`}>
        <div className="exp-card__media-wrap">
          <img
            src={experience.heroImage}
            alt={experience.title}
            className="exp-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="exp-card__gradient" />

          <div className="exp-card__top-bar">
            <span className="exp-card__category-badge">{experience.categoryName}</span>
            {isComingSoon && (
              <span className="badge badge-coming-soon exp-card__status-badge">
                <Sparkles size={11} />
                <span>Coming Soon</span>
              </span>
            )}
          </div>
        </div>

        <div className="exp-card__body">
          <h3 className="exp-card__title">{experience.title}</h3>
          <p className="exp-card__tagline">{experience.tagline}</p>
          <p className="exp-card__desc">{experience.shortDescription}</p>

          <div className="exp-card__meta-row">
            <span className="exp-card__meta-item">
              <MapPin size={12} />
              <span>{experience.location}</span>
            </span>
            <span className="exp-card__meta-item">
              <Clock size={12} />
              <span>{experience.duration}</span>
            </span>
          </div>

          <div className="exp-card__footer">
            <span className="exp-card__cta">
              <span>View Experience</span>
              <ArrowRight size={14} className="exp-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
