import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import IllegalFishingHero from '../components/conservation/IllegalFishingHero';
import IllegalFishingApproach from '../components/conservation/IllegalFishingApproach';
import IllegalFishingProjects from '../components/conservation/IllegalFishingProjects';
import ConservationApproach from '../components/conservation/ConservationApproach';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';

export default function ConservationIllegalFishingPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Illegal Fishing — Blue Ocean Conservation';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="conservation-illegal-fishing-page" aria-label="Illegal Fishing — Blue Ocean Conservation">
      <IllegalFishingHero />
      <IllegalFishingApproach />
      <IllegalFishingProjects />
      <ConservationApproach />
      <GetInvolvedCTA />
    </main>
  );
}
