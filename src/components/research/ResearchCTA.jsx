import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, FolderOpen, BarChart3 } from 'lucide-react';
import '../coast/ExploreCTA.css';

export default function ResearchCTA() {
  return (
    <section className="explore-cta-section section" aria-label="From Knowledge to Action">
      <div className="container">
        <div className="explore-cta-card glass reveal">
          <div className="explore-cta-glow" aria-hidden="true" />

          <div className="explore-cta-content">
            <span className="label-text">From Knowledge to Action</span>

            <h2 className="explore-cta-heading display-heading">
              Research becomes protection
              <br />
              when it reaches the coast.
            </h2>

            <p className="explore-cta-subtext">
              Every finding feeds directly into Blue Ocean's conservation priorities — from marine protected area
              proposals to community-led protection programs.
            </p>

            <div className="explore-cta-buttons">
              <Link to="/conservation" className="btn btn-primary btn-lg" id="cta-explore-conservation">
                <Leaf size={18} />
                <span>Explore Conservation</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/research/projects" className="btn btn-outline btn-lg" id="cta-all-projects">
                <FolderOpen size={18} />
                <span>All Research Projects</span>
              </Link>
              <Link to="/research/statistics" className="btn btn-outline btn-lg" id="cta-coastal-statistics">
                <BarChart3 size={18} />
                <span>Coastal & Marine Statistics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
