import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import ResearchHero from '../components/research/ResearchHero';
import ResearchIntro from '../components/research/ResearchIntro';
import ResearchAreas from '../components/research/ResearchAreas';
import FeaturedResearch from '../components/research/FeaturedResearch';
import ResearchDataStats from '../components/research/ResearchDataStats';
import ResearchCTA from '../components/research/ResearchCTA';

export default function ResearchPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Research — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Blue Ocean Research">
      <ResearchHero />
      <ResearchIntro />
      <ResearchAreas />
      <FeaturedResearch />
      <ResearchDataStats />
      <ResearchCTA />
    </main>
  );
}
