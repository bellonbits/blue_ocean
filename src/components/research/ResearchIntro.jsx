import { HelpCircle, Waves, MapPin, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './ResearchIntro.css';

const points = [
  { icon: HelpCircle, key: 'whatWeResearch' },
  { icon: Waves, key: 'whyItMatters' },
  { icon: MapPin, key: 'whereResearchHappens' },
  { icon: ShieldCheck, key: 'howItDrivesConservation' },
  { icon: Users, key: 'howItConnectsToCommunities' },
];

export default function ResearchIntro() {
  const { t } = useLanguage();

  return (
    <section className="research-intro section" aria-labelledby="research-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">{t('research.intro.eyebrow')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-intro-heading">
            {t('research.intro.heading')}
          </h2>
        </div>

        <div className="research-intro__grid reveal">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{t(`research.intro.points.${p.key}.title`)}</h3>
                <p className="research-intro__card-text">{t(`research.intro.points.${p.key}.text`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
