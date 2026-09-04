import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { getConservationProjectsForResearch } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceWildlife.css';

export default function ResearchConservationConnection({ project }) {
  const { language } = useLanguage();
  const linked = getConservationProjectsForResearch(project.slug, language);

  if (linked.length === 0) return null;

  return (
    <section className="exp-wildlife-sec section" aria-labelledby="research-conservation-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">FROM RESEARCH TO ACTION</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-conservation-heading">
            Where this research leads.
          </h2>
          <p className="section-subheading">
            Conservation work built directly on {project.title}.
          </p>
        </div>

        <div className="exp-wildlife-grid reveal">
          {linked.map((cp) => (
            <Link key={cp.slug} to={`/conservation/projects/${cp.slug}`} className="exp-wildlife-card">
              <div className="exp-wildlife-card__media">
                <img src={cp.heroImage} alt={cp.title} className="exp-wildlife-card__img" loading="lazy" />
                <div className="exp-wildlife-card__overlay" />
              </div>
              <div className="exp-wildlife-card__body">
                <span className="exp-wildlife-card__cat">
                  <Shield size={12} />
                  <span>{cp.focusAreaName}</span>
                </span>
                <h3 className="exp-wildlife-card__name">{cp.title}</h3>
                <p className="exp-wildlife-card__scientific">{cp.status}</p>
                <span className="exp-wildlife-card__cta">
                  <span>View Conservation Project</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
