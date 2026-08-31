import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Shield, Anchor, Trash2, Waves, GraduationCap, Users } from 'lucide-react';
import { conservationFocusAreas, getFocusAreaProjectCount } from '../../data/conservation';
import '../experiences/ExperienceCategories.css';

const ICONS = {
  'marine-wildlife': Fish,
  'coral-habitat': Shield,
  'sustainable-fishing': Anchor,
  'ocean-pollution': Trash2,
  'beach-cleanup': Waves,
  'marine-education': GraduationCap,
  'community-conservation': Users,
};

export default function ConservationFocusAreas() {
  return (
    <section className="exp-cats section" id="conservation-focus" aria-labelledby="conservation-focus-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">CONSERVATION AREAS</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="conservation-focus-heading">
            Where We Focus
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Seven areas of active conservation work across Somalia's marine and coastal environment.
          </p>
        </div>

        <div className="exp-cats__grid">
          {conservationFocusAreas.map((area) => {
            const Icon = ICONS[area.id] || Shield;
            const count = getFocusAreaProjectCount(area.id);

            return (
              <Link
                key={area.id}
                to={`/conservation/projects?area=${area.id}`}
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
