import { Link } from 'react-router-dom';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import '../experiences/ExperienceLocations.css';

export default function ResearchLocation({ project }) {
  if (!project.destinations || project.destinations.length === 0) return null;

  return (
    <section className="exp-locations-sec section" aria-labelledby="research-loc-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">RESEARCH LOCATIONS</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-loc-heading">
            Where this project takes place
          </h2>
          <p className="section-subheading">
            {project.title} connects to these destinations in the Blue Ocean coastal directory.
          </p>
        </div>

        <div className="exp-locations-layout">
          <div className="exp-locations-intro reveal">
            <div className="exp-locations-card">
              <div className="exp-locations-card-icon">
                <Compass size={24} />
              </div>
              <h3 className="exp-locations-card-title">Geographic Scope</h3>
              <p className="exp-locations-card-desc">{project.geographicScope}</p>
            </div>
          </div>

          <div className="exp-locations-dest reveal">
            <div className="exp-locations-dest-header">
              <div className="exp-locations-dest-title-wrap">
                <MapPin size={18} className="exp-locations-dest-pin" />
                <h3 className="exp-locations-dest-title">Field Sites</h3>
              </div>
              <span className="exp-locations-dest-count">
                {project.destinations.length} Connected {project.destinations.length === 1 ? 'Destination' : 'Destinations'}
              </span>
            </div>

            <div className="exp-locations-dest-grid">
              {project.destinations.map((dest) => (
                <Link key={dest.slug} to={`/explore-the-coast/${dest.slug}`} className="exp-locations-dest-card">
                  <div className="exp-locations-dest-card-content">
                    <span className="exp-locations-dest-region">{dest.region}</span>
                    <h4 className="exp-locations-dest-name">{dest.name}</h4>
                    <span className="exp-locations-dest-link-text">
                      <span>Explore This Coast</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
