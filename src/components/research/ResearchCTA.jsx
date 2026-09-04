import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, FolderOpen, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../coast/ExploreCTA.css';

export default function ResearchCTA() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="explore-cta-section section" aria-label="From Knowledge to Action">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">{t('research.cta.eyebrow')}</span>

            <h2 className="explore-cta-heading display-heading">
              {t('research.cta.headingLine1')}
              <br />
              {t('research.cta.headingLine2')}
            </h2>

            <p className="explore-cta-subtext">
              {t('research.cta.subtext')}
            </p>

            <div className="explore-cta-buttons">
              <Link to={localizedPath('/conservation')} className="btn btn-primary btn-lg" id="cta-explore-conservation">
                <Leaf size={18} />
                <span>{t('research.cta.ctaConservation')}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to={localizedPath('/research/projects')} className="btn btn-outline btn-lg" id="cta-all-projects">
                <FolderOpen size={18} />
                <span>{t('research.cta.ctaAllProjects')}</span>
              </Link>
              <Link to={localizedPath('/research/statistics')} className="btn btn-outline btn-lg" id="cta-coastal-statistics">
                <BarChart3 size={18} />
                <span>{t('research.cta.ctaStatistics')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
