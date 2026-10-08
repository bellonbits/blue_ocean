import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import GetInvolvedHero from '../components/shared/GetInvolvedHero';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import ConservationImpact from '../components/conservation/ConservationImpact';

export default function GetInvolvedPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Get Involved — Somalia Blue Heaven';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Get Involved with Somalia Blue Heaven">
      <GetInvolvedHero />
      <GetInvolvedCTA />
      <ConservationImpact />
    </main>
  );
}
