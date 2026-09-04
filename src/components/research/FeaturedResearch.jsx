import { Link } from 'react-router-dom';
import { MapPin, Activity, ArrowRight } from 'lucide-react';
import { getFeaturedProject, getAllProjects, getStatusLabel } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import ResearchProjectCard from './ResearchProjectCard';
import './FeaturedResearch.css';

export default function FeaturedResearch() {
  const { language, t } = useLanguage();
  const featured = getFeaturedProject(language);
  const others = getAllProjects(language)
    .filter((p) => p.slug !== featured.slug)
    .slice(0, 3);
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="featured-research section" aria-labelledby="featured-research-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">{t('research.featured.eyebrow')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="featured-research-heading">
            {t('research.featured.heading')}
          </h2>
        </div>

        <Link to={localizedPath(`/research/projects/${featured.slug}`)} className="featured-research__card reveal">
          <div className="featured-research__media">
            <img src={featured.heroImage} alt={featured.title} className="featured-research__img" loading="eager" />
            <div className="featured-research__overlay" />
          </div>

          <div className="featured-research__content">
            <span className="featured-research__area">{featured.areaName}</span>
            <h3 className="featured-research__title">{featured.title}</h3>
            <p className="featured-research__summary">{featured.summary}</p>

            <div className="featured-research__meta">
              <span className="featured-research__meta-item">
                <MapPin size={13} />
                <span>{featured.region}</span>
              </span>
              <span className="featured-research__meta-item">
                <Activity size={13} />
                <span>{getStatusLabel(featured.status, language)}</span>
              </span>
            </div>

            <span className="featured-research__cta">
              <span>{t('research.featured.cta')}</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {others.length > 0 && (
          <div className="featured-research__others reveal">
            {others.map((p) => (
              <ResearchProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
