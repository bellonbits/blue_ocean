import { Link } from 'react-router-dom';
import { ArrowRight, Fish } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function TourismClosingCTA() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="The ocean is a story worth protecting">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <h2 className="explore-cta-heading display-heading">
              {t('tourism.closingCta.heading')} <br />
              {t('tourism.closingCta.headingAccent')}
            </h2>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/explore-the-coast')} className="btn btn-primary btn-lg">
                <span>{t('tourism.closingCta.ctaExploreCoast')}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to={localizedPath('/marine-life')} className="btn btn-outline btn-lg">
                <Fish size={18} />
                <span>{t('tourism.closingCta.ctaDiscoverMarineLife')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
