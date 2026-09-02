import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function TourismConservationStory() {
  return (
    <section className="explore-cta-section section" aria-label="Tourism and Conservation">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">Tourism & Conservation</span>

            <h2 className="explore-cta-heading display-heading">
              Tourism can help protect <br />
              what it brings people to discover.
            </h2>

            <p className="explore-cta-subtext">
              Responsible marine tourism can contribute to conservation awareness, marine research, local
              livelihoods, community participation, and the protection of the coastal ecosystems it depends on.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/conservation" className="btn btn-primary btn-lg">
                <Shield size={18} />
                <span>Our Conservation Work</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
