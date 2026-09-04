import { Link } from 'react-router-dom';
import { ArrowRight, Ship, Wind, Waves, Fish, Globe, Anchor, Camera, Mountain } from 'lucide-react';
import { getExperienceCategories, getExperiencesByCategory } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';
import './ExperienceCategories.css';

const ICONS = { Ship, Wind, Waves, Fish, Globe, Anchor, Camera, Mountain };

export default function ExperienceCategories() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const experienceCategories = getExperienceCategories(language);

  return (
    <section className="exp-cats section" aria-labelledby="exp-cats-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('oceanExperiences.categories.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="exp-cats-heading">
            {t('oceanExperiences.categories.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('oceanExperiences.categories.subheading')}
          </p>
        </div>

        <div className="exp-cats__grid">
          {experienceCategories.map((cat) => {
            const Icon = ICONS[cat.icon] || Waves;
            const count = getExperiencesByCategory(cat.id, language).length;

            return (
              <Link
                key={cat.id}
                to={localizedPath(`/experiences?category=${cat.id}#experiences-grid`)}
                className="exp-cat-card"
              >
                <div className="exp-cat-card__media">
                  <img src={cat.image} alt={cat.title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">
                    {count} {count === 1
                      ? t('oceanExperiences.categories.experienceCountSingular')
                      : t('oceanExperiences.categories.experienceCountPlural')}
                  </span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{cat.title}</h3>
                  <p className="exp-cat-card__tagline">{cat.tagline}</p>

                  <span className="exp-cat-card__cta">
                    <span>{t('oceanExperiences.categories.exploreCta')}</span>
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
