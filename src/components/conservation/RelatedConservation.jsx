import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedConservationProjects } from '../../data/conservation';
import ConservationProjectCard from './ConservationProjectCard';
import '../experiences/RelatedExperiences.css';

export default function RelatedConservation({ currentSlug }) {
  const related = getRelatedConservationProjects(currentSlug, 3);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-exp section" aria-labelledby="related-conservation-heading">
      <div className="container">
        <div className="related-exp__header reveal">
          <div className="related-exp__header-left">
            <span className="label-text">MORE CONSERVATION</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-conservation-heading">
              Explore more conservation work
            </h2>
            <p className="section-subheading">
              Other projects in the same focus area or region.
            </p>
          </div>

          <div className="related-exp__header-right">
            <Link to="/conservation/projects" className="related-exp__btn">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="related-exp__grid reveal">
          {related.map((p) => (
            <div key={p.id} className="related-exp__item">
              <ConservationProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
