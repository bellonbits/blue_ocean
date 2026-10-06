import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../lib/hooks';
import ExperiencesHero from '../components/experiences/ExperiencesHero';
import ExperienceCategories from '../components/experiences/ExperienceCategories';
import ExperienceGrid from '../components/experiences/ExperienceGrid';
import ExploreCTA from '../components/coast/ExploreCTA';
import { getAllExperiences } from '../data/experiences';
import { useLanguage } from '../context/LanguageContext';

import '../styles/portalDesignSystem.css';

export default function OceanExperiencesPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const { language } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    document.title = 'Ocean Experiences — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Ocean Experiences">
        {/* 1. Inset Rounded Hero */}
        <ExperiencesHero />

        {/* 2. Experience Categories */}
        <section className="portal-card-section" aria-label="Experience Categories">
          <ExperienceCategories />
        </section>

        {/* 3. Full Directory */}
        <section className="portal-card-section portal-card-section--tint" aria-label="Experience Directory">
          <div className="portal-section-header">
            <span className="portal-section-tag">FULL DIRECTORY</span>
            <h2 className="portal-section-title">All Ocean Experiences</h2>
            <p className="portal-section-subtitle">
              Authentic coastal activities and marine expeditions along Somalia's 3,330 km coastline.
            </p>
          </div>

          <ExperienceGrid initialCategory={categoryParam} experiencesList={getAllExperiences(language)} />
        </section>

        {/* 4. Panoramic Sunset CTA */}
        <ExploreCTA />
      </main>
    </div>
  );
}

