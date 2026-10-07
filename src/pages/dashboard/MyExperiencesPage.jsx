import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, X, Waves } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listExperienceInterests, updateExperienceInterest, deleteExperienceInterest } from '../../lib/dashboardApi';
import { getExperienceBySlug } from '../../data/experiences';
import { useLanguage } from '../../context/LanguageContext';

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'interested', label: 'Interested' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
];

const STATUS_LABEL = { interested: 'Interested', upcoming: 'Upcoming', completed: 'Completed' };

export default function MyExperiencesPage() {
  const { token } = useAuth();
  const { language } = useLanguage();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = 'My Experiences — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) return;
    listExperienceInterests(token)
      .then(setInterests)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const handleStatusChange = async (id, status) => {
    setInterests((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    try {
      await updateExperienceInterest(token, id, status);
    } catch {
      // Non-fatal — a page refresh will resync from the server.
    }
  };

  const handleRemove = async (id) => {
    setInterests((prev) => prev.filter((i) => i.id !== id));
    try {
      await deleteExperienceInterest(token, id);
    } catch {
      // Non-fatal.
    }
  };

  const rows = useMemo(
    () =>
      interests
        .filter((i) => activeTab === 'all' || i.status === activeTab)
        .map((i) => ({ interest: i, experience: getExperienceBySlug(i.experience_slug, language) }))
        .filter((row) => row.experience),
    [interests, activeTab, language]
  );

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>My Experiences</h1>
        <p>Ocean experiences you're interested in, planning, or have already done.</p>
      </div>

      <div className="user-dash-tabs">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`user-dash-tab ${activeTab === key ? 'user-dash-tab--active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span>{label}</span>
          </button>
        ))}
      </div>

      {!loading && rows.length === 0 ? (
        <div className="user-dash-empty">
          <BookOpen size={28} />
          <p>No experiences tracked yet — visit any Ocean Experience and mark it Interested, Upcoming, or Completed.</p>
          <Link to="/experiences" className="btn btn-primary btn-sm">
            <span>Browse Experiences</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="user-dash-exp-list">
          {rows.map(({ interest, experience }) => (
            <div key={interest.id} className="user-dash-exp-row">
              <div className="user-dash-exp-row__media">
                {experience.heroImage ? <img src={experience.heroImage} alt="" loading="lazy" /> : <Waves size={20} />}
              </div>
              <div className="user-dash-exp-row__body">
                <Link to={`/experiences/${experience.slug}`} className="user-dash-exp-row__title">
                  {experience.title}
                </Link>
                <span className="user-dash-exp-row__sub">{experience.categoryName}</span>
              </div>
              <select
                className="user-dash-exp-row__status"
                value={interest.status}
                onChange={(e) => handleStatusChange(interest.id, e.target.value)}
              >
                {Object.entries(STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                type="button"
                className="user-dash-exp-row__remove"
                aria-label="Stop tracking this experience"
                onClick={() => handleRemove(interest.id)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
