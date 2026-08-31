import { Briefcase, ShieldCheck } from 'lucide-react';
import '../research/ResearchMethodology.css';

export default function CommunityLivelihoods({ community }) {
  if (!community) return null;
  const { livelihoods = [], conservationActivities = [] } = community;
  if (livelihoods.length === 0 && conservationActivities.length === 0) return null;

  return (
    <section className="research-method section" aria-labelledby="community-livelihoods-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">LIVELIHOOD & ROLE</span>
          <div className="divider" />
          <h2 className="section-heading" id="community-livelihoods-heading">
            How they live, how they protect.
          </h2>
        </div>

        {livelihoods.length > 0 && (
          <>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
              Livelihoods
            </p>
            <div className="research-method__grid reveal" style={{ marginBottom: conservationActivities.length ? 'var(--space-10)' : 0 }}>
              {livelihoods.map((l, i) => (
                <div key={i} className="research-method__tag">
                  <div className="research-method__tag-icon">
                    <Briefcase size={20} />
                  </div>
                  <span className="research-method__tag-label">{l}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {conservationActivities.length > 0 && (
          <>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
              Conservation Activities
            </p>
            <div className="research-method__grid reveal">
              {conservationActivities.map((a, i) => (
                <div key={i} className="research-method__tag">
                  <div className="research-method__tag-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="research-method__tag-label">{a}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
