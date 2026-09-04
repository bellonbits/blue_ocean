import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getRelatedSpecies } from '../../data/marineLife';
import { useLanguage } from '../../context/LanguageContext';
import SpeciesCard from './SpeciesCard';
import './RelatedSpecies.css';

export default function RelatedSpecies({ currentSlug, categoryName }) {
  const { language } = useLanguage();
  const related = getRelatedSpecies(currentSlug, 3, language);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-species section" aria-labelledby="related-species-heading">
      <div className="container">
        {/* Header */}
        <div className="related-species__header reveal">
          <div className="related-species__header-left">
            <span className="label-text">ECOLOGICAL PEERS</span>
            <div className="divider" />
            <h2 className="section-heading" id="related-species-heading">
              Explore more marine life
            </h2>
            <p className="section-subheading">
              Discover other species sharing similar habitats and taxonomic niches along Somalia’s coastline.
            </p>
          </div>

          <div className="related-species__header-right">
            <Link to="/marine-life/species" className="related-species__btn">
              <span>View All Species</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Species Grid */}
        <div className="related-species__grid reveal">
          {related.map((species) => (
            <div key={species.id} className="related-species__item">
              <SpeciesCard species={species} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
