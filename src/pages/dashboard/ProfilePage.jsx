import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateInterests } from '../../lib/dashboardApi';

const OCEAN_INTERESTS = [
  { value: 'coral-reefs', label: 'Coral Reefs' },
  { value: 'sea-turtles', label: 'Sea Turtles' },
  { value: 'dolphins-whales', label: 'Dolphins & Whales' },
  { value: 'sharks-rays', label: 'Sharks & Rays' },
  { value: 'coastal-communities', label: 'Coastal Communities' },
  { value: 'marine-research', label: 'Marine Research' },
  { value: 'sustainable-fishing', label: 'Sustainable Fishing' },
  { value: 'illegal-fishing', label: 'Illegal Fishing & Enforcement' },
  { value: 'diving-snorkeling', label: 'Diving & Snorkeling' },
  { value: 'mangroves', label: 'Mangroves' },
];

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [interests, setInterests] = useState(user?.interests || []);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved

  useEffect(() => {
    document.title = 'Profile — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setInterests(user?.interests || []);
  }, [user?.interests]);

  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U');

  const toggleInterest = async (value) => {
    const next = interests.includes(value) ? interests.filter((v) => v !== value) : [...interests, value];
    setInterests(next);
    setSaveState('saving');
    try {
      await updateInterests(token, next);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1500);
    } catch {
      setSaveState('idle');
    }
  };

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>Profile</h1>
        <p>Your Blue Ocean identity and what you care most about.</p>
      </div>

      <div className="user-dash-profile-card">
        {user?.avatar_url ? (
          <img src={user.avatar_url} alt="" className="user-dash-profile-card__avatar-img" />
        ) : (
          <div className="user-dash-profile-card__avatar">{initial}</div>
        )}
        <div className="user-dash-profile-card__body">
          <h2>{user?.full_name || 'Ocean Explorer'}</h2>
          <p>{user?.email}</p>
        </div>
        <Link to="/profile" className="btn btn-secondary btn-sm user-dash-profile-card__edit">
          <Settings size={15} />
          <span>Account Settings</span>
        </Link>
      </div>

      <section className="user-dash-section">
        <div className="user-dash-interests-header">
          <h2>Ocean Interests</h2>
          {saveState === 'saving' && (
            <span className="user-dash-interests-status"><Loader2 size={13} className="user-dash-spin" /> Saving…</span>
          )}
          {saveState === 'saved' && (
            <span className="user-dash-interests-status user-dash-interests-status--saved"><CheckCircle2 size={13} /> Saved</span>
          )}
        </div>
        <p className="user-dash-interests-desc">
          Pick what you care about most — we'll use this to shape what we highlight for you over time.
        </p>

        <div className="user-dash-interests-grid">
          {OCEAN_INTERESTS.map(({ value, label }) => {
            const active = interests.includes(value);
            return (
              <button
                key={value}
                type="button"
                className={`user-dash-interest-chip ${active ? 'user-dash-interest-chip--active' : ''}`}
                onClick={() => toggleInterest(value)}
                aria-pressed={active}
              >
                {active && <CheckCircle2 size={14} />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
