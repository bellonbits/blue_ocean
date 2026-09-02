import { NavLink } from 'react-router-dom';
import { Home, Compass, Fish, User } from 'lucide-react';
import { isNative } from '../../lib/native';
import { useAuth } from '../../context/AuthContext';
import './MobileTabBar.css';

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/explore-the-coast', label: 'Explore', icon: Compass },
  { to: '/marine-life', label: 'Marine Life', icon: Fish },
];

export default function MobileTabBar() {
  const { isAuthenticated, openAuthModal } = useAuth();

  if (!isNative()) return null;

  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  return (
    <nav className="mobile-tabbar" aria-label="Primary">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `mobile-tabbar__item ${isActive ? 'mobile-tabbar__item--active' : ''}`}
        >
          <Icon size={20} strokeWidth={2.25} />
          <span>{label}</span>
        </NavLink>
      ))}
      <NavLink
        to="/profile"
        onClick={handleProfileClick}
        className={({ isActive }) =>
          `mobile-tabbar__item ${isActive && isAuthenticated ? 'mobile-tabbar__item--active' : ''}`
        }
      >
        <User size={20} strokeWidth={2.25} />
        <span>{isAuthenticated ? 'Profile' : 'Sign In'}</span>
      </NavLink>
    </nav>
  );
}
