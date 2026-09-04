import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function TourismConservationStory() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="Tourism and Conservation">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('tourism.conservationStory.label')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('tourism.conservationStory.heading')} <br />
              {t('tourism.conservationStory.headingAccent')}
            </h2>

            <p className="explore-cta-subtext">{t('tourism.conservationStory.subtext')}</p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/conservation')} className="btn btn-primary btn-lg">
                <Shield size={18} />
                <span>{t('tourism.conservationStory.ctaConservationWork')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
