import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedExperiences } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';
import ExperienceCard from './ExperienceCard';
import './RelatedExperiences.css';

export default function RelatedExperiences({ currentSlug }) {
  const { language } = useLanguage();
  const related = getRelatedExperiences(currentSlug, 3, language);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-exp section" aria-labelledby="related-exp-heading">
      <div className="container">
        <div className="related-exp__header reveal">
          <div className="related-exp__header-left">
            <span className="label-text">MORE TO DISCOVER</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-exp-heading">
              Explore more experiences
            </h2>
            <p className="section-subheading">
              Other activities in the same category or region along the Somali coast.
            </p>
          </div>

          <div className="related-exp__header-right">
            <Link to="/experiences" className="related-exp__btn">
              <span>View All Experiences</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="related-exp__grid reveal">
          {related.map((exp) => (
            <div key={exp.id} className="related-exp__item">
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
