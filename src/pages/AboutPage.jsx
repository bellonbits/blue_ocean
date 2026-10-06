import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import AboutHero from '../components/about/AboutHero';
import OrganizationStory from '../components/about/OrganizationStory';
import MissionVision from '../components/about/MissionVision';
import WhatWeDo from '../components/about/WhatWeDo';
import WhereWeWork from '../components/about/WhereWeWork';
import AboutTeam from '../components/about/AboutTeam';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';

import '../styles/portalDesignSystem.css';

export default function AboutPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'About Blue Heaven — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="About Blue Heaven">
        {/* 1. Inset Rounded Hero */}
        <AboutHero />

        {/* 2. Organization Story */}
        <section className="portal-card-section" aria-label="Organization Story">
          <OrganizationStory />
        </section>

        {/* 3. Mission & Vision */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Mission and Vision">
          <MissionVision />
        </section>

        {/* 4. What We Do */}
        <section className="portal-card-section" aria-label="What We Do">
          <WhatWeDo />
        </section>

        {/* 5. Where We Work */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Where We Work">
          <WhereWeWork />
        </section>

        {/* 6. About Team */}
        <section className="portal-card-section" aria-label="About Team">
          <AboutTeam />
        </section>

        {/* 7. Get Involved Sunset CTA */}
        <GetInvolvedCTA />
      </main>
    </div>
  );
}

