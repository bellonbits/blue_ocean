import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './RegionCards.css';

export default function RegionCards({ regions = [], onSelectRegion }) {
  const { t } = useLanguage();

  return (
    <section className="region-section section" id="regions-overview" aria-labelledby="regions-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered reveal">
          <span className="label-text">{t('exploreCoast.regions.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="regions-heading">
            {t('exploreCoast.regions.heading')}
            <br />
            {t('exploreCoast.regions.headingAccent')}
          </h2>
          <p className="section-subheading">
            {t('exploreCoast.regions.subheading')}
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="region-grid">
          {regions.map((reg, i) => (
            <article
              key={reg.id}
              className={`region-card reveal reveal-delay-${i + 1}`}
              onClick={() => onSelectRegion && onSelectRegion(reg.id)}
            >
              {/* Image & Gradient */}
              <div className="region-card__img-wrap">
                <img
                  src={reg.image}
                  alt={`${reg.name} coastline`}
                  className="region-card__img"
                  loading="lazy"
                />
                <div className="region-card__overlay" aria-hidden="true" />
              </div>

              {/* Card Content */}
              <div className="region-card__content">
                <div className="region-card__top">
                  <span className="badge badge-turquoise">
                    <MapPin size={12} />
                    {reg.subtitle}
                  </span>
                  <span className="region-card__count">
                    {reg.destinationsCount} {t('exploreCoast.regions.destinationsCountSuffix')}
                  </span>
                </div>

                <div className="region-card__body">
                  <h3 className="region-card__title">{reg.name}</h3>
                  <p className="region-card__desc">{reg.shortDescription || reg.tagline}</p>

                  <div className="region-card__seas">
                    {reg.seas.map((sea) => (
                      <span key={sea} className="region-card__sea-pill">
                        {sea}
                      </span>
                    ))}
                  </div>

                  <button
                    className="region-card__cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectRegion) onSelectRegion(reg.id);
                      const el = document.getElementById('destinations-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    id={`filter-region-${reg.id}`}
                  >
                    <span>{t('exploreCoast.regions.exploreRegionCta', reg.name)}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
