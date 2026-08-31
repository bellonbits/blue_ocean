import { Link } from 'react-router-dom';
import { Fish, ArrowRight } from 'lucide-react';
import '../experiences/ExperienceWildlife.css';

export default function ResearchSpecies({ project }) {
  if (!project.species || project.species.length === 0) return null;

  return (
    <section className="exp-wildlife-sec section" aria-labelledby="research-species-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">SPECIES STUDIED</span>
          <div className="divider" />
          <h2 className="section-heading" id="research-species-heading">
            Life we're studying
          </h2>
          <p className="section-subheading">
            Species documented as part of {project.title}.
          </p>
        </div>

        <div className="exp-wildlife-grid reveal">
          {project.species.map((species) => (
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
