import { useState, useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import { listRegions, listDestinations } from '../lib/contentApi';
import { useLanguage } from '../context/LanguageContext';
import CoastHero from '../components/coast/CoastHero';
import RegionCards from '../components/coast/RegionCards';
import DestinationGrid from '../components/coast/DestinationGrid';
import CoastMap from '../components/coast/CoastMap';
import CoastStats from '../components/coast/CoastStats';
import ExploreCTA from '../components/coast/ExploreCTA';

export default function ExploreCoastPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regions, setRegions] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const { language } = useLanguage();

  // Activate scroll reveal animations
  useScrollReveal();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listRegions(language), listDestinations({ lang: language })]).then(([r, d]) => {
      if (cancelled) return;
      setRegions(r);
      setDestinations(d);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [language]);

  const handleSelectRegion = (regionId) => {
    setSelectedRegion(regionId);
  };

  return (
    <main id="main-content" aria-label="Explore Somalia's Coast">
      {/* 1. Full-screen Cinematic Coast Hero */}
      <CoastHero />

      {/* 2. Three Regional Worlds */}
      <RegionCards regions={regions} onSelectRegion={handleSelectRegion} />

      {/* 3. Destination Catalog Grid with Filters */}
      <DestinationGrid
        destinations={destinations}
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
      />

      {/* 4. Interactive Cartographic Map */}
      <CoastMap destinations={destinations} />

      {/* 5. Coast Statistics */}
      <CoastStats />

      {/* 6. Final Cinematic Next-Horizon CTA */}
      <ExploreCTA />
    </main>
  );
}
