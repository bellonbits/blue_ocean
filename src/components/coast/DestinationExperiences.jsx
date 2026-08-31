import { Link } from 'react-router-dom';
import { Compass, Ship, Waves, Camera, Anchor } from 'lucide-react';
import './DestinationExperiences.css';

export default function DestinationExperiences({ destination }) {
  const exps = destination.experiences || [];

  if (exps.length === 0) return null;

  return (
    <section className="dest-exp-section section" aria-labelledby="dest-exp-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">Field Activities</span>
          <div className="divider" />
          <h2 className="section-heading" id="dest-exp-heading">
            Ocean Experiences in {destination.name}
          </h2>
          <p className="section-subheading">
            Guided coastal explorations, marine surveys, and watersports currently planned or active along this coast.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="dest-exp-grid">
          {exps.map((exp, i) => (
            <div
              key={exp.id}
              className={`dest-exp-card reveal reveal-delay-${i + 1}`}
            >
              <div className="dest-exp-card__icon" aria-hidden="true">
                <Compass size={22} />
              </div>

              <div className="dest-exp-card__content">
                <div className="dest-exp-card__header">
                  <span className="badge badge-turquoise">{exp.category}</span>
                  {!exp.active && (
                    <span className="badge badge-coming-soon">Coming Soon</span>
                  )}
                </div>

                <h3 className="dest-exp-card__title">{exp.title}</h3>
                <span className="dest-exp-card__loc">{destination.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
