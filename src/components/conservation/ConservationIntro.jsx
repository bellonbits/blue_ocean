import { Fish, Shield, Anchor, Trash2, GraduationCap, Users, Microscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchIntro.css';

const ICONS = [Fish, Shield, Anchor, Trash2, GraduationCap, Users, Microscope];

export default function ConservationIntro() {
  const { t } = useLanguage();
  const points = t('conservation.intro.points');

  return (
    <section className="research-intro section" aria-labelledby="conservation-intro-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">{t('conservation.intro.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-intro-heading">
            {t('conservation.intro.heading')}
          </h2>
        </div>

        <div className="research-intro__grid reveal">
          {points.map((p, i) => {
            const Icon = ICONS[i] || Shield;
            return (
              <div key={i} className="research-intro__card">
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{p.title}</h3>
                <p className="research-intro__card-text">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
