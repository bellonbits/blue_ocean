import { MapPin, Compass, Waves, Calendar, Plane, CheckCircle2 } from 'lucide-react';
import './DestinationInfo.css';

export default function DestinationInfo({ destination }) {
  // Split full description into paragraphs
  const paragraphs = (destination.fullDescription || destination.shortDescription || '').split('\n\n').filter(Boolean);

  return (
    <section className="dest-info-section section" aria-label="Destination Overview and Details">
      <div className="container">
        <div className="dest-info-layout">
          {/* Left: Editorial Narrative */}
          <div className="dest-info-narrative reveal">
            <span className="label-text">Destination Story</span>
            <div className="divider" />

            <h2 className="dest-info-headline section-heading">
              {destination.tagline}
            </h2>


            <div className="dest-info-paragraphs">
              {paragraphs.map((p, i) => (
                <p key={i} className="dest-info-p">
                  {p}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div className="dest-info-highlights">
                <h3 className="dest-info-highlights-title">Key Coastal Highlights</h3>
                <ul className="dest-info-highlights-list">
                  {destination.highlights.map((h, i) => (
                    <li key={i} className="dest-info-highlight-item">
                      <CheckCircle2 size={16} className="dest-info-highlight-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Technical Information Panel */}
          <aside className="dest-info-panel glass reveal reveal-delay-2" aria-label="Destination Quick Facts">
            <div className="dest-info-panel__header">
              <h3 className="dest-info-panel__title">Geographic Data</h3>
              <span className="badge badge-turquoise">Verified</span>
            </div>

            <div className="dest-info-panel__rows">
              <div className="dest-info-row">
                <span className="dest-info-row__label">REGION</span>
                <span className="dest-info-row__value">{destination.region}</span>
              </div>

              <div className="dest-info-row">
                <span className="dest-info-row__label">LOCATION</span>
                <span className="dest-info-row__value">{destination.location}</span>
              </div>

              <div className="dest-info-row">
                <span className="dest-info-row__label">COASTAL WATER</span>
                <span className="dest-info-row__value">{destination.coastlineArea}</span>
              </div>

              <div className="dest-info-row">
                <span className="dest-info-row__label">TYPE</span>
                <span className="dest-info-row__value">{destination.destinationType}</span>
              </div>

              {destination.coordinates?.lat != null && destination.coordinates?.lng != null && (
                <div className="dest-info-row">
                  <span className="dest-info-row__label">COORDINATES</span>
                  <span className="dest-info-row__value font-mono">
                    {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
                  </span>
                </div>
              )}

              <div className="dest-info-row">
                <span className="dest-info-row__label">OPTIMAL SEASON</span>
                <span className="dest-info-row__value">{destination.bestSeason}</span>
              </div>

              <div className="dest-info-row">
                <span className="dest-info-row__label">ACCESS ROUTE</span>
                <span className="dest-info-row__value">{destination.access}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
