import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { listRegions } from '../../lib/contentApi';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

export default function TourismRegions() {
  const [regions, setRegions] = useState(null);
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  useEffect(() => {
    listRegions(language)
      .then(setRegions)
      .catch(() => setRegions([]));
  }, [language]);

  if (regions === null) return null;

  return (
    <section className="exp-cats section" id="tourism-regions" aria-labelledby="tourism-regions-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('tourism.regions.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-regions-heading">
            {t('tourism.regions.heading')}
          </h2>
        </div>

        <div className="exp-cats__grid">
          {regions.map((region) => (
            <Link key={region.id} to={localizedPath('/explore-the-coast')} className="exp-cat-card">
              <div className="exp-cat-card__media">
                <img src={region.image} alt={region.name} className="exp-cat-card__img" loading="lazy" />
                <div className="exp-cat-card__overlay" />
                <div className="exp-cat-card__icon">
                  <MapPin size={20} />
                </div>
                <span className="exp-cat-card__count">
                  {region.destinationsCount}{' '}
                  {region.destinationsCount === 1
                    ? t('tourism.regions.destinationSingular')
                    : t('tourism.regions.destinationPlural')}
                </span>
              </div>

              <div className="exp-cat-card__body">
                <h3 className="exp-cat-card__title">{region.name}</h3>
                <p className="exp-cat-card__tagline">{region.tagline || region.description}</p>

                <span className="exp-cat-card__cta">
                  <span>{t('tourism.regions.cta')}</span>
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
