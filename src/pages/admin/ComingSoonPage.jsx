import { Sparkles } from 'lucide-react';

// Shared placeholder for sidebar sections the locked IA reserves but that
// haven't been built yet (Phase 2 of the CMS plan) — keeps the full target
// navigation visible now instead of hiding unbuilt sections.
export default function ComingSoonPage({ title, description }) {
  return (
    <div>
      <h1 className="admin__title">{title}</h1>
      <p className="admin__subtitle">{description}</p>
      <div className="admin__empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '56px 24px' }}>
        <Sparkles size={28} color="var(--admin-primary)" />
        <div style={{ fontWeight: 700, color: 'var(--admin-text)' }}>Coming soon</div>
        <div>This section is on the roadmap and isn't built yet.</div>
      </div>
    </div>
  );
}
