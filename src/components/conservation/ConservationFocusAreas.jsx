import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Shield, Anchor, Trash2, Waves, GraduationCap, Users, AlertTriangle } from 'lucide-react';
import { getConservationFocusAreas, getFocusAreaProjectCount } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

const ICONS = {
  'marine-wildlife': Fish,
  'illegal-fishing': AlertTriangle,
  'coral-habitat': Shield,
  'sustainable-fishing': Anchor,
  'ocean-pollution': Trash2,
  'beach-cleanup': Waves,
  'marine-education': GraduationCap,
  'community-conservation': Users,
};

// Illegal Fishing is the one focus area with its own dedicated landing
// page (richer editorial content — what Blue Ocean is actually doing
// about it — rather than just a filtered project list like every other
// area). Every other card still routes to the generic filtered view.
const CUSTOM_LINKS = {
  'illegal-fishing': '/conservation/illegal-fishing',
};

export default function ConservationFocusAreas() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const focusAreas = getConservationFocusAreas(language);

  return (
    <section className="exp-cats section" id="conservation-focus" aria-labelledby="conservation-focus-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('conservation.focusAreas.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="conservation-focus-heading">
            {t('conservation.focusAreas.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('conservation.focusAreas.subheading')}
          </p>
        </div>

        <div className="exp-cats__grid">
          {focusAreas.map((area) => {
            const Icon = ICONS[area.id] || Shield;
            const count = getFocusAreaProjectCount(area.id);

            return (
              <Link
                key={area.id}
                to={localizedPath(CUSTOM_LINKS[area.id] || `/conservation/projects?area=${area.id}`)}
                className="exp-cat-card"
              >
                <div className="exp-cat-card__media">
                  <img src={area.image} alt={area.title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                  <span className="exp-cat-card__count">
                    {count} {count === 1 ? t('conservation.focusAreas.projectSingular') : t('conservation.focusAreas.projectPlural')}
                  </span>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{area.title}</h3>
                  <p className="exp-cat-card__tagline">{area.description}</p>

                  <span className="exp-cat-card__cta">
                    <span>{t('conservation.focusAreas.cta')}</span>
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
