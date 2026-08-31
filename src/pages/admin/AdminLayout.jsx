import { useEffect } from 'react';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Waves, Fish, Microscope, ShieldCheck, Users, Newspaper,
  UserCircle2, Image, Mail, Settings as SettingsIcon, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { canManageAdmin } from './roles';
import './Admin.css';

// The locked Blue Ocean CMS sidebar — every entry the org will eventually
// need, even where the page isn't built yet (see ComingSoonPage). Keeping
// the full target IA visible now (rather than only linking what exists)
// is deliberate: it's what was locked in as the navigation shape.
const CONTENT_LINKS = [
  { to: '/dashboard/content/coast', label: 'Explore Coast', icon: MapPin, built: true },
  { to: '/dashboard/content/experiences', label: 'Ocean Experiences', icon: Waves, built: true },
  { to: '/dashboard/content/marine-life', label: 'Marine Life', icon: Fish, built: true },
  { to: '/dashboard/content/research', label: 'Research', icon: Microscope, built: true },
  { to: '/dashboard/content/conservation', label: 'Conservation', icon: ShieldCheck, built: true },
  { to: '/dashboard/content/communities', label: 'Communities', icon: Users, built: true },
  { to: '/dashboard/content/news', label: 'News', icon: Newspaper, built: true },
];

const ORG_LINKS = [
  { to: '/dashboard/team', label: 'Team', icon: UserCircle2, built: true },
  { to: '/dashboard/media', label: 'Media', icon: Image, built: true },
];

export default function AdminLayout() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) openAuthModal('login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = canManageAdmin(user);
  const roleDisplay = user?.role?.replace('_', ' ') || 'Member';
  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U');

  const renderLink = ({ to, label, icon: Icon, built }) =>
    built ? (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `admin__nav-link ${isActive || location.pathname.startsWith(to) ? 'admin__nav-link--active' : ''}`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </NavLink>
    ) : (
      <div key={to} className="admin__nav-link admin__nav-link--soon">
        <Icon size={18} />
        <span>{label}</span>
        <span className="admin__nav-soon-badge">Soon</span>
      </div>
    );

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <span className="admin__brand-mark">🌊</span>
          <span className="admin__brand-text">Blue Ocean</span>
        </div>

        <nav className="admin__nav" aria-label="Dashboard navigation">
          <NavLink to="/dashboard" end className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          {isAdmin && (
            <>
              <span className="admin__nav-heading">Content</span>
              {CONTENT_LINKS.map(renderLink)}

              <span className="admin__nav-heading">Organization</span>
              {ORG_LINKS.map(renderLink)}

              <span className="admin__nav-heading">Inbox</span>
              <NavLink to="/dashboard/inbox" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
                <Mail size={18} />
                <span>Messages</span>
              </NavLink>

              <span className="admin__nav-heading">&nbsp;</span>
              <NavLink to="/dashboard/settings" className={({ isActive }) => `admin__nav-link ${location.pathname.startsWith('/dashboard/settings') ? 'admin__nav-link--active' : ''}`}>
                <SettingsIcon size={18} />
                <span>Settings</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="admin__sidebar-user">
          <span className="admin__topbar-avatar">{initial}</span>
          <div>
            <div className="admin__topbar-name">{user?.full_name || user?.email}</div>
            <span className="admin__topbar-role">{roleDisplay}</span>
          </div>
        </div>

        <a href="/" className="admin__back-link">
          <ExternalLink size={15} />
          <span>Back to site</span>
        </a>
      </aside>

      <div className="admin__main">
        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
