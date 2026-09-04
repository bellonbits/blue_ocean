import { Link } from 'react-router-dom';
import { ArrowRight, HandHeart, Handshake, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceCategories.css';

const pathways = [
  {
    id: 'volunteer',
    titleKey: 'volunteerTitle',
    taglineKey: 'volunteerTagline',
    ctaKey: 'volunteerCta',
    path: '/get-involved/volunteer',
    image: '/con_youth_education.jpg',
    icon: HandHeart,
  },
  {
    id: 'partner',
    titleKey: 'partnerTitle',
    taglineKey: 'partnerTagline',
    ctaKey: 'partnerCta',
    path: '/get-involved/partner',
    image: '/exp_dhow_sailing.jpg',
    icon: Handshake,
  },
  {
    id: 'support',
    titleKey: 'supportTitle',
    taglineKey: 'supportTagline',
    ctaKey: 'supportCta',
    path: '/get-involved/support',
    image: '/con_beach_cleanup.jpg',
    icon: HeartHandshake,
  },
];

export default function GetInvolvedCTA() {
  const { language, t } = useLanguage();

  return (
    <section className="exp-cats section" aria-labelledby="get-involved-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('common.getInvolvedCta.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="get-involved-heading">
            {t('common.getInvolvedCta.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('common.getInvolvedCta.subtext')}
          </p>
        </div>

        <div className="exp-cats__grid">
          {pathways.map((p) => {
            const Icon = p.icon;
            const title = t(`common.getInvolvedCta.${p.titleKey}`);
            return (
              <Link key={p.id} to={`/${language}${p.path}`} className="exp-cat-card">
                <div className="exp-cat-card__media">
                  <img src={p.image} alt={title} className="exp-cat-card__img" loading="lazy" />
                  <div className="exp-cat-card__overlay" />
                  <div className="exp-cat-card__icon">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="exp-cat-card__body">
                  <h3 className="exp-cat-card__title">{title}</h3>
                  <p className="exp-cat-card__tagline">{t(`common.getInvolvedCta.${p.taglineKey}`)}</p>

                  <span className="exp-cat-card__cta">
                    <span>{t(`common.getInvolvedCta.${p.ctaKey}`)}</span>
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
