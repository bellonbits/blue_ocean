import { useState, useEffect } from 'react';
import { NavLink, Navigate, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Fish, Waves, Microscope, Heart, BookOpen, Library,
  HandHeart, Mail, UserCircle2, Settings as SettingsIcon, LogOut, Menu, X, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const EXPLORE_LINKS = [
  { to: '/explore-the-coast', label: 'Explore Coast', icon: MapPin },
  { to: '/marine-life', label: 'Marine Life', icon: Fish },
  { to: '/experiences', label: 'Experiences', icon: Waves },
  { to: '/research', label: 'Research', icon: Microscope },
];

const MY_OCEAN_LINKS = [
  { to: '/dashboard/saved', label: 'Saved', icon: Heart },
  { to: '/dashboard/experiences', label: 'My Experiences', icon: BookOpen },
  { to: '/dashboard/research', label: 'My Research', icon: Library },
];

const ENGAGEMENT_LINKS = [
  { to: '/dashboard/get-involved', label: 'Get Involved', icon: HandHeart },
  { to: '/dashboard/messages', label: 'Messages', icon: Mail },
];

const ACCOUNT_LINKS = [
  { to: '/dashboard/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/profile', label: 'Settings', icon: SettingsIcon },
];

export default function DashboardLayout() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) openAuthModal('login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U');
  const firstName = user?.full_name?.split(' ')[0] || 'Explorer';

  const closeMobile = () => setMobileOpen(false);

  const renderGroup = (title, links) => (
    <div className="user-dash__group">
      <span className="user-dash__group-title">{title}</span>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/dashboard'}
          onClick={closeMobile}
          className={({ isActive }) => `user-dash__link ${isActive ? 'user-dash__link--active' : ''}`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );

  return (
    <div className={`user-dash ${mobileOpen ? 'user-dash--mobile-open' : ''}`}>
      <button className="user-dash__mobile-toggle" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        <span>Menu</span>
      </button>

      {mobileOpen && <div className="user-dash__scrim" onClick={closeMobile} />}

      <aside className="user-dash__sidebar">
        <Link to="/dashboard" className="user-dash__brand" onClick={closeMobile}>
          <span className="user-dash__brand-mark">🌊</span>
          <span>Blue Ocean</span>
        </Link>

        <nav className="user-dash__nav" aria-label="Dashboard navigation">
          <NavLink to="/dashboard" end onClick={closeMobile} className={({ isActive }) => `user-dash__link ${isActive ? 'user-dash__link--active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          {renderGroup('Explore', EXPLORE_LINKS)}
          {renderGroup('My Blue Ocean', MY_OCEAN_LINKS)}
          {renderGroup('Engagement', ENGAGEMENT_LINKS)}
          {renderGroup('Account', ACCOUNT_LINKS)}
        </nav>

        <div className="user-dash__footer">
          <Link to="/dashboard/profile" className="user-dash__user" onClick={closeMobile}>
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="" className="user-dash__user-avatar-img" />
            ) : (
              <span className="user-dash__user-avatar">{initial}</span>
            )}
            <div>
              <div className="user-dash__user-name">{firstName}</div>
              <span className="user-dash__user-tag">Ocean Explorer</span>
            </div>
          </Link>

          <button className="user-dash__signout" onClick={logout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>

          <a href="/" className="user-dash__back-link">
            <ExternalLink size={13} />
            <span>Back to site</span>
          </a>
        </div>
      </aside>

      <div className="user-dash__main">
        <Outlet />
      </div>
    </div>
  );
}
