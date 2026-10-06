import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../lib/hooks';
import CommunitiesHero from '../components/communities/CommunitiesHero';
import CommunitiesDirectory from '../components/communities/CommunitiesDirectory';
import CommunityStoryGrid from '../components/communities/CommunityStoryGrid';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import { getAllCommunityStories } from '../data/communities';
import { useLanguage } from '../context/LanguageContext';

import '../styles/portalDesignSystem.css';

export default function CoastalCommunitiesPage() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const categoryParam = searchParams.get('category') || 'all';
  useScrollReveal();

  useEffect(() => {
    document.title = 'Coastal Communities — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Blue Heaven Coastal Communities">
        {/* 1. Inset Rounded Hero */}
        <CommunitiesHero />

        {/* 2. Communities Directory */}
        <section className="portal-card-section" aria-label="Communities Directory">
          <CommunitiesDirectory />
        </section>

        {/* 3. Community Stories */}
        <section className="portal-card-section portal-card-section--tint" id="community-stories" aria-labelledby="community-stories-heading">
          <div className="portal-section-header">
            <span className="portal-section-tag">VOICES FROM THE COAST</span>
            <h2 className="portal-section-title" id="community-stories-heading">
              Community Stories
            </h2>
            <p className="portal-section-subtitle">
              Authentic stories from artisanal fishing families, elders, and youth along Somalia's 3,330 km coastline.
            </p>
          </div>

          <CommunityStoryGrid initialCategory={categoryParam} storiesList={getAllCommunityStories(language)} />
        </section>

        {/* 4. Sunset CTA */}
        <GetInvolvedCTA />
      </main>
    </div>
  );
}

