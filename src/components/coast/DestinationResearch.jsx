import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './DestinationResearch.css';

export default function DestinationResearch({ destination }) {
  const { language } = useLanguage();
  const localizedPath = (path) => `/${language}${path}`;
  const isSo = language === 'so';

  const projects = destination.researchProjects || [];

  if (projects.length === 0) return null;

  return (
    <section className="dest-research-section section" aria-labelledby="dest-research-heading">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="label-text">
            {isSo ? 'Dhab-u-hadalka Sayniska' : 'Scientific Rigour'}
          </span>
          <div className="divider" />
          <h2 className="section-heading" id="dest-research-heading">
            {isSo ? 'Halka sahamintu isu bedesho aqoon.' : 'Where exploration becomes knowledge.'}
          </h2>
          <p className="section-subheading">
            {isSo
              ? `Daraasaadka maadiga ah ee cilmiga badda ee hadda laga wado aagga xeebta ${destination.name}.`
              : `Active and baseline oceanographic field studies currently conducted in the ${destination.name} coastal sector.`}
          </p>
        </div>

        {/* Project Cards */}
        <div className="dest-research-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`dest-research-card reveal reveal-delay-${i + 1}`}
            >
              <div className="dest-research-card__top">
                <span className="badge badge-research">
                  <FlaskConical size={12} />
                  {project.category}
                </span>
                <span className="dest-research-card__status">
                  <CheckCircle2 size={11} />
                  {project.status}
                </span>
              </div>

              <h3 className="dest-research-card__title">{project.title}</h3>

              <div className="dest-research-card__footer">
                <span className="dest-research-card__region">
                  {isSo ? `Xeebta ${destination.region}` : `${destination.region} Coast`}
                </span>
                <Link to={localizedPath('/research')} className="dest-research-card__link">
                  <span>{isSo ? 'Fiiri Cilmi-baarista' : 'View Research'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
