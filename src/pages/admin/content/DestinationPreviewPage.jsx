import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useScrollReveal } from '../../../lib/hooks';
import { adminGetDestination, adaptDestination, listDestinations } from '../../../lib/contentApi';
import { destinations as staticDestinations } from '../../../data/destinations';
import { canManageAdmin } from '../roles';
import DestinationHero from '../../../components/coast/DestinationHero';
import DestinationInfo from '../../../components/coast/DestinationInfo';
import DestinationGallery from '../../../components/coast/DestinationGallery';
import DestinationMarineLife from '../../../components/coast/DestinationMarineLife';
import DestinationResearch from '../../../components/coast/DestinationResearch';
import DestinationConservation from '../../../components/coast/DestinationConservation';
import DestinationExperiences from '../../../components/coast/DestinationExperiences';
import RelatedDestinations from '../../../components/coast/RelatedDestinations';

// Admin-only: renders a draft/archived (or published) destination through
// the exact same public components the live site uses, sourced from the
// admin endpoint (any status) instead of the published-only public one —
// "what you'd see if this were published," without publishing it.
export default function DestinationPreviewPage() {
  const { user, token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = canManageAdmin(user);
  const [destination, setDestination] = useState(null);
  const [allDestinations, setAllDestinations] = useState([]);
  const [error, setError] = useState(null);

  useScrollReveal();

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    adminGetDestination(token, id)
      .then((raw) => {
        if (cancelled) return;
        const adapted = adaptDestination(raw);
        const bridge = staticDestinations.find((s) => s.slug === adapted.slug) || {};
        setDestination({
          ...adapted,
          marineSpecies: bridge.marineSpecies || [],
          researchProjects: bridge.researchProjects || [],
          experiences: bridge.experiences || [],
        });
      })
      .catch((err) => setError(err.message));
    listDestinations().then(setAllDestinations).catch(() => {});
    return () => { cancelled = true; };
  }, [isAdmin, token, id]);

  if (!isAdmin) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: '#64748B' }}>
        Your role ({user?.role?.replace('_', ' ')}) can't preview content.
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', paddingTop: 'var(--header-height)', isolation: 'isolate' }}>
      <div
        style={{
          position: 'sticky', top: 'var(--header-height)', zIndex: 50, display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 32px', background: '#1E52C4', color: '#fff',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          <span>Exit Preview</span>
        </button>
        <span style={{ opacity: 0.75, fontSize: '0.82rem' }}>
          Previewing {destination ? `“${destination.name}”` : '…'} — not visible to the public unless published.
        </span>
      </div>

      {error && (
        <div style={{ margin: 24, padding: '12px 16px', background: '#FDECEC', color: '#EF4444', borderRadius: 12 }}>
          {error}
        </div>
      )}

      {destination && (
        <main aria-label={`Preview: ${destination.name}`}>
          <DestinationHero destination={destination} />
          <DestinationInfo destination={destination} />
          <DestinationGallery destination={destination} />
          <DestinationMarineLife destination={destination} />
          <DestinationResearch destination={destination} />
          <DestinationConservation destination={destination} />
          <DestinationExperiences destination={destination} />
          <RelatedDestinations currentDestination={destination} destinations={allDestinations} />
        </main>
      )}
    </div>
  );
}
