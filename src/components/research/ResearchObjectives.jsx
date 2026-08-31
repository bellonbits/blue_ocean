import './ResearchObjectives.css';

export default function ResearchObjectives({ project }) {
  if (!project.objectives || project.objectives.length === 0) return null;

  return (
    <section className="research-obj section" aria-labelledby="research-obj-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">RESEARCH OBJECTIVES</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-obj-heading">
            What are we trying to understand?
          </h2>
        </div>

        <div className="research-obj__list reveal">
          {project.objectives.map((obj, i) => (
            <div key={i} className="research-obj__item">
              <span className="research-obj__num">{String(i + 1).padStart(2, '0')}</span>
              <p className="research-obj__text">{obj}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
