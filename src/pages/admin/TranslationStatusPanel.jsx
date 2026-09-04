import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminListDestinations } from '../../lib/contentApi';

// Honest completeness dashboard — only Destinations actually has the
// translations pipeline built (see BLUE_OCEAN_BACKLOG.md 10.2); the rest
// are listed as pending rather than faked with placeholder ✓ marks, so
// the content team knows what's real vs. still on the roadmap.
const PENDING_RESOURCES = [
  'Homepage', 'Marine Life', 'Research', 'Conservation', 'Communities', 'News',
];

export default function TranslationStatusPanel() {
  const { token } = useAuth();
  const [destinations, setDestinations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminListDestinations(token).then(setDestinations).catch((err) => setError(err.message));
  }, [token]);

  const translatedCount = destinations
    ? destinations.filter((d) => d.translations?.some((t) => t.language === 'so' && t.title)).length
    : null;

  return (
    <div className="admin__form-section" style={{ marginTop: 'var(--space-6)' }}>
      <div className="admin__form-section">Translation Status</div>
      <table className="admin__table" style={{ maxWidth: 480 }}>
        <thead>
          <tr>
            <th>Content Type</th>
            <th>EN</th>
            <th>SO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Explore the Coast (Destinations)</td>
            <td>✓</td>
            <td>
              {error ? '—' : destinations === null ? '…' : `${translatedCount}/${destinations.length}`}
            </td>
          </tr>
          {PENDING_RESOURCES.map((label) => (
            <tr key={label}>
              <td>{label}</td>
              <td>✓</td>
              <td style={{ color: 'var(--admin-text-dim)' }}>Pending — not yet wired to translations</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
