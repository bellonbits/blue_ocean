import { Link } from 'react-router-dom';
import { MapPin, Activity, ArrowRight } from 'lucide-react';
import { getStatusLabel } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCard.css';

const STATUS_COLORS = {
  Planned: { bg: 'rgba(148, 163, 184, 0.15)', text: '#CBD5E1', border: 'rgba(148, 163, 184, 0.35)' },
  Active: { bg: 'rgba(34, 197, 94, 0.15)', text: '#86EFAC', border: 'rgba(34, 197, 94, 0.35)' },
  Completed: { bg: 'rgba(2, 204, 254, 0.15)', text: '#7DD3FC', border: 'rgba(2, 204, 254, 0.35)' },
  Published: { bg: 'rgba(168, 85, 247, 0.15)', text: '#D8B4FE', border: 'rgba(168, 85, 247, 0.35)' },
};

export default function ResearchProjectCard({ project, priority = false }) {
  const { language, t } = useLanguage();
  const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.Active;

  return (
    <article className="exp-card">
      <Link to={`/research/projects/${project.slug}`} className="exp-card__link" aria-label={`View ${project.title}`}>
        <div className="exp-card__media-wrap">
          <img
            src={project.heroImage}
            alt={project.title}
            className="exp-card__img"
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="exp-card__gradient" />

          <div className="exp-card__top-bar">
            <span className="exp-card__category-badge">{project.areaName}</span>
            <span
              className="badge exp-card__status-badge"
              style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}` }}
            >
              <Activity size={11} />
              <span>{getStatusLabel(project.status, language)}</span>
            </span>
          </div>
        </div>

        <div className="exp-card__body">
          <h3 className="exp-card__title">{project.title}</h3>
          <p className="exp-card__tagline">{project.editorialStatement}</p>
          <p className="exp-card__desc">{project.summary}</p>

          <div className="exp-card__meta-row">
            <span className="exp-card__meta-item">
              <MapPin size={12} />
              <span>{project.region}</span>
            </span>
          </div>

          <div className="exp-card__footer">
            <span className="exp-card__cta">
              <span>{t('research.card.viewProjectCta')}</span>
              <ArrowRight size={14} className="exp-card__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
