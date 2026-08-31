import { Link } from 'react-router-dom';
import { Microscope, MapPin, Activity, ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '../../data/research';
import './ResearchPreview.css';

export default function ResearchPreview({ species }) {
  if (!species.researchProjects || species.researchProjects.length === 0) return null;

  return (
    <section className="research-prev section" aria-labelledby="research-prev-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">SCIENTIFIC INITIATIVES</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-prev-heading">
            What we’re learning
          </h2>
          <p className="section-subheading">
            Active field studies, acoustic monitoring, and marine biology projects investigating {species.commonName} populations in Somali waters.
          </p>
        </div>

        {/* Research Cards Grid */}
        <div className="research-prev__grid reveal">
          {species.researchProjects.map((project) => {
            const fullProject = getProjectBySlug(project.id);
            return (
              <div key={project.id} className="research-prev__card">
                <div className="research-prev__card-header">
                  <div className="research-prev__icon-wrap">
                    <Microscope size={20} />
                  </div>
                  <span className="research-prev__status-pill">
                    <Activity size={12} />
                    <span>{project.status}</span>
                  </span>
                </div>

                <div className="research-prev__card-body">
                  <span className="research-prev__location">
                    <MapPin size={12} />
                    <span>{project.location}</span>
                  </span>
                  <h3 className="research-prev__title">{project.title}</h3>
                </div>

                <div className="research-prev__card-footer">
                  <Link to={fullProject ? `/research/projects/${fullProject.slug}` : '/research'} className="research-prev__link">
                    <span>View Research Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
