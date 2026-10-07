import { Link } from 'react-router-dom';
import { FlaskConical, Activity, ArrowRight } from 'lucide-react';
import '../experiences/ExperienceWildlife.css';

export default function ConservationResearchConnection({ project }) {
  if (!project.researchLinks || project.researchLinks.length === 0) return null;

  return (
    <section className="exp-wildlife-sec section" aria-labelledby="conservation-research-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">EVIDENCE-DRIVEN</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-research-heading">
            Built on research.
          </h2>
          <p className="section-subheading">
            {project.title} is grounded directly in Blue Ocean's own field research.
          </p>
        </div>

        <div className="exp-wildlife-grid reveal">
          {project.researchLinks.map((rp) => (
            <Link key={rp.slug} to={`/research/projects/${rp.slug}`} className="exp-wildlife-card">
              <div className="exp-wildlife-card__media">
                <img src={rp.heroImage} alt={rp.title} className="exp-wildlife-card__img" loading="lazy" />
                <div className="exp-wildlife-card__overlay" />
              </div>
              <div className="exp-wildlife-card__body">
                <span className="exp-wildlife-card__cat">
                  <FlaskConical size={12} />
                  <span>{rp.areaName}</span>
                </span>
                <h3 className="exp-wildlife-card__name">{rp.title}</h3>
                <p className="exp-wildlife-card__scientific" style={{ fontStyle: 'normal', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={12} />
                  <span>{rp.status}</span>
                </p>
                <span className="exp-wildlife-card__cta">
                  <span>Explore the Research</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
