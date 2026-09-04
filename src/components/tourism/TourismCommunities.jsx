import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function TourismCommunities() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="Coastal Communities">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('tourism.communities.label')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('tourism.communities.heading')} <br />
              {t('tourism.communities.headingAccent')}
            </h2>

            <p className="explore-cta-subtext">
              {t('tourism.communities.subtextBefore')}
              <em>{t('tourism.communities.subtextEm')}</em>
              {t('tourism.communities.subtextAfter')}
            </p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/communities')} className="btn btn-primary btn-lg">
                <Users size={18} />
                <span>{t('tourism.communities.ctaExplore')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
