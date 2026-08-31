import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import ConservationHero from '../components/conservation/ConservationHero';
import ConservationIntro from '../components/conservation/ConservationIntro';
import ConservationFocusAreas from '../components/conservation/ConservationFocusAreas';
import ConservationApproach from '../components/conservation/ConservationApproach';
import FeaturedConservation from '../components/conservation/FeaturedConservation';
import ConservationImpact from '../components/conservation/ConservationImpact';
import ConservationCommunitiesPreview from '../components/conservation/ConservationCommunitiesPreview';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';

export default function ConservationPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Conservation — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Blue Ocean Conservation">
      <ConservationHero />
      <ConservationIntro />
      <ConservationFocusAreas />
      <ConservationApproach />
      <FeaturedConservation />
      <ConservationImpact />
      <ConservationCommunitiesPreview />
      <GetInvolvedCTA />
    </main>
  );
}
