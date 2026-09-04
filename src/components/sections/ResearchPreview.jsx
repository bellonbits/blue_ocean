import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { getResearchAreas } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import './ResearchPreview.css';

export default function ResearchPreview() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const researchAreas = getResearchAreas(language);

  return (
    <section className="research-section section" aria-labelledby="research-heading">
      {/* Background decorations */}
      <div className="research-section__deco" aria-hidden="true">
        <div className="research-section__deco-orb research-section__deco-orb--1" />
        <div className="research-section__deco-orb research-section__deco-orb--2" />
      </div>

      <div className="container">
        <div className="research-section__layout">
          {/* Left: Header */}
          <div className="research-section__header reveal">
            <span className="label-text">{t('researchPreview.eyebrow')}</span>
            <div className="divider" />
            <h2 className="section-heading" id="research-heading">
              {t('researchPreview.heading')}
            </h2>
            <p className="section-subheading">
              {t('researchPreview.subheading')}
            </p>

            <Link to={localizedPath('/research')} className="btn btn-primary research-section__btn" id="research-explore-all">
              {t('researchPreview.cta')}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Research Areas Cards with Images */}
          <div className="research-section__areas">
            {researchAreas.map((area, i) => (
              <Link
                to={localizedPath(`/research/projects?area=${area.id}`)}
                key={area.id}
                className={`research-card reveal reveal-delay-${(i % 4) + 1}`}
                style={{
                  '--area-bg': area.color,
                  '--area-border': area.borderColor,
                  '--area-text': area.textColor,
                }}
              >
                {/* Image container */}
                <div className="research-card__image-wrap">
                  <img
                    src={area.image}
                    alt={`${area.title} research`}
                    className="research-card__img"
                    loading="lazy"
                  />
                  <div className="research-card__img-overlay" aria-hidden="true" />
                  <span className="research-card__tag" style={{ color: area.textColor, borderColor: area.borderColor, background: area.color }}>
                    {area.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="research-card__content">
                  <h3 className="research-card__title">{area.title}</h3>
                  <p className="research-card__desc">{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
