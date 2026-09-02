import { Link } from 'react-router-dom';
import { ArrowRight, Fish } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function TourismClosingCTA() {
  return (
    <section className="explore-cta-section section" aria-label="The ocean is a story worth protecting">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <h2 className="explore-cta-heading display-heading">
              The ocean is more than a destination. <br />
              It is a story worth protecting.
            </h2>

            <div className="explore-cta-buttons">
              <Link to="/explore-the-coast" className="btn btn-primary btn-lg">
                <span>Explore Somalia's Coast</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/marine-life" className="btn btn-outline btn-lg">
                <Fish size={18} />
                <span>Discover Marine Life</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
