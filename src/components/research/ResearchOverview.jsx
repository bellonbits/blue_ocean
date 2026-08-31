import '../experiences/ExperienceStory.css';

export default function ResearchOverview({ project }) {
  return (
    <section className="exp-story-section section" aria-label="Project Overview">
      <div className="container">
        <div className="exp-story-layout">
          <div className="exp-story-narrative reveal">
            <span className="label-text">Project Overview</span>
            <div className="divider" />

            <h2 className="exp-story-headline section-heading">
              {project.editorialStatement}
            </h2>

            <div className="exp-story-paragraphs">
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Research Question</h3>
                <p className="exp-story-p">{project.researchQuestion}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Purpose</h3>
                <p className="exp-story-p">{project.purpose}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Geographic Scope</h3>
                <p className="exp-story-p">{project.geographicScope}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Expected Outcomes</h3>
                <p className="exp-story-p">{project.expectedOutcomes}</p>
              </div>
            </div>
          </div>

          <aside className="exp-story-panel glass reveal reveal-delay-2" aria-label="Project Information">
            <div className="exp-story-panel__header">
              <h3 className="exp-story-panel__title">Project Information</h3>
              <span className="badge badge-turquoise">{project.status}</span>
            </div>

            <div className="exp-story-panel__rows">
              <div className="exp-story-row">
                <span className="exp-story-row__label">RESEARCH AREA</span>
                <span className="exp-story-row__value">{project.areaName}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">LOCATION</span>
                <span className="exp-story-row__value">{project.region}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">STATUS</span>
                <span className="exp-story-row__value">{project.status}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">START DATE</span>
                <span className="exp-story-row__value">{project.startDate}{project.endDate ? ` – ${project.endDate}` : ''}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">RESEARCH TEAM</span>
                <span className="exp-story-row__value">{project.researchTeamName}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
