import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Fish, FlaskConical } from 'lucide-react';
import './ExploreCTA.css';

export default function ExploreCTA() {
  return (
    <section className="explore-cta-section section" aria-label="Explore Next Steps">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />
          
          <div className="explore-cta-content">
            <span className="label-text">Next Horizons</span>
            
            <h2 className="explore-cta-heading display-heading">
              The coast is waiting
              <br />
              to be explored.
            </h2>

            <p className="explore-cta-subtext">
              From the deep pelagic corridors off Bosaso to the intact coral gardens of the Bajuni Archipelago,
              explore our living marine library or dive into active research initiatives.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/marine-life" className="btn btn-primary btn-lg" id="cta-marine-life">
                <Fish size={18} />
                <span>Explore Marine Life</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/research" className="btn btn-outline btn-lg" id="cta-discover-research">
                <FlaskConical size={18} />
                <span>Discover Research</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
