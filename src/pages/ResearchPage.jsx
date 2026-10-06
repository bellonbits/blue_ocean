import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import ResearchHero from '../components/research/ResearchHero';
import ResearchIntro from '../components/research/ResearchIntro';
import ResearchAreas from '../components/research/ResearchAreas';
import FeaturedResearch from '../components/research/FeaturedResearch';
import ResearchDataStats from '../components/research/ResearchDataStats';
import ResearchCTA from '../components/research/ResearchCTA';

import '../styles/portalDesignSystem.css';

export default function ResearchPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Research — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Blue Heaven Research">
        {/* 1. Inset Rounded Hero */}
        <ResearchHero />

        {/* 2. Research Introduction */}
        <section className="portal-card-section" aria-label="Research Introduction">
          <ResearchIntro />
        </section>

        {/* 3. Research Areas */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Research Focus Areas">
          <ResearchAreas />
        </section>

        {/* 4. Active Expeditions & Featured Research */}
        <section className="portal-card-section" aria-label="Featured Research Projects">
          <FeaturedResearch />
        </section>

        {/* 5. Marine Data & Station Stats */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Marine Data Statistics">
          <ResearchDataStats />
        </section>

        {/* 6. Research Call to Action */}
        <ResearchCTA />
      </main>
    </div>
  );
}

