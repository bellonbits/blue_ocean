import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Library, Fish, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRecentlyViewed } from '../../lib/hooks';
import { listExperienceInterests } from '../../lib/dashboardApi';

const TYPE_LABEL = {
  destination: 'Destination',
  species: 'Marine Life',
  experience: 'Experience',
  research: 'Research',
};

export default function DashboardHomePage() {
  const { user, token, savedItems } = useAuth();
  const recentlyViewed = useRecentlyViewed();
  const firstName = user?.full_name?.split(' ')[0] || 'Explorer';
  const [experienceCount, setExperienceCount] = useState(0);

  useEffect(() => {
    document.title = 'My Dashboard — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) return;
    listExperienceInterests(token)
      .then((rows) => setExperienceCount(rows.length))
      .catch(() => {});
  }, [token]);

  const counts = useMemo(() => {
    const byType = { destination: 0, species: 0, research: 0 };
    savedItems.forEach((item) => {
      if (item.content_type in byType) byType[item.content_type] += 1;
    });
    return byType;
  }, [savedItems]);

  return (
    <div className="user-dash-page">
      <div className="user-dash-hero">
        <h1>Welcome back, {firstName}.</h1>
        <p>Continue exploring Somalia's blue frontier.</p>
      </div>

      <div className="user-dash-stats">
        <div className="user-dash-stat">
          <Heart size={18} />
          <span className="user-dash-stat__value">{counts.destination}</span>
          <span className="user-dash-stat__label">Saved Places</span>
        </div>
        <div className="user-dash-stat">
          <Fish size={18} />
          <span className="user-dash-stat__value">{counts.species}</span>
          <span className="user-dash-stat__label">Saved Species</span>
        </div>
        <div className="user-dash-stat">
          <BookOpen size={18} />
          <span className="user-dash-stat__value">{experienceCount}</span>
          <span className="user-dash-stat__label">Experiences</span>
        </div>
        <div className="user-dash-stat">
          <Library size={18} />
          <span className="user-dash-stat__value">{counts.research}</span>
          <span className="user-dash-stat__label">Research Items</span>
        </div>
      </div>

      <section className="user-dash-section">
        <h2>Continue Exploring</h2>

        {recentlyViewed.length === 0 ? (
          <div className="user-dash-empty">
            <Compass size={28} />
            <p>Nothing here yet — explore the coast, marine life, or research to see it show up.</p>
            <Link to="/explore-the-coast" className="btn btn-primary btn-sm">
              <span>Explore the Coast</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="user-dash-recent-grid">
            {recentlyViewed.map((item) => (
              <Link key={`${item.type}-${item.slug}`} to={item.path} className="user-dash-recent-card">
                <div className="user-dash-recent-card__media">
                  {item.image && <img src={item.image} alt="" loading="lazy" />}
                </div>
                <div className="user-dash-recent-card__body">
                  <span className="user-dash-recent-card__type">{TYPE_LABEL[item.type] || item.type}</span>
                  <h3>{item.title}</h3>
                  {item.subtitle && <p>{item.subtitle}</p>}
                  <span className="user-dash-recent-card__cta">
                    <span>Continue</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
