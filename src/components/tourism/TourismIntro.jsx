import { Compass, BookOpen, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchIntro.css';

const pointDefs = [
  { icon: Compass, key: 'explore' },
  { icon: BookOpen, key: 'learn' },
  { icon: Shield, key: 'protect' },
];

export default function TourismIntro() {
  const { t } = useLanguage();

  return (
    <section className="research-intro section" aria-labelledby="tourism-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">{t('tourism.intro.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-intro-heading">
            {t('tourism.intro.heading')}
          </h2>
          <p className="section-subheading">{t('tourism.intro.subheading')}</p>
        </div>

        <div className="research-intro__grid reveal" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {pointDefs.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{t(`tourism.intro.points.${p.key}.title`)}</h3>
                <p className="research-intro__card-text">{t(`tourism.intro.points.${p.key}.text`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
