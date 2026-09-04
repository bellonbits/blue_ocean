import { getConservationProjectsByFocusArea } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import ConservationProjectCard from './ConservationProjectCard';
import '../experiences/ExperienceGrid.css';

export default function IllegalFishingProjects() {
  const { language } = useLanguage();
  const projects = getConservationProjectsByFocusArea('illegal-fishing', language);

  if (projects.length === 0) return null;

  return (
    <section className="section" id="illegal-fishing-projects" aria-labelledby="illegal-fishing-projects-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Active Work</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="illegal-fishing-projects-heading">
            Projects addressing illegal fishing
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Real, connected work — each project here links to the research behind it and the communities involved.
          </p>
        </div>

        <div className="exp-grid__results reveal">
          {projects.map((project, i) => (
            <ConservationProjectCard key={project.id} project={project} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
