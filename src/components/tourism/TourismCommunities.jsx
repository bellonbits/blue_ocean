import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function TourismCommunities() {
  return (
    <section className="explore-cta-section section" aria-label="Coastal Communities">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">Coastal Communities</span>

            <h2 className="explore-cta-heading display-heading">
              Meet the communities <br />
              of the coast.
            </h2>

            <p className="explore-cta-subtext">
              Tourism doesn't happen <em>to</em> coastal communities — fishermen, local guides, traditional
              knowledge, coastal culture, and sustainable livelihoods are part of the experience itself.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/communities" className="btn btn-primary btn-lg">
                <Users size={18} />
                <span>Explore Coastal Communities</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
