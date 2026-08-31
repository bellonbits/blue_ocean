import { Target, Eye } from 'lucide-react';
import { organization } from '../../data/organization';
import './MissionVision.css';

export default function MissionVision() {
  const { mission, vision } = organization;

  return (
    <section className="mission-vision section" aria-labelledby="mission-vision-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">WHAT DRIVES US</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="mission-vision-heading">
            Mission & Vision
          </h2>
        </div>

        <div className="mission-vision__grid reveal">
          <div className="mission-vision__card">
            <div className="mission-vision__icon">
              <Target size={24} />
            </div>
            <span className="mission-vision__label">Mission</span>
            <h3 className="mission-vision__statement">{mission.statement}</h3>
            <p className="mission-vision__desc">{mission.description}</p>
          </div>

          <div className="mission-vision__card">
            <div className="mission-vision__icon">
              <Eye size={24} />
            </div>
            <span className="mission-vision__label">Vision</span>
            <h3 className="mission-vision__statement">{vision.statement}</h3>
            <p className="mission-vision__desc">{vision.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
