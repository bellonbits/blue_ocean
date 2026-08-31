import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Waves } from 'lucide-react';
import { useScrollReveal } from '../../lib/hooks';
import { getSpeciesBySlug } from '../../data/marineLife';
import SpeciesHero from './SpeciesHero';
import SpeciesInfo from './SpeciesInfo';
import SpeciesGallery from './SpeciesGallery';
import HabitatSection from './HabitatSection';
import ConservationStatusSection from './ConservationStatusSection';
import ResearchPreview from './ResearchPreview';
import RelatedSpecies from './RelatedSpecies';
import ExploreCTA from '../coast/ExploreCTA';

export default function SpeciesTemplate() {
  const { slug } = useParams();
  const species = getSpeciesBySlug(slug);
  useScrollReveal();

  if (!species) {
    return (
      <div className="species-not-found section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <span className="label-text">SPECIES DIRECTORY</span>
          <div className="divider centered" />
          <h1 className="section-heading">Species Not Found</h1>
          <p className="section-subheading" style={{ margin: '0 auto 24px' }}>
            The requested species record is not currently published in the Blue Ocean field guide or the URL is incorrect.
          </p>
          <Link to="/marine-life/species" className="btn btn--primary">
            <ArrowLeft size={16} />
            <span>Return to Species Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main id="main-content" className="species-detail-page">
      {/* 1. DARK: Cinematic Species Hero */}
      <SpeciesHero species={species} />

      {/* 2. LIGHT/RHYTHMIC: Species Info & Scientific Matrix */}
      <SpeciesInfo species={species} />

      {/* 3. DARK: Visual Gallery */}
      <SpeciesGallery gallery={species.gallery} commonName={species.commonName} />

      {/* 4. LIGHT/RHYTHMIC: Habitat & Coastal Destinations (Connected to Sprint 2) */}
      <HabitatSection species={species} />

      {/* 5. DARK: Conservation Status & Protection */}
      <ConservationStatusSection species={species} />

      {/* 6. LIGHT/RHYTHMIC: Scientific Research Projects (Connected to Research) */}
      <ResearchPreview species={species} />

      {/* 7. DARK: Related Species */}
      <RelatedSpecies currentSlug={species.slug} categoryName={species.categoryName} />

      {/* 8. Global CTA */}
      <ExploreCTA />
    </main>
  );
}
