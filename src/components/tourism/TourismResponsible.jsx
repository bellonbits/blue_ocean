import { Fish, Users, Trash2, Compass, Shield, Anchor, Footprints } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchIntro.css';

const topicDefs = [
  { icon: Fish, key: 'protectWildlife' },
  { icon: Users, key: 'respectCommunities' },
  { icon: Trash2, key: 'reducePlastic' },
  { icon: Compass, key: 'followGuidance' },
  { icon: Shield, key: 'protectCoral' },
  { icon: Anchor, key: 'supportFishing' },
  { icon: Footprints, key: 'leaveNoTrace' },
];

export default function TourismResponsible() {
  const { t } = useLanguage();

  return (
    <section className="research-intro section" aria-labelledby="tourism-responsible-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">{t('tourism.responsible.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-responsible-heading">
            {t('tourism.responsible.heading')}
          </h2>
        </div>

        <div className="research-intro__grid reveal">
          {topicDefs.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{t(`tourism.responsible.topics.${topic.key}.title`)}</h3>
                <p className="research-intro__card-text">{t(`tourism.responsible.topics.${topic.key}.text`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
