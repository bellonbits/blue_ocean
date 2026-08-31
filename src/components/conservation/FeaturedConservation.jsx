import { Link } from 'react-router-dom';
import { MapPin, Activity, ArrowRight } from 'lucide-react';
import { getFeaturedConservationProject, getAllConservationProjects } from '../../data/conservation';
import ConservationProjectCard from './ConservationProjectCard';
import '../research/FeaturedResearch.css';

export default function FeaturedConservation() {
  const featured = getFeaturedConservationProject();
  const others = getAllConservationProjects()
    .filter((p) => p.slug !== featured.slug)
    .slice(0, 3);

  return (
    <section className="featured-research section" aria-labelledby="featured-conservation-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">FEATURED PROJECT</span>
          <div className="divider" />
          <h2 className="section-heading" id="featured-conservation-heading">
            Conservation in focus
          </h2>
        </div>

        <Link to={`/conservation/projects/${featured.slug}`} className="featured-research__card reveal">
          <div className="featured-research__media">
            <img src={featured.heroImage} alt={featured.title} className="featured-research__img" loading="eager" />
            <div className="featured-research__overlay" />
          </div>

          <div className="featured-research__content">
            <span className="featured-research__area">{featured.focusAreaName}</span>
            <h3 className="featured-research__title">{featured.title}</h3>
            <p className="featured-research__summary">{featured.summary}</p>

            <div className="featured-research__meta">
              <span className="featured-research__meta-item">
                <MapPin size={13} />
                <span>{featured.region}</span>
              </span>
              <span className="featured-research__meta-item">
                <Activity size={13} />
                <span>{featured.status}</span>
              </span>
            </div>

            <span className="featured-research__cta">
              <span>Explore project</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {others.length > 0 && (
          <div className="featured-research__others reveal">
            {others.map((p) => (
              <ConservationProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
