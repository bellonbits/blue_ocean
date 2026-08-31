import { getResearchStats } from '../../data/research';
import './ResearchDataStats.css';

export default function ResearchDataStats() {
  const stats = getResearchStats();

  const cards = [
    { value: stats.speciesObserved, label: 'Species Studied' },
    { value: stats.researchSites, label: 'Research Sites' },
    { value: stats.totalProjects, label: 'Research Projects' },
    { value: stats.activeProjects, label: 'Active Studies' },
  ];

  return (
    <section className="research-data section" aria-labelledby="research-data-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>RESEARCH DATA</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="research-data-heading">
            The numbers behind the work
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Figures computed directly from Blue Ocean's published research records.
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
