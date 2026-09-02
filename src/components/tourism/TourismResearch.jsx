import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Fish, CircleDot, Waves, Anchor, Compass } from 'lucide-react';
import { researchAreas } from '../../data/research';
import '../experiences/ExperienceCategories.css';

const ICONS = {
  'marine-biodiversity': Microscope,
  fisheries: Fish,
  'coral-reefs': CircleDot,
  'sharks-rays': Waves,
  'dolphins-whales': Anchor,
  'sea-turtles': Compass,
};

export default function TourismResearch() {
  const areas = researchAreas.slice(0, 6);

  return (
    <section className="exp-cats section" aria-labelledby="tourism-research-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Research Behind the Experience</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-research-heading">
            Explore with knowledge.
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Before exploring a reef, learn what lives there — every destination on this page connects back to Blue
            Ocean's own field research.
          </p>
        </div>

        <div className="exp-cats__grid">
          {areas.map((area) => {
            const Icon = ICONS[area.id] || Microscope;
            return (
              <Link key={area.id} to="/research" className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={area.image} alt={area.title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
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

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/research" className="btn btn-primary btn-lg">
            <span>Explore Our Research</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
