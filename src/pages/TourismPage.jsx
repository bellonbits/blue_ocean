import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import TourismHero from '../components/tourism/TourismHero';
import TourismIntro from '../components/tourism/TourismIntro';
import TourismRegions from '../components/tourism/TourismRegions';
import TourismExperiences from '../components/tourism/TourismExperiences';
import TourismMarineLife from '../components/tourism/TourismMarineLife';
import TourismResponsible from '../components/tourism/TourismResponsible';
import TourismCommunities from '../components/tourism/TourismCommunities';
import TourismConservationStory from '../components/tourism/TourismConservationStory';
import TourismResearch from '../components/tourism/TourismResearch';
import TourismFeaturedDestinations from '../components/tourism/TourismFeaturedDestinations';
import TourismFutureExperience from '../components/tourism/TourismFutureExperience';
import TourismGetInvolved from '../components/tourism/TourismGetInvolved';
import TourismClosingCTA from '../components/tourism/TourismClosingCTA';

export default function TourismPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Tourism — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="tourism-page" aria-label="Tourism">
      <TourismHero />
      <TourismIntro />
      <TourismRegions />
      <TourismExperiences />
      <TourismMarineLife />
      <TourismResponsible />
      <TourismCommunities />
      <TourismConservationStory />
      <TourismResearch />
      <TourismFeaturedDestinations />
      <TourismFutureExperience />
      <TourismGetInvolved />
      <TourismClosingCTA />
    </main>
  );
}
