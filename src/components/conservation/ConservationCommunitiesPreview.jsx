import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function ConservationCommunitiesPreview() {
  return (
    <section className="explore-cta-section section" aria-label="Conservation and Communities">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">Conservation & Communities</span>

            <h2 className="explore-cta-heading display-heading">
              Conservation works when communities
              <br />
              are part of the solution.
            </h2>

            <p className="explore-cta-subtext">
              Every project on this page connects back to the fishing cooperatives, beach guardians, and coastal
              businesses who live alongside the ocean it protects.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/communities" className="btn btn-primary btn-lg" id="cta-coastal-communities">
                <Users size={18} />
                <span>Meet the Communities</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
