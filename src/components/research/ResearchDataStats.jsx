import { getResearchStats } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import './ResearchDataStats.css';

export default function ResearchDataStats() {
  const stats = getResearchStats();
  const { t } = useLanguage();

  const cards = [
    { value: stats.speciesObserved, label: t('research.stats.labels.speciesStudied') },
    { value: stats.researchSites, label: t('research.stats.labels.researchSites') },
    { value: stats.totalProjects, label: t('research.stats.labels.researchProjects') },
    { value: stats.activeProjects, label: t('research.stats.labels.activeStudies') },
  ];

  return (
    <section className="research-data section" aria-labelledby="research-data-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>{t('research.stats.eyebrow')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="research-data-heading">
            {t('research.stats.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('research.stats.subheading')}
          </p>
        </div>

        <div className="research-data__grid reveal">
          {cards.map((c, i) => (
            <div key={i} className="research-data__card">
              <span className="research-data__value">{c.value}</span>
              <span className="research-data__label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
