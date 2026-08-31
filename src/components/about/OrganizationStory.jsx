import { organization } from '../../data/organization';
import '../experiences/ExperienceStory.css';

export default function OrganizationStory() {
  const { story, whyOceanMatters, whoWeWorkWith } = organization;

  return (
    <section className="exp-story-section section" id="our-story" aria-label="Our Story">
      <div className="container">
        <div className="exp-story-layout">
          <div className="exp-story-narrative reveal">
            <span className="label-text">Our Story</span>
            <div className="divider" />

            <h2 className="exp-story-headline section-heading">
              {story.intro}
            </h2>

            <div className="exp-story-paragraphs">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="exp-story-p" style={{ marginBottom: 'var(--space-4)' }}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="exp-story-panel glass reveal reveal-delay-2" aria-label="Why the Ocean Matters">
            <div className="exp-story-panel__header">
              <h3 className="exp-story-panel__title">{whyOceanMatters.heading}</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
              {whyOceanMatters.text}
            </p>

            <div className="exp-story-panel__header" style={{ marginTop: 'var(--space-2)' }}>
              <h3 className="exp-story-panel__title">{whoWeWorkWith.heading}</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
              {whoWeWorkWith.text}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
