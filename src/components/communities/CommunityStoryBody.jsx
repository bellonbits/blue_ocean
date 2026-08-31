import '../experiences/ExperienceStory.css';

export default function CommunityStoryBody({ story, community }) {
  return (
    <section className="exp-story-section section" aria-label="Community Story">
      <div className="container">
        <div className="exp-story-layout">
          <div className="exp-story-narrative reveal">
            <span className="label-text">Their Story</span>
            <div className="divider" />

            <h2 className="exp-story-headline section-heading">
              Voices from the Somali coast.
            </h2>

            <div className="exp-story-paragraphs">
              {story.storyContent.map((paragraph, i) => (
                <p key={i} className="exp-story-p" style={{ marginBottom: 'var(--space-4)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {community && (
            <aside className="exp-story-panel glass reveal reveal-delay-2" aria-label="Community Profile">
              <div className="exp-story-panel__header">
                <h3 className="exp-story-panel__title">Community Profile</h3>
              </div>

              <div className="exp-story-panel__rows">
                <div className="exp-story-row">
                  <span className="exp-story-row__label">COMMUNITY</span>
                  <span className="exp-story-row__value">{community.name}</span>
                </div>
                <div className="exp-story-row">
                  <span className="exp-story-row__label">LOCATION</span>
                  <span className="exp-story-row__value">{community.location}</span>
                </div>
                <div className="exp-story-row">
                  <span className="exp-story-row__label">REGION</span>
                  <span className="exp-story-row__value">{community.region}</span>
                </div>
                <div className="exp-story-row">
                  <span className="exp-story-row__label">MARINE CONNECTION</span>
                  <span className="exp-story-row__value" style={{ fontWeight: 400, lineHeight: 1.5 }}>
                    {community.marineConnection}
                  </span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
