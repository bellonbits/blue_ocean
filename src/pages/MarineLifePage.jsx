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

import '../styles/portalDesignSystem.css';

export default function MarineLifePage() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const speciesList = getAllSpecies(language);
  useScrollReveal();

  useEffect(() => {
    document.title = 'Marine Life of Somalia — Blue Heaven Field Guide & Species Library';
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="portal-page">
      <main id="main-content" className="marine-life-landing">
        {/* 1. Inset Rounded Hero */}
        <MarineHero />

        {/* 2. Featured Species Showcase */}
        <section className="portal-card-section" aria-label="Featured Species">
          <FeaturedMarineLife />
        </section>

        {/* 3. Classification Categories */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Marine Categories">
          <MarineCategories />
        </section>

        {/* 4. Dynamic Live Stats */}
        <section className="portal-card-section" aria-label="Marine Statistics">
          <MarineStats />
        </section>

        {/* 5. Marine Ecosystems Foundation */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Marine Ecosystems">
          <EcosystemsSection />
        </section>

        {/* 6. Quick Field Guide Explorer */}
        <section className="portal-card-section" aria-label="Field Guide Explorer">
          <div className="portal-section-header">
            <span className="portal-section-tag">FIELD GUIDE EXPLORER</span>
            <h2 className="portal-section-title">Search Somali Marine Species</h2>
            <p className="portal-section-subtitle">
              Search across common names, Somali vernacular, and scientific taxonomy across 3,330 km of living coast.
            </p>
          </div>

          <SpeciesGrid speciesList={speciesList} showSearchHeader={true} />
        </section>

        {/* 7. CTA */}
        <ExploreCTA />
      </main>
    </div>
  );
}

