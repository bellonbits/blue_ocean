import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useScrollReveal, useTrackRecentlyViewed } from '../lib/hooks';
import { useLanguage } from '../context/LanguageContext';
import { getDestination, listDestinations } from '../lib/contentApi';
// Species/research-project/experience domains aren't wired to the live API
// yet (Phase 2 of the CMS plan) — bridge those three sections from the
// static file by slug until they get their own live wiring.
import { destinations as staticDestinations } from '../data/destinations';
import DestinationHero from '../components/coast/DestinationHero';
import DestinationInfo from '../components/coast/DestinationInfo';
import DestinationGallery from '../components/coast/DestinationGallery';
import DestinationMarineLife from '../components/coast/DestinationMarineLife';
import DestinationResearch from '../components/coast/DestinationResearch';
import DestinationConservation from '../components/coast/DestinationConservation';
import DestinationExperiences from '../components/coast/DestinationExperiences';
import RelatedDestinations from '../components/coast/RelatedDestinations';
import DestinationRelatedNews from '../components/coast/DestinationRelatedNews';
import ExploreCTA from '../components/coast/ExploreCTA';
import VideoEmbed from '../components/shared/VideoEmbed';
import { ArrowLeft, Compass } from 'lucide-react';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [destination, setDestination] = useState(null);
  const [allDestinations, setAllDestinations] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Activate scroll reveal animations
  useScrollReveal();

  useTrackRecentlyViewed(
    destination && {
      type: 'destination',
      slug: destination.slug,
      title: destination.name,
      subtitle: destination.region,
      image: destination.heroImage,
      path: `/explore-the-coast/${destination.slug}`,
    }
  );

  useEffect(() => {
    let cancelled = false;
    setDestination(null);
    setNotFound(false);

    getDestination(slug, language)
      .then((d) => {
        if (cancelled) return;
        const bridge = staticDestinations.find((s) => s.slug === slug) || {};
        setDestination({
          ...d,
          marineSpecies: bridge.marineSpecies || [],
          researchProjects: bridge.researchProjects || [],
          experiences: bridge.experiences || [],
        });
      })
      .catch(() => { if (!cancelled) setNotFound(true); });

    listDestinations({ lang: language }).then((d) => { if (!cancelled) setAllDestinations(d); }).catch(() => {});

    return () => { cancelled = true; };
  }, [slug, language]);

  // 404 Fallback if destination slug not found
  if (notFound) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Compass size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Destination Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The coastal destination you are looking for has not been charted yet. Explore our full catalog of Somali coastal destinations.
          </p>
          <Link to={`/${language}/explore-the-coast`} className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Coastline Explorer</span>
          </Link>
        </div>
      </main>
    );
  }

  // Loading state — still waiting on the initial fetch
  if (!destination) {
    return <main style={{ minHeight: '70vh' }} />;
  }

  return (
    <main id="main-content" aria-label={`Destination Guide: ${destination.name}`}>
      {/* 1. Destination Hero */}
      <DestinationHero destination={destination} />

      {/* 2 & 3. Introduction Story Narrative + Technical Metadata Panel */}
      <DestinationInfo destination={destination} />

      {/* 4. Asymmetrical 3-Photo Editorial Gallery */}
      <DestinationGallery destination={destination} />

      {destination.videoUrl && (
        <section className="section container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <VideoEmbed
            url={destination.videoUrl}
            title={destination.name}
            videoTitle={destination.videoTitle}
            videoDescription={destination.videoDescription}
            videoSource={destination.videoSource}
          />
        </section>
      )}

      {/* 5. Marine Life Connected to this Destination */}
      <DestinationMarineLife destination={destination} />

      {/* 6. Active Scientific Research in this Region */}
      <DestinationResearch destination={destination} />

      {/* 6b. Conservation Work in this Region */}
      <DestinationConservation destination={destination} />

      {/* 7. Ocean Experiences & Field Activities */}
      <DestinationExperiences destination={destination} />

      {/* 7b. Real relationship-driven news coverage of this destination */}
      <DestinationRelatedNews slug={destination.slug} />

      {/* 8. Related Destinations along this Coast */}
      <RelatedDestinations currentDestination={destination} destinations={allDestinations} />

      {/* 9. Final Next Horizons CTA */}
      <ExploreCTA />
    </main>
  );
}
