import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedExperiences } from '../../data/experiences';
import ExperienceCard from '../experiences/ExperienceCard';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceGrid.css';

export default function TourismExperiences() {
  const { language, t } = useLanguage();
  const experiences = getFeaturedExperiences(language).slice(0, 4);
  const localizedPath = (path) => `/${language}${path}`;

  return (
    <section className="section" id="tourism-experiences" aria-labelledby="tourism-experiences-heading">
      <div className="container">
        <div className="section-header centered reveal">
          <span className="label-text">{t('tourism.experiences.label')}</span>
          <div className="divider centered" />
          <h2 className="section-heading" id="tourism-experiences-heading">
            {t('tourism.experiences.heading')}
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            {t('tourism.experiences.subheading')}
          </p>
        </div>

        <div className="exp-grid__results reveal">
          {experiences.map((experience, i) => (
            <ExperienceCard key={experience.id} experience={experience} priority={i === 0} />
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-10)' }}>
          <Link to={localizedPath('/experiences')} className="btn btn-primary btn-lg">
            <span>{t('tourism.experiences.ctaSeeAll')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
