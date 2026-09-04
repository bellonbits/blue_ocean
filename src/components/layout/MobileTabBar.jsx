import { NavLink } from 'react-router-dom';
import { Home, Compass, Fish, User } from 'lucide-react';
import { isNative } from '../../lib/native';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './MobileTabBar.css';

const TABS = [
  { to: '', labelKey: 'mobileTabBar.home', icon: Home, end: true },
  { to: '/explore-the-coast', labelKey: 'mobileTabBar.explore', icon: Compass },
  { to: '/marine-life', labelKey: 'mobileTabBar.marineLife', icon: Fish },
];

export default function MobileTabBar() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { language, t } = useLanguage();

  if (!isNative()) return null;

  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  return (
    <nav className="mobile-tabbar" aria-label="Primary">
      {TABS.map(({ to, labelKey, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={`/${language}${to}`}
          end={end}
          className={({ isActive }) => `mobile-tabbar__item ${isActive ? 'mobile-tabbar__item--active' : ''}`}
        >
          <Icon size={20} strokeWidth={2.25} />
          <span>{t(labelKey)}</span>
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
        <span>{isAuthenticated ? t('auth.profile') : t('auth.signIn')}</span>
      </NavLink>
    </nav>
  );
}
