import { Link } from 'react-router-dom';
import { MapPin, Compass, Waves, ArrowRight, Anchor } from 'lucide-react';
import './HabitatSection.css';

export default function HabitatSection({ species }) {
  return (
    <section className="habitat-sec section" aria-labelledby="habitat-sec-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">GEOGRAPHIC DISTRIBUTION</span>
          <div className="divider" />
          <h2 className="section-heading" id="habitat-sec-heading">
            Where it lives
          </h2>
          <p className="section-subheading">
            Ecological corridors, depth zones, and connected Somali coastal regions where {species.commonName} populations are actively documented.
          </p>
        </div>

        <div className="habitat-sec__layout">
          {/* Left: Habitat Details & Metrics */}
          <div className="habitat-sec__details reveal">
            <div className="habitat-sec__card">
              <div className="habitat-sec__card-icon">
                <Waves size={24} />
              </div>
              <h3 className="habitat-sec__card-title">Primary Ecosystem & Depth</h3>
              <p className="habitat-sec__card-desc">
                Occupies <strong>{species.habitat}</strong> ecosystems at verified depth zones ranging from <strong>{species.depth}</strong>.
              </p>
            </div>

            <div className="habitat-sec__card">
              <div className="habitat-sec__card-icon">
                <Compass size={24} />
              </div>
              <h3 className="habitat-sec__card-title">Maritime Corridor Range</h3>
              <p className="habitat-sec__card-desc">
                {species.distribution || 'Distributed along the 3,025 km Somali coastline across the Gulf of Aden and the Indian Ocean pelagic basin.'}
              </p>
            </div>
          </div>

          {/* Right: Connected Destinations from Sprint 2 */}
          <div className="habitat-sec__destinations reveal">
            <div className="habitat-sec__dest-header">
              <div className="habitat-sec__dest-title-wrap">
                <MapPin size={18} className="habitat-sec__dest-pin" />
                <h3 className="habitat-sec__dest-title">Key Observation Hotspots</h3>
              </div>
              <span className="habitat-sec__dest-count">
                {species.destinations?.length || 0} Coastal Destinations
              </span>
            </div>

            <p className="habitat-sec__dest-intro">
              Explore coastal regions mapped in the Blue Ocean destination directory where this species is regularly surveyed:
            </p>

            <div className="habitat-sec__dest-grid">
              {species.destinations && species.destinations.length > 0 ? (
                species.destinations.map((dest) => (
                  <Link
                    key={dest.slug}
                    to={`/explore-the-coast/${dest.slug}`}
                    className="habitat-sec__dest-card"
                  >
                    <div className="habitat-sec__dest-card-content">
                      <span className="habitat-sec__dest-region">{dest.region}</span>
                      <h4 className="habitat-sec__dest-name">{dest.name}</h4>
                      <span className="habitat-sec__dest-link-text">
                        <span>Explore Coast</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="habitat-sec__dest-empty">
                  <span>Observation data mapped across general Somali territorial waters.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
