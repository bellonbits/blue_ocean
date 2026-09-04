import { Link } from 'react-router-dom';
import { Compass, BookOpen, Heart, Handshake, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchIntro.css';

const pathDefs = [
  { icon: Compass, key: 'visit', to: '/explore-the-coast' },
  { icon: BookOpen, key: 'learn', to: '/marine-life' },
  { icon: Heart, key: 'support', to: '/get-involved/support' },
  { icon: Handshake, key: 'partner', to: '/get-involved/partner' },
];

export default function TourismGetInvolved() {
  const { language, t } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="research-intro section" aria-labelledby="tourism-get-involved-heading">
      <div className="container">
        <div className="research-intro__header reveal">
          <span className="label-text">{t('tourism.getInvolved.label')}</span>
          <div className="divider" />
          <h2 className="section-heading" id="tourism-get-involved-heading">
            {t('tourism.getInvolved.heading')}
          </h2>
        </div>

        <div className="research-intro__grid reveal" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {pathDefs.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link
                key={i}
                to={localizedPath(p.to)}
                className="research-intro__card"
                style={{ textDecoration: 'none' }}
              >
                <div className="research-intro__icon">
                  <Icon size={22} />
                </div>
                <h3 className="research-intro__card-title">{t(`tourism.getInvolved.paths.${p.key}.title`)}</h3>
                <p className="research-intro__card-text">{t(`tourism.getInvolved.paths.${p.key}.text`)}</p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: 'var(--space-3)',
                    color: 'var(--color-turquoise)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
