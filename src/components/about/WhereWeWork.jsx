import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { listRegions } from '../../lib/contentApi';
import '../experiences/ExperienceCategories.css';

export default function WhereWeWork() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    let cancelled = false;
    listRegions().then((data) => { if (!cancelled) setRegions(data); }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="exp-cats section" aria-labelledby="where-we-work-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">GEOGRAPHIC SCOPE</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="where-we-work-heading">
            Where We Work
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Blue Ocean's work spans Somalia's entire 3,025 km coastline, across three distinct regions.
          </p>
        </div>

        <div className="exp-cats__grid">
          {regions.map((region) => (
            <Link key={region.id} to="/explore-the-coast" className="exp-cat-card">
              <div className="exp-cat-card__media">
                <img src={region.image} alt={region.name} className="exp-cat-card__img" loading="lazy" />
                <div className="exp-cat-card__overlay" />
                <div className="exp-cat-card__icon">
                  <MapPin size={20} />
                </div>
                <span className="exp-cat-card__count">{region.destinationsCount} Destinations</span>
              </div>

              <div className="exp-cat-card__body">
                <h3 className="exp-cat-card__title">{region.name}</h3>
                <p className="exp-cat-card__tagline">{region.tagline}</p>

                <span className="exp-cat-card__cta">
                  <span>Explore the Coast</span>
                  <ArrowRight size={14} className="exp-cat-card__arrow" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
