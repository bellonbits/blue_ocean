import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity } from 'lucide-react';
import { getConservationProjectsForDestination } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import './DestinationResearch.css';

export default function DestinationConservation({ destination }) {
  const { language } = useLanguage();
  const projects = getConservationProjectsForDestination(destination.slug, language);

  if (projects.length === 0) return null;

  return (
    <section className="dest-research-section section" aria-labelledby="dest-conservation-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">Protecting This Coast</span>
          <div className="divider" />
          <h2 className="section-heading" id="dest-conservation-heading">
            Conservation work in {destination.name}.
          </h2>
          <p className="section-subheading">
            Active and planned conservation initiatives connected to the {destination.name} coastal sector.
          </p>
        </div>

        <div className="dest-research-grid">
          {projects.map((project, i) => (
            <div key={project.id} className={`dest-research-card reveal reveal-delay-${i + 1}`}>
              <div className="dest-research-card__top">
                <span className="badge badge-conservation">
                  <Shield size={12} />
                  {project.focusAreaName}
                </span>
                <span className="dest-research-card__status">
                  <Activity size={11} />
                  {project.status}
                </span>
              </div>

              <h3 className="dest-research-card__title">{project.title}</h3>

              <div className="dest-research-card__footer">
                <span className="dest-research-card__region">{destination.region} Coast</span>
                <Link to={`/conservation/projects/${project.slug}`} className="dest-research-card__link">
                  <span>View Project</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
