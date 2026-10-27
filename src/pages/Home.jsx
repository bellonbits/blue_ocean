import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import EditorialHero from '../components/editorial/EditorialHero';
import TourismSection from '../components/editorial/TourismSection';
import EditorialStatement from '../components/editorial/EditorialStatement';
import EditorialMission from '../components/editorial/EditorialMission';
import EditorialMarineLife from '../components/editorial/EditorialMarineLife';
import EditorialExperiences from '../components/editorial/EditorialExperiences';
import EditorialResearch from '../components/editorial/EditorialResearch';
import EditorialCoastlineMap from '../components/editorial/EditorialCoastlineMap';
import EditorialCTA from '../components/editorial/EditorialCTA';
import '../components/editorial/EditorialHome.css';

export default function Home() {
  // Activate scroll animations & transitions
  useScrollReveal();

  // Reset scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="editorial-home">
      <main id="main-content" aria-label="Somalia Blue Heaven — Marine Tourism, Research & Conservation">
        {/* 1. Hero: Grand Ocean Showcase & Quick Booking Bar */}
        <EditorialHero />

        {/* 2. Coastal Tourism Section: Featured Havens & Islands with Direct Excursion Booking */}
        <TourismSection />

        {/* 3. Ocean Activities & Experiences: Snorkeling, Scuba Diving, Dhow Tours, Photography, Marine Safaris */}
        <EditorialExperiences />

        {/* 4. Introduction: 3,330 KM Coastline Narrative & Key Metrics */}
        <EditorialStatement />

        {/* 5. Brand Mission & Four Pillars: Tourism, Research, Education, Conservation */}
        <EditorialMission />

        {/* 6. The Living Ocean: Large Editorial Photography & Marine Megafauna */}
        <EditorialMarineLife />

        {/* 7. Research & Conservation: Bathymetric Mapping, Anti-IUU & Marine Protected Areas */}
        <EditorialResearch />

        {/* 8. Signature Interactive Somali Coastline: Djibouti to Jubaland */}
        <EditorialCoastlineMap />

        {/* 9. Final CTA: "Explore what lies beyond the horizon." */}
        <EditorialCTA />
      </main>
    </div>
  );
}
