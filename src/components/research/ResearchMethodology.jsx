import {
  ClipboardList, Waves, Fingerprint, TestTube, Fish, AudioLines, Camera, Map, Users,
} from 'lucide-react';
import './ResearchMethodology.css';

const ICONS = {
  ClipboardList, Waves, Fingerprint, TestTube, Fish, AudioLines, Camera, Map, Users,
};

export default function ResearchMethodology({ project }) {
  if (!project.methodologyDetails || project.methodologyDetails.length === 0) return null;

  return (
    <section className="research-method section" aria-labelledby="research-method-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">METHODOLOGY</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-method-heading">
            How we investigate the ocean.
          </h2>
        </div>

        <div className="research-method__grid reveal">
          {project.methodologyDetails.map((m) => {
            const Icon = ICONS[m.icon] || Waves;
            return (
              <div key={m.id} className="research-method__tag">
                <div className="research-method__tag-icon">
                  <Icon size={20} />
                </div>
                <span className="research-method__tag-label">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
