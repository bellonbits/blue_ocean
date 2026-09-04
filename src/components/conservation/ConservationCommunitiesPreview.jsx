import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function ConservationCommunitiesPreview() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="Conservation and Communities">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('conservation.communitiesPreview.label')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('conservation.communitiesPreview.headingLine1')}
              <br />
              {t('conservation.communitiesPreview.headingLine2')}
            </h2>

            <p className="explore-cta-subtext">
              {t('conservation.communitiesPreview.subtext')}
            </p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/communities')} className="btn btn-primary btn-lg" id="cta-coastal-communities">
                <Users size={18} />
                <span>{t('conservation.communitiesPreview.cta')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
