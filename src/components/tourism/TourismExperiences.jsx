import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedExperiences } from '../../data/experiences';
import ExperienceCard from '../experiences/ExperienceCard';
import '../experiences/ExperienceGrid.css';

export default function TourismExperiences() {
  const experiences = getFeaturedExperiences().slice(0, 4);

  return (
    <section className="section" id="tourism-experiences" aria-labelledby="tourism-experiences-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">Ocean Experiences</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-experiences-heading">
            Experience the ocean.
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Blue Ocean is building a growing network of responsible ocean experiences across Somalia — some active
            today, others coming soon. We never imply a tour, operator, or booking is available before it's
            confirmed.
          </p>
        </div>

        <div className="exp-grid__results reveal">
          {experiences.map((experience, i) => (
            <ExperienceCard key={experience.id} experience={experience} priority={i === 0} />
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/experiences" className="btn btn-primary btn-lg">
            <span>See All Experiences</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
