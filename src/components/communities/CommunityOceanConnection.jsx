import { Link } from 'react-router-dom';
import { Fish, Shield, ArrowRight } from 'lucide-react';
import { getConservationProjectBySlug } from '../../data/conservation';
import { useLanguage } from '../../context/LanguageContext';
import '../experiences/ExperienceWildlife.css';

export default function CommunityOceanConnection({ story }) {
  const { language } = useLanguage();
  const project = story.conservationProjectSlug ? getConservationProjectBySlug(story.conservationProjectSlug, language) : null;
  const hasSpecies = story.species && story.species.length > 0;

  if (!hasSpecies && !project) return null;

  return (
    <section className="exp-wildlife-sec section" aria-labelledby="community-ocean-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">OCEAN CONNECTION</span>
          <div className="divider" />
          <h2 className="section-heading" id="community-ocean-heading">
            {story.marineConnection}
          </h2>
        </div>

        <div className="exp-wildlife-grid reveal">
          {project && (
            <Link to={`/conservation/projects/${project.slug}`} className="exp-wildlife-card">
              <div className="exp-wildlife-card__media">
                <img src={project.heroImage} alt={project.title} className="exp-wildlife-card__img" loading="lazy" />
                <div className="exp-wildlife-card__overlay" />
              </div>
              <div className="exp-wildlife-card__body">
                <span className="exp-wildlife-card__cat">
                  <Shield size={12} />
                  <span>{project.focusAreaName}</span>
                </span>
                <h3 className="exp-wildlife-card__name">{project.title}</h3>
                <p className="exp-wildlife-card__scientific">{project.status}</p>
                <span className="exp-wildlife-card__cta">
                  <span>View Conservation Project</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          )}

          {story.species.map((species) => (
            <Link key={species.slug} to={`/marine-life/species/${species.slug}`} className="exp-wildlife-card">
              <div className="exp-wildlife-card__media">
                <img src={species.heroImage} alt={species.commonName} className="exp-wildlife-card__img" loading="lazy" />
                <div className="exp-wildlife-card__overlay" />
              </div>
              <div className="exp-wildlife-card__body">
                <span className="exp-wildlife-card__cat">
                  <Fish size={12} />
                  <span>{species.category}</span>
                </span>
                <h3 className="exp-wildlife-card__name">{species.commonName}</h3>
                <p className="exp-wildlife-card__scientific">{species.scientificName}</p>
                <span className="exp-wildlife-card__cta">
                  <span>Field Profile</span>
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
