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

import '../styles/portalDesignSystem.css';

export default function ConservationPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Conservation — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Blue Heaven Conservation">
        {/* 1. Inset Rounded Hero */}
        <ConservationHero />

        {/* 2. Conservation Intro */}
        <section className="portal-card-section" aria-label="Conservation Intro">
          <ConservationIntro />
        </section>

        {/* 3. Focus Areas */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Focus Areas">
          <ConservationFocusAreas />
        </section>

        {/* 4. Strategic Approach */}
        <section className="portal-card-section" aria-label="Conservation Approach">
          <ConservationApproach />
        </section>

        {/* 5. Featured Projects & Marine Sanctuaries */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Featured Conservation">
          <FeaturedConservation />
        </section>

        {/* 6. Measured Impact */}
        <section className="portal-card-section" aria-label="Conservation Impact">
          <ConservationImpact />
        </section>

        {/* 7. Coastal Communities Preview */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Communities Preview">
          <ConservationCommunitiesPreview />
        </section>

        {/* 8. Get Involved Sunset CTA */}
        <GetInvolvedCTA />
      </main>
    </div>
  );
}

