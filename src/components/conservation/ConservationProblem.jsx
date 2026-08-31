import {
  TreePine, Trash2, Fish, AlertTriangle, ShieldOff, Ship, Droplets, Thermometer, BookOpen,
} from 'lucide-react';
import '../research/ResearchMethodology.css';

const ICONS = {
  TreePine, Trash2, Fish, AlertTriangle, ShieldOff, Ship, Droplets, Thermometer, BookOpen,
};

export default function ConservationProblem({ project }) {
  if (!project.issues || project.issues.length === 0) return null;

  return (
    <section className="research-method section" aria-labelledby="conservation-problem-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">THE CHALLENGE</span>
          <div className="divider" />
          <h2 className="section-heading" id="conservation-problem-heading">
            What we're protecting.
          </h2>
          <p className="section-subheading">{project.problemStatement}</p>
        </div>

        <div className="research-method__grid reveal">
          {project.issues.map((issue) => {
            const Icon = ICONS[issue.icon] || AlertTriangle;
            return (
              <div key={issue.id} className="research-method__tag">
                <div className="research-method__tag-icon">
                  <Icon size={20} />
                </div>
                <span className="research-method__tag-label">{issue.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
