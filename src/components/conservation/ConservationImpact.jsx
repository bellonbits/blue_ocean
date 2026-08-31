import { getConservationImpact } from '../../data/conservation';
import '../research/ResearchDataStats.css';

export default function ConservationImpact() {
  const impact = getConservationImpact();

  const cards = [
    { value: impact.totalProjects, label: 'Conservation Projects' },
    { value: impact.activeProjects, label: 'Active Initiatives' },
    { value: impact.locations, label: 'Locations' },
    { value: impact.speciesProtected, label: 'Species Protected' },
    { value: impact.communitiesInvolved, label: 'Communities Involved' },
    { value: impact.focusAreas, label: 'Focus Areas' },
  ];

  return (
    <section className="research-data section" aria-labelledby="conservation-impact-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text" style={{ color: '#02CCFE' }}>OUR IMPACT</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="conservation-impact-heading">
            The scale of the work
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Figures computed directly from Blue Ocean's published conservation projects — not estimates.
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
