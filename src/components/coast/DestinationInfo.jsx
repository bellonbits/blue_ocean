import { useState } from 'react';
import { MapPin, Compass, Waves, Calendar, Plane, CheckCircle2, Camera, Globe2 } from 'lucide-react';
import { GOOGLE_MAPS_API_KEY } from '../../lib/googleMaps';
import StreetViewPanel from './StreetViewPanel';
import './DestinationInfo.css';

export default function DestinationInfo({ destination }) {
  // Split full description into paragraphs
  const paragraphs = (destination.fullDescription || destination.shortDescription || '').split('\n\n').filter(Boolean);
  const hasCoordinates = destination.coordinates?.lat != null && destination.coordinates?.lng != null;
  const [mapMode, setMapMode] = useState(null); // null | 'map' | 'streetview'

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

              {hasCoordinates && (
                <div className="dest-info-row">
                  <span className="dest-info-row__label">MAP LOCATION</span>
                  <div className="dest-info-row__map-toggles">
                    <button
                      type="button"
                      className={`dest-info-row__map-toggle ${mapMode === 'map' ? 'dest-info-row__map-toggle--active' : ''}`}
                      onClick={() => setMapMode((m) => (m === 'map' ? null : 'map'))}
                      aria-expanded={mapMode === 'map'}
                    >
                      <MapPin size={14} />
                      <span>View on map</span>
                    </button>
                    <button
                      type="button"
                      className={`dest-info-row__map-toggle ${mapMode === 'streetview' ? 'dest-info-row__map-toggle--active' : ''}`}
                      onClick={() => setMapMode((m) => (m === 'streetview' ? null : 'streetview'))}
                      aria-expanded={mapMode === 'streetview'}
                    >
                      <Camera size={14} />
                      <span>Street View</span>
                    </button>
                    <a
                      className="dest-info-row__map-toggle"
                      href={`https://earth.google.com/web/@${destination.coordinates.lat},${destination.coordinates.lng},0a,3000d,35y,0h,0t,0r`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe2 size={14} />
                      <span>Google Earth</span>
                    </a>
                  </div>
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

            {hasCoordinates && mapMode === 'map' && (
              <div className="dest-info-panel__map">
                <iframe
                  title={`Map showing ${destination.name}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${destination.coordinates.lat},${destination.coordinates.lng}&zoom=12`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {hasCoordinates && mapMode === 'streetview' && (
              <div className="dest-info-panel__map">
                <StreetViewPanel coordinates={destination.coordinates} name={destination.name} />
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
