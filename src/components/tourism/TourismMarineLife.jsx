import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedSpecies } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

export default function TourismMarineLife() {
  const { language, t } = useLanguage();
  const species = getFeaturedSpecies(language).slice(0, 6);
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="exp-cats section" aria-labelledby="tourism-marine-life-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('tourism.marineLife.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-marine-life-heading">
            {t('tourism.marineLife.heading')}
          </h2>
        </div>

        <div className="exp-cats__grid">
          {species.map((s) => (
            <Link key={s.id} to={localizedPath(`/marine-life/species/${s.slug}`)} className="exp-cat-card">
              <div className="exp-cat-card__media">
                <img src={s.heroImage} alt={s.commonName} className="exp-cat-card__img" loading="lazy" />
                <div className="exp-cat-card__overlay" />
              </div>

              <div className="exp-cat-card__body">
                <h3 className="exp-cat-card__title">{s.commonName}</h3>
                <p className="exp-cat-card__tagline">{s.tagline}</p>

                <span className="exp-cat-card__cta">
                  <span>{t('tourism.marineLife.ctaDiscover')}</span>
                  <ArrowRight size={14} className="exp-cat-card__arrow" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to={localizedPath('/marine-life')} className="btn btn-primary btn-lg">
            <span>{t('tourism.marineLife.ctaExploreLibrary')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
