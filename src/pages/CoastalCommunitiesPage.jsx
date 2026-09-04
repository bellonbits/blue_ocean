import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../lib/hooks';
import CommunitiesHero from '../components/communities/CommunitiesHero';
import CommunitiesDirectory from '../components/communities/CommunitiesDirectory';
import CommunityStoryGrid from '../components/communities/CommunityStoryGrid';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import { getAllCommunityStories } from '../data/communities';
import { useLanguage } from '../context/LanguageContext';

export default function CoastalCommunitiesPage() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const categoryParam = searchParams.get('category') || 'all';
  useScrollReveal();

  useEffect(() => {
    document.title = 'Coastal Communities — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Blue Ocean Coastal Communities">
      <CommunitiesHero />
      <CommunitiesDirectory />

      <section className="section" id="community-stories" aria-labelledby="community-stories-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="label-text">VOICES FROM THE COAST</span>
            <div className="divider" />
            <h2 className="section-heading" id="community-stories-heading">
              Community Stories
            </h2>
            <p className="section-subheading">
              Real stories from the people whose lives are connected to Somalia's coastline.
            </p>
          </div>

          <CommunityStoryGrid initialCategory={categoryParam} storiesList={getAllCommunityStories(language)} />
        </div>
      </section>

      <GetInvolvedCTA />
    </main>
  );
}
