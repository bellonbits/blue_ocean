import { CONSERVATION_APPROACH_STEPS } from '../../data/conservation';
import '../research/ResearchObjectives.css';

export default function ConservationApproach() {
  return (
    <section className="research-obj section" aria-labelledby="conservation-approach-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">OUR METHOD</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-approach-heading">
            Turning knowledge into action.
          </h2>
        </div>

        <div className="research-obj__list reveal">
          {CONSERVATION_APPROACH_STEPS.map((s) => (
            <div key={s.step} className="research-obj__item">
              <span className="research-obj__num">{s.step}</span>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 4px' }}>
                  {s.title}
                </h3>
                <p className="research-obj__text">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
