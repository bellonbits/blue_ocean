import { Link } from 'react-router-dom';
import { Fish, ArrowRight, Microscope, MapPin, Activity } from 'lucide-react';
import './ExperienceWildlife.css';

export default function ExperienceWildlife({ experience }) {
  const hasSpecies = experience.marineSpecies && experience.marineSpecies.length > 0;
  const hasResearch = experience.researchProjects && experience.researchProjects.length > 0;

  if (!hasSpecies && !hasResearch) return null;

  return (
    <section className="exp-wildlife-sec section" aria-labelledby="exp-wildlife-heading">
      <div className="container">
        {hasSpecies && (
          <>
            <div className="section-header reveal">
              <span className="label-text">MARINE LIFE CONNECTION</span>
              <div className="divider" />
              <h2 className="section-heading" id="exp-wildlife-heading">
                You may encounter
              </h2>
              <p className="section-subheading">
                Species regularly documented in the waters connected to {experience.title}. Not every species is
                guaranteed on every outing — sightings depend on season, weather, and location.
              </p>
            </div>

            <div className="exp-wildlife-grid reveal">
              {experience.marineSpecies.map((species) => (
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
          </>
        )}

        {hasResearch && (
          <div className={hasSpecies ? 'exp-wildlife-research' : ''}>
            <div className="section-header reveal">
              <span className="label-text">EXPLORE WITH KNOWLEDGE</span>
              <div className="divider" />
              <h2 className="section-heading">Related research</h2>
              <p className="section-subheading">
                Scientific work connected to the species and habitats found within this experience.
              </p>
            </div>

            <div className="exp-wildlife-research-grid reveal">
              {experience.researchProjects.map((project) => (
                <div key={project.id} className="exp-wildlife-research-card">
                  <div className="exp-wildlife-research-card__header">
                    <div className="exp-wildlife-research-card__icon">
                      <Microscope size={18} />
                    </div>
                    <span className="exp-wildlife-research-card__status">
                      <Activity size={11} />
                      <span>{project.status}</span>
                    </span>
                  </div>
                  <span className="exp-wildlife-research-card__loc">
                    <MapPin size={11} />
                    <span>{project.location}</span>
                  </span>
                  <h4 className="exp-wildlife-research-card__title">{project.title}</h4>
                  <Link to="/research" className="exp-wildlife-research-card__link">
                    <span>View Research</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
