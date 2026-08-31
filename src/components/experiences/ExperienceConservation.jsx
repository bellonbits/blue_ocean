import { Link } from 'react-router-dom';
import { Leaf, CheckCircle2, ArrowRight } from 'lucide-react';
import './ExperienceConservation.css';

export default function ExperienceConservation({ experience }) {
  if (!experience.conservationThemes || experience.conservationThemes.length === 0) return null;

  return (
    <section className="exp-con-sec section" aria-labelledby="exp-con-heading">
      <div className="container">
        <div className="exp-con-sec__card reveal">
          <div className="exp-con-sec__header">
            <span className="label-text" style={{ color: '#02CCFE' }}>RESPONSIBLE TOURISM</span>
            <h2 className="exp-con-sec__title" id="exp-con-heading">
              Explore responsibly
            </h2>
          </div>

          <div className="exp-con-sec__content-grid">
            <div className="exp-con-sec__icon-box">
              <Leaf size={36} color="#6EE7B7" />
              <div className="exp-con-sec__icon-meta">
                <span className="exp-con-sec__icon-prefix">BLUE OCEAN COMMITMENT</span>
                <span className="exp-con-sec__icon-name">Low-Impact Ocean Tourism</span>
              </div>
            </div>

            <div className="exp-con-sec__narrative-wrap">
              <p className="exp-con-sec__explanation">
                Every Blue Ocean experience is designed around the health of the coastline that makes it possible.
                Guides and operating partners for {experience.title} follow these principles:
              </p>

              <div className="exp-con-sec__initiatives">
                <div className="exp-con-sec__init-list">
                  {experience.conservationThemes.map((theme, i) => (
                    <div key={i} className="exp-con-sec__init-item">
                      <CheckCircle2 size={16} className="exp-con-sec__check-icon" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="exp-con-sec__cta-row">
                <Link to="/conservation" className="exp-con-sec__action-btn">
                  <span>Learn About Our Conservation Work</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
