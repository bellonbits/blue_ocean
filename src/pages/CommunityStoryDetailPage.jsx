import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getCommunityStoryBySlug, getCommunityBySlug } from '../data/communities';
import CommunityStoryHero from '../components/communities/CommunityStoryHero';
import CommunityStoryBody from '../components/communities/CommunityStoryBody';
import CommunityLivelihoods from '../components/communities/CommunityLivelihoods';
import CommunityOceanConnection from '../components/communities/CommunityOceanConnection';
import CommunityGallery from '../components/communities/CommunityGallery';
import RelatedStories from '../components/communities/RelatedStories';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import VideoEmbed from '../components/shared/VideoEmbed';

export default function CommunityStoryDetailPage() {
  const { slug } = useParams();
  const story = getCommunityStoryBySlug(slug);
  const community = story ? getCommunityBySlug(story.communitySlug) : null;
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = story
      ? `${story.title} — Blue Ocean Coastal Communities`
      : 'Story Not Found — Blue Ocean Somalia';
  }, [story]);

  if (!story) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Users size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Story Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The community story you are looking for is not currently published. Explore our full collection of
            coastal community stories.
          </p>
          <Link to="/communities" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Coastal Communities</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="community-story-detail-page" aria-label={story.title}>
      <CommunityStoryHero story={story} />
      <CommunityStoryBody story={story} community={community} />
      <CommunityLivelihoods community={community} />
      <CommunityOceanConnection story={story} />
      <CommunityGallery community={community} story={story} />
      {story.videoUrl && (
        <section className="section container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <VideoEmbed
            url={story.videoUrl}
            title={story.title}
            videoTitle={story.videoTitle}
            videoDescription={story.videoDescription}
            videoSource={story.videoSource}
          />
        </section>
      )}
      <RelatedStories currentSlug={story.slug} />
      <GetInvolvedCTA />
    </main>
  );
}
