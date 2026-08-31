import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Fish, CircleDot, Waves, Anchor, Compass, AlertTriangle, Droplets, Sprout } from 'lucide-react';
import { researchAreas, getProjectCountByArea } from '../../data/research';
import '../experiences/ExperienceCategories.css';

const ICONS = {
  'marine-biodiversity': Microscope,
  fisheries: Fish,
  'coral-reefs': CircleDot,
  'sharks-rays': Waves,
  'dolphins-whales': Anchor,
  'sea-turtles': Compass,
  'ocean-pollution': AlertTriangle,
  'water-quality': Droplets,
  'coastal-ecosystems': Sprout,
};

export default function ResearchAreas() {
  return (
    <section className="exp-cats section" id="research-areas" aria-labelledby="research-areas-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">RESEARCH AREAS</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="research-areas-heading">
            What We Study
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Nine areas of active scientific inquiry across Somalia's marine and coastal environment.
          </p>
        </div>

        <div className="exp-cats__grid">
          {researchAreas.map((area) => {
            const Icon = ICONS[area.id] || Microscope;
            const count = getProjectCountByArea(area.id);

            return (
              <Link
                key={area.id}
                to={`/research/projects?area=${area.id}`}
                className="exp-cat-card"
              >
                <div className="exp-cat-card__media">
                  <img src={area.image} alt={area.title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">{count} {count === 1 ? 'Project' : 'Projects'}</span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{area.title}</h3>
                  <p className="exp-cat-card__tagline">{area.description}</p>

                  <span className="exp-cat-card__cta">
                    <span>Explore</span>
                    <ArrowRight size={14} className="exp-cat-card__arrow" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
