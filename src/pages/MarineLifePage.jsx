import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollReveal } from '../lib/hooks';
import MarineHero from '../components/marine/MarineHero';
import FeaturedMarineLife from '../components/marine/FeaturedMarineLife';
import MarineCategories from '../components/marine/MarineCategories';
import MarineStats from '../components/marine/MarineStats';
import EcosystemsSection from '../components/marine/EcosystemsSection';
import SpeciesGrid from '../components/marine/SpeciesGrid';
import ExploreCTA from '../components/coast/ExploreCTA';
import { getAllSpecies } from '../data/marineLife';
import { useLanguage } from '../context/LanguageContext';

export default function MarineLifePage() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const speciesList = getAllSpecies(language);
  useScrollReveal();

  useEffect(() => {
    document.title = 'Marine Life of Somalia — Blue Ocean Field Guide & Species Library';
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main id="main-content" className="marine-life-landing">
      {/* 1. Hero */}
      <MarineHero />

      {/* 2. Featured Species Showcase */}
      <FeaturedMarineLife />

      {/* 3. Classification Categories */}
      <MarineCategories />

      {/* 4. Dynamic Live Stats */}
      <MarineStats />

      {/* 5. Marine Ecosystems Foundation */}
      <EcosystemsSection />

      {/* 6. Quick Field Guide Explorer */}
      <section className="section" style={{ background: 'var(--color-background)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header centered reveal">
            <span className="label-text">FIELD GUIDE EXPLORER</span>
            <div className="divider centered" />
            <h2 className="section-heading">Search Somali Marine Species</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Search across common names, Somali vernacular, and scientific taxonomy.
            </p>
          </div>

          <SpeciesGrid speciesList={speciesList} showSearchHeader={true} />
        </div>
      </section>

      {/* 7. CTA */}
      <ExploreCTA />
    </main>
  );
}
