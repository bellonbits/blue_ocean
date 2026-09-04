import { getConservationImpact } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import '../research/ResearchDataStats.css';

export default function ConservationImpact() {
  const impact = getConservationImpact();
  const { t } = useLanguage();

  const cards = [
    { value: impact.totalProjects, label: t('conservation.impact.statProjects') },
    { value: impact.activeProjects, label: t('conservation.impact.statActive') },
    { value: impact.locations, label: t('conservation.impact.statLocations') },
    { value: impact.speciesProtected, label: t('conservation.impact.statSpecies') },
    { value: impact.communitiesInvolved, label: t('conservation.impact.statCommunities') },
    { value: impact.focusAreas, label: t('conservation.impact.statFocusAreas') },
  ];

  return (
    <section className="research-data section" aria-labelledby="conservation-impact-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>{t('conservation.impact.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="conservation-impact-heading">
            {t('conservation.impact.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('conservation.impact.subheading')}
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
