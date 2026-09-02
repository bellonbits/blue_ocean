import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedSpecies } from '../../data/marineLife';
import '../experiences/ExperienceCategories.css';

export default function TourismMarineLife() {
  const species = getFeaturedSpecies().slice(0, 6);

  return (
    <section className="exp-cats section" aria-labelledby="tourism-marine-life-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Marine Life You Could Encounter</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-marine-life-heading">
            Meet the life beneath the surface.
          </h2>
        </div>

        <div className="exp-cats__grid">
          {species.map((s) => (
            <Link key={s.id} to={`/marine-life/species/${s.slug}`} className="exp-cat-card">
              <div className="exp-cat-card__media">
                <img src={s.heroImage} alt={s.commonName} className="exp-cat-card__img" loading="lazy" />
                <div className="exp-cat-card__overlay" />
              </div>

              <div className="exp-cat-card__body">
                <h3 className="exp-cat-card__title">{s.commonName}</h3>
                <p className="exp-cat-card__tagline">{s.tagline}</p>

                <span className="exp-cat-card__cta">
                  <span>Discover</span>
                  <ArrowRight size={14} className="exp-cat-card__arrow" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/marine-life" className="btn btn-primary btn-lg">
            <span>Explore Full Marine Life Library</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
