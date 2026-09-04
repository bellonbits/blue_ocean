import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function TourismFutureExperience() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="Plan Your Future Experience">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('tourism.futureExperience.label')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('tourism.futureExperience.heading')} <br />
              {t('tourism.futureExperience.headingAccent')}
            </h2>

            <p className="explore-cta-subtext">{t('tourism.futureExperience.subtext')}</p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/experiences')} className="btn btn-primary btn-lg">
                <Sparkles size={18} />
                <span>{t('tourism.futureExperience.ctaExplore')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
