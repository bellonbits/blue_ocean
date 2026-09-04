import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../lib/hooks';
import ExperiencesHero from '../components/experiences/ExperiencesHero';
import ExperienceCategories from '../components/experiences/ExperienceCategories';
import ExperienceGrid from '../components/experiences/ExperienceGrid';
import ExploreCTA from '../components/coast/ExploreCTA';
import { getAllExperiences } from '../data/experiences';
import { useLanguage } from '../context/LanguageContext';

export default function OceanExperiencesPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const { language } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    document.title = 'Ocean Experiences — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Ocean Experiences">
      <ExperiencesHero />
      <ExperienceCategories />

      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div className="section-header centered reveal">
            <span className="label-text">FULL DIRECTORY</span>
            <div className="divider centered" />
            <h2 className="section-heading">All Ocean Experiences</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Every activity currently in development along Somalia's 3,025 km coastline.
            </p>
          </div>

          <ExperienceGrid initialCategory={categoryParam} experiencesList={getAllExperiences(language)} />
        </div>
      </section>

      <ExploreCTA />
    </main>
  );
}
