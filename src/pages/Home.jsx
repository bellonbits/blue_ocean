import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import EditorialHero from '../components/editorial/EditorialHero';
import TourismSection from '../components/editorial/TourismSection';
import EditorialStatement from '../components/editorial/EditorialStatement';
import EditorialDestinations from '../components/editorial/EditorialDestinations';
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
        {/* 1. Hero: Full-Bleed Cinematic Photography */}
        <EditorialHero />

        {/* 2. Coastal Tourism Section: 4 Featured Destinations matching reference layout */}
        <TourismSection />

        {/* 3. Introduction: 3,330 KM Coastline Narrative & Key Metrics */}
        <EditorialStatement />

        {/* 4. Purposeful Editorial Destination Cards: Hafun, Mogadishu, Ras Hafun, Kismayo */}
        <EditorialDestinations />

        {/* 4. Brand Mission & Four Pillars: Tourism, Research, Education, Conservation */}
        <EditorialMission />

        {/* 5. The Living Ocean: Large Editorial Photography & Marine Megafauna */}
        <EditorialMarineLife />

        {/* 6. Ocean Experiences: Diving, Dhow Voyages, Coastal Wilderness Trekking */}
        <EditorialExperiences />

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
