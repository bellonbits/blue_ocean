import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Fish, FlaskConical } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './ExploreCTA.css';

export default function ExploreCTA() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="Explore Next Steps">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('common.exploreCta.eyebrow')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('common.exploreCta.heading')}
              <br />
              {t('common.exploreCta.headingAccent')}
            </h2>

            <p className="explore-cta-subtext">
              {t('common.exploreCta.subtext')}
            </p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/marine-life')} className="btn btn-primary btn-lg" id="cta-marine-life">
                <Fish size={18} />
                <span>{t('common.exploreCta.ctaMarineLife')}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to={localizedPath('/research')} className="btn btn-outline btn-lg" id="cta-discover-research">
                <FlaskConical size={18} />
                <span>{t('common.exploreCta.ctaResearch')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
