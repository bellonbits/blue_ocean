import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useScrollReveal, useTrackRecentlyViewed } from '../lib/hooks';
import { getExperienceBySlug } from '../data/experiences';
import ExperienceHero from '../components/experiences/ExperienceHero';
import ExperienceStory from '../components/experiences/ExperienceStory';
import ExperienceGallery from '../components/experiences/ExperienceGallery';
import ExperienceLocations from '../components/experiences/ExperienceLocations';
import ExperienceWildlife from '../components/experiences/ExperienceWildlife';
import ExperienceConservation from '../components/experiences/ExperienceConservation';
import RelatedExperiences from '../components/experiences/RelatedExperiences';
import ExploreCTA from '../components/coast/ExploreCTA';
import VideoEmbed from '../components/shared/VideoEmbed';

export default function ExperienceDetailPage() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);
  useScrollReveal();

  useTrackRecentlyViewed(
    experience && {
      type: 'experience',
      slug: experience.slug,
      title: experience.title,
      subtitle: experience.categoryName,
      image: experience.heroImage,
      path: `/experiences/${experience.slug}`,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = experience
      ? `${experience.title} — Blue Ocean Ocean Experiences`
      : 'Experience Not Found — Blue Ocean Somalia';
  }, [experience]);

  if (!experience) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Compass size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Experience Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The ocean experience you are looking for is not currently published. Explore our full catalog of upcoming Somali coast activities.
          </p>
          <Link to="/experiences" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Ocean Experiences</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="experience-detail-page" aria-label={`Ocean Experience: ${experience.title}`}>
      <ExperienceHero experience={experience} />
      <ExperienceStory experience={experience} />
      <ExperienceGallery experience={experience} />
      {experience.videoUrl && (
        <section className="section container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <VideoEmbed
            url={experience.videoUrl}
            title={experience.title}
            videoTitle={experience.videoTitle}
            videoDescription={experience.videoDescription}
            videoSource={experience.videoSource}
          />
        </section>
      )}
      <ExperienceLocations experience={experience} />
      <ExperienceWildlife experience={experience} />
      <ExperienceConservation experience={experience} />
      <RelatedExperiences currentSlug={experience.slug} />
      <ExploreCTA />
    </main>
  );
}
