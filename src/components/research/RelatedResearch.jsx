import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedProjects } from '../../data/research';
import { useLanguage } from '../../context/LanguageContext';
import ResearchProjectCard from './ResearchProjectCard';
import '../experiences/RelatedExperiences.css';

export default function RelatedResearch({ currentSlug }) {
  const { language } = useLanguage();
  const related = getRelatedProjects(currentSlug, 3, language);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-exp section" aria-labelledby="related-research-heading">
      <div className="container">
        <div className="related-exp__header reveal">
          <div className="related-exp__header-left">
            <span className="label-text">MORE RESEARCH</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-research-heading">
              Explore more research
            </h2>
            <p className="section-subheading">
              Other projects in the same research area or region.
            </p>
          </div>

          <div className="related-exp__header-right">
            <Link to="/research/projects" className="related-exp__btn">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="related-exp__grid reveal">
          {related.map((p) => (
            <div key={p.id} className="related-exp__item">
              <ResearchProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
