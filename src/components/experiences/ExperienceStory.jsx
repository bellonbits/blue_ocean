import { CheckCircle2 } from 'lucide-react';
import './ExperienceStory.css';

export default function ExperienceStory({ experience }) {
  const { story } = experience;

  return (
    <section className="exp-story-section section" aria-label="Experience Overview">
      <div className="container">
        <div className="exp-story-layout">
          {/* Left: Narrative */}
          <div className="exp-story-narrative reveal">
            <span className="label-text">See another side of Somalia's coast</span>
            <div className="divider" />

            <h2 className="exp-story-headline section-heading">
              {experience.shortDescription}
            </h2>

            <div className="exp-story-paragraphs">
              {story?.whatItIs && (
                <div className="exp-story-block">
                  <h3 className="exp-story-block-title">What it is</h3>
                  <p className="exp-story-p">{story.whatItIs}</p>
                </div>
              )}
              {story?.whereItHappens && (
                <div className="exp-story-block">
                  <h3 className="exp-story-block-title">Where it happens</h3>
                  <p className="exp-story-p">{story.whereItHappens}</p>
                </div>
              )}
              {story?.whatToExpect && (
                <div className="exp-story-block">
                  <h3 className="exp-story-block-title">What to expect</h3>
                  <p className="exp-story-p">{story.whatToExpect}</p>
                </div>
              )}
            </div>

            {experience.highlights && experience.highlights.length > 0 && (
              <div className="exp-story-highlights">
                <h3 className="exp-story-highlights-title">Experience Highlights</h3>
                <ul className="exp-story-highlights-list">
                  {experience.highlights.map((h, i) => (
                    <li key={i} className="exp-story-highlight-item">
                      <CheckCircle2 size={16} className="exp-story-highlight-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Quick Facts Panel */}
          <aside className="exp-story-panel glass reveal reveal-delay-2" aria-label="Experience Quick Facts">
            <div className="exp-story-panel__header">
              <h3 className="exp-story-panel__title">Field Details</h3>
              <span className="badge badge-coming-soon">Coming Soon</span>
            </div>

            <div className="exp-story-panel__rows">
              <div className="exp-story-row">
                <span className="exp-story-row__label">CATEGORY</span>
                <span className="exp-story-row__value">{experience.categoryName}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">REGION</span>
                <span className="exp-story-row__value">{experience.region}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">LOCATION</span>
                <span className="exp-story-row__value">{experience.location}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">DURATION</span>
                <span className="exp-story-row__value">{experience.duration}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">EXPERIENCE LEVEL</span>
                <span className="exp-story-row__value">{experience.difficulty}</span>
              </div>
              <div className="exp-story-row">
                <span className="exp-story-row__label">BEST SEASON</span>
                <span className="exp-story-row__value">{experience.bestSeason}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
