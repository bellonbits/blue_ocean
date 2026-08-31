import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import AboutHero from '../components/about/AboutHero';
import OrganizationStory from '../components/about/OrganizationStory';
import MissionVision from '../components/about/MissionVision';
import WhatWeDo from '../components/about/WhatWeDo';
import WhereWeWork from '../components/about/WhereWeWork';
import AboutTeam from '../components/about/AboutTeam';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';

export default function AboutPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'About Blue Ocean — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="About Blue Ocean">
      <AboutHero />
      <OrganizationStory />
      <MissionVision />
      <WhatWeDo />
      <WhereWeWork />
      <AboutTeam />
      <GetInvolvedCTA />
    </main>
  );
}
