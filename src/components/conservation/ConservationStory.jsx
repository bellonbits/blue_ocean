import '../experiences/ExperienceStory.css';

export default function ConservationStory({ project }) {
  return (
    <section className="exp-story-section section" aria-label="Project Story">
      <div className="container">
        <div className="exp-story-layout">
          <div className="exp-story-narrative reveal">
            <span className="label-text">Project Story</span>
            <div className="divider" />

            <h2 className="exp-story-headline section-heading">
              Healthy coastlines begin with healthy ecosystems.
            </h2>

            <div className="exp-story-paragraphs">
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">What this project is</h3>
                <p className="exp-story-p">{project.whatItIs}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Why it matters</h3>
                <p className="exp-story-p">{project.whyItMatters}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">Who is involved</h3>
                <p className="exp-story-p">{project.whoIsInvolved}</p>
              </div>
              <div className="exp-story-block">
                <h3 className="exp-story-block-title">What it aims to achieve</h3>
                <p className="exp-story-p">{project.aims}</p>
              </div>
            </div>
          </div>

          <aside className="exp-story-panel glass reveal reveal-delay-2" aria-label="Project Information">
            <div className="exp-story-panel__header">
              <h3 className="exp-story-panel__title">Project Information</h3>
              <span className="badge badge-conservation">{project.status}</span>
            </div>

            <div className="exp-story-panel__rows">
              <div className="exp-story-row">
                <span className="exp-story-row__label">FOCUS AREA</span>
                <span className="exp-story-row__value">{project.focusAreaName}</span>
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
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
