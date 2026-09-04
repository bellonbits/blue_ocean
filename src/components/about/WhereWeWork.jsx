import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { listRegions } from '../../lib/contentApi';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

export default function WhereWeWork() {
  const [regions, setRegions] = useState([]);
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  useEffect(() => {
    let cancelled = false;
    listRegions(language).then((data) => { if (!cancelled) setRegions(data); }).catch(() => {});
    return () => { cancelled = true; };
  }, [language]);

  return (
    <section className="exp-cats section" aria-labelledby="where-we-work-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('about.whereWeWork.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="where-we-work-heading">
            {t('about.whereWeWork.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('about.whereWeWork.subheading')}
          </p>
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
                <span className="exp-cat-card__count">{region.destinationsCount} {t('about.whereWeWork.destinationsLabel')}</span>
              </div>

              <div className="exp-cat-card__body">
                <h3 className="exp-cat-card__title">{region.name}</h3>
                <p className="exp-cat-card__tagline">{region.tagline}</p>

                <span className="exp-cat-card__cta">
                  <span>{t('about.whereWeWork.exploreCta')}</span>
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
