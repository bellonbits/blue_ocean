import { Target, Eye } from 'lucide-react';
import { getOrganization } from '../../data/organization';
import { useLanguage } from '../../context/LanguageContext';
import './MissionVision.css';

export default function MissionVision() {
  const { language, t } = useLanguage();
  const { mission, vision } = getOrganization(language);

  return (
    <section className="mission-vision section" aria-labelledby="mission-vision-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('about.missionVision.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="mission-vision-heading">
            {t('about.missionVision.heading')}
          </h2>
        </div>

        <div className="mission-vision__grid reveal">
          <div className="mission-vision__card">
            <div className="mission-vision__icon">
              <Target size={24} />
            </div>
            <span className="mission-vision__label">{t('about.missionVision.missionLabel')}</span>
            <h3 className="mission-vision__statement">{mission.statement}</h3>
            <p className="mission-vision__desc">{mission.description}</p>
          </div>

          <div className="mission-vision__card">
            <div className="mission-vision__icon">
              <Eye size={24} />
            </div>
            <span className="mission-vision__label">{t('about.missionVision.visionLabel')}</span>
            <h3 className="mission-vision__statement">{vision.statement}</h3>
            <p className="mission-vision__desc">{vision.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
