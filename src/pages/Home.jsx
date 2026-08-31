import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import HeroSection from '../components/hero/HeroSection';
import ExploreCoast from '../components/sections/ExploreCoast';
import MarineLifePreview from '../components/sections/MarineLifePreview';
import OceanExperiences from '../components/sections/OceanExperiences';
import ResearchPreview from '../components/sections/ResearchPreview';
import ConservationSection from '../components/sections/ConservationSection';
import CoastalCommunities from '../components/sections/CoastalCommunities';
import LatestDiscoveries from '../components/news/LatestDiscoveries';

export default function Home() {
  // Activate scroll reveal
  useScrollReveal();

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Blue Ocean Homepage">
      <HeroSection />
      <ExploreCoast />
      <MarineLifePreview />
      <OceanExperiences />
      <ResearchPreview />
      <ConservationSection />
      <CoastalCommunities />
      <LatestDiscoveries />
    </main>
  );
}
