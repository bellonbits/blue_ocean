import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function TourismFutureExperience() {
  return (
    <section className="explore-cta-section section" aria-label="Plan Your Future Experience">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">What's Next</span>

            <h2 className="explore-cta-heading display-heading">
              Your next ocean experience <br />
              starts here.
            </h2>

            <p className="explore-cta-subtext">
              Discover destinations, explore marine life, and learn about the coast. Blue Ocean is building a
              growing network of responsible ocean experiences across Somalia — most are still coming soon.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/experiences" className="btn btn-primary btn-lg">
                <Sparkles size={18} />
                <span>Explore Experiences</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
