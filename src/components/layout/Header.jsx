import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogIn, UserPlus, LogOut, User as UserIcon, ChevronDown, LayoutDashboard, UserCircle } from 'lucide-react';
import { navLinks, noHeroPaths } from '../../data/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, stripLangPrefix } from '../../context/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from '../../lib/i18n/translations';
import { canManageAdmin } from '../../pages/admin/roles';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  // Nav links always point into the localized route tree, regardless of
  // whether the current page happens to be one (e.g. viewed from /admin).
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  // Solid background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const currentPath = stripLangPrefix(location.pathname);

  const isActive = (path) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  const isNoHeroPage = noHeroPaths.includes(currentPath);
  const solidHeader = scrolled || isNoHeroPage;

  const desktopLogoSrc = !isDark && solidHeader ? '/logo_sky_blue.png' : '/logo.png';
  const mobileLogoSrc = isDark ? '/logo.png' : '/logo_sky_blue.png';

  const userInitial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U');
  const roleDisplay = user?.role?.replace('_', ' ') || 'Member';
  const dashboardHref = canManageAdmin(user) ? '/admin' : '/dashboard';

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${solidHeader ? 'header--scrolled' : ''}`}
        role="banner"
      >
        <div className="container header__inner">
          {/* Logo */}
          <Link to={localizedPath('/')} className="header__logo" aria-label="Blue Ocean Home">
            <img
              src={desktopLogoSrc}
              alt="Blue Ocean Somalia"
              className="header__logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            <ul className="header__nav-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={localizedPath(link.path)}
                    className={`header__nav-link ${isActive(link.path) ? 'header__nav-link--active' : ''}`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="header__actions">
            {/* Language Switcher */}
            <div className="lang-switch" role="group" aria-label={t('common.switchLanguage')}>
              {SUPPORTED_LANGUAGES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`lang-switch__option ${language === code ? 'lang-switch__option--active' : ''}`}
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  id={`lang-switch-${code}`}
                >
                  {LANGUAGE_LABELS[code].short}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              id="theme-toggle-btn"
            >
              <span className="theme-toggle__track">
                <span className="theme-toggle__thumb">
                  {isDark ? <Moon size={13} /> : <Sun size={13} />}
                </span>
              </span>
            </button>

            {/* Authentication Controls */}
            {isAuthenticated ? (
              <div className="header__user-menu" ref={userDropdownRef}>
                <button
                  className="header__user-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  id="user-profile-menu-toggle"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="header__user-avatar header__user-avatar--img" />
                  ) : (
                    <span className="header__user-avatar">{userInitial}</span>
                  )}
                  <span className="header__user-name">{user.full_name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown size={14} className={`header__user-chevron ${userDropdownOpen ? 'header__user-chevron--open' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="header__user-dropdown" role="menu">
                    <div className="header__user-dropdown-info">
                      <div className="header__user-dropdown-name">{user.full_name || 'Blue Ocean User'}</div>
                      <div className="header__user-dropdown-email">{user.email}</div>
                      <span className="header__user-dropdown-role badge badge-turquoise">{roleDisplay}</span>
                    </div>
                    <div className="header__user-dropdown-divider" />
                    <Link
                      to="/profile"
                      className="header__user-dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                      id="header-profile-link"
                    >
                      <UserCircle size={15} />
                      <span>{t('auth.myProfile')}</span>
                    </Link>
                    <Link
                      to={dashboardHref}
                      className="header__user-dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                      id="header-dashboard-link"
                    >
                      <LayoutDashboard size={15} />
                      <span>{t('auth.dashboard')}</span>
                    </Link>
                    <button
                      className="header__user-dropdown-item header__user-dropdown-item--logout"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={15} />
                      <span>{t('auth.logOut')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="header__auth-group">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm header__auth-login-btn"
                  onClick={() => openAuthModal('login')}
                  id="header-login-btn"
                >
                  <LogIn size={15} />
                  <span>{t('auth.logIn')}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm header__auth-register-btn"
                  onClick={() => openAuthModal('register')}
                  id="header-register-btn"
                >
                  <UserPlus size={15} />
                  <span>{t('auth.createAccount')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="header__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu__inner">
          {/* Mobile Header */}
          <div className="mobile-menu__header">
            <Link to={localizedPath('/')} className="header__logo" onClick={() => setMobileOpen(false)}>
              <img
                src={mobileLogoSrc}
                alt="Blue Ocean Somalia"
                className="header__logo-img"
              />
            </Link>
            <div className="mobile-menu__header-actions">
              {/* Language Switcher in mobile */}
              <div className="lang-switch" role="group" aria-label={t('common.switchLanguage')}>
                {SUPPORTED_LANGUAGES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`lang-switch__option ${language === code ? 'lang-switch__option--active' : ''}`}
                    onClick={() => setLanguage(code)}
                    aria-pressed={language === code}
                    id={`mobile-lang-switch-${code}`}
                  >
                    {LANGUAGE_LABELS[code].short}
                  </button>
                ))}
              </div>
              {/* Theme Toggle in mobile */}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                id="mobile-theme-toggle-btn"
              >
                <span className="theme-toggle__track">
                  <span className="theme-toggle__thumb">
                    {isDark ? <Moon size={13} /> : <Sun size={13} />}
                  </span>
                </span>
              </button>
              <button
                className="header__hamburger"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* User Status in Mobile */}
          {isAuthenticated && (
            <div className="mobile-menu__user-card">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" className="header__user-avatar header__user-avatar--img mobile-menu__user-avatar" />
              ) : (
                <div className="header__user-avatar mobile-menu__user-avatar">{userInitial}</div>
              )}
              <div className="mobile-menu__user-details">
                <div className="mobile-menu__user-name">{user.full_name || 'Blue Ocean User'}</div>
                <div className="mobile-menu__user-email">{user.email}</div>
                <span className="badge badge-turquoise" style={{ marginTop: '4px', fontSize: '0.72rem' }}>{roleDisplay}</span>
              </div>
            </div>
          )}

          {/* Mobile Nav Links */}
          <nav aria-label="Mobile navigation">
            <ul className="mobile-menu__list">
              {navLinks.map((link, i) => (
                <li
                  key={link.path}
                  className="mobile-menu__item"
                  style={{ animationDelay: `${i * 0.05 + 0.1}s` }}
                >
                  <Link
                    to={localizedPath(link.path)}
                    className={`mobile-menu__link ${isActive(link.path) ? 'mobile-menu__link--active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Auth & CTA Buttons */}
          <div className="mobile-menu__cta-group">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileOpen(false)}
                  id="mobile-profile-link"
                >
                  <UserCircle size={16} />
                  <span>{t('auth.myProfile')}</span>
                </Link>
                <Link
                  to={dashboardHref}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileOpen(false)}
                  id="mobile-dashboard-link"
                >
                  <LayoutDashboard size={16} />
                  <span>{t('auth.dashboard')}</span>
                </Link>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>{t('auth.logOut')}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setMobileOpen(false);
                    openAuthModal('register');
                  }}
                  id="mobile-register-cta"
                >
                  <UserPlus size={16} />
                  <span>{t('auth.createAccount')}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setMobileOpen(false);
                    openAuthModal('login');
                  }}
                  id="mobile-login-cta"
                >
                  <LogIn size={16} />
                  <span>{t('auth.logIn')}</span>
                </button>
              </>
            )}
          </div>

          {/* Decorative ocean wave */}
          <div className="mobile-menu__wave" aria-hidden="true" />
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
