import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  LogIn,
  LogOut,
  UserCircle,
  LayoutDashboard,
  ArrowRight,
  ChevronDown,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, stripLangPrefix } from '../../context/LanguageContext';
import { canManageAdmin } from '../../pages/admin/roles';
import './Header.css';

// Main navigation tabs for all pages
export const MAIN_NAV_LINKS = [
  { path: '/', labelEn: 'Home', labelSo: 'Hoy' },
  { path: '/tourism', labelEn: 'Tourism', labelSo: 'Dalxiiska' },
  { path: '/explore-the-coast', labelEn: 'Explore the Coast', labelSo: 'Sahmi Xeebta' },
  { path: '/experiences', labelEn: 'Ocean Experiences', labelSo: 'Khibradaha Badda' },
  { path: '/marine-life', labelEn: 'Marine Life', labelSo: 'Noolaha Badda' },
  { path: '/research', labelEn: 'Research', labelSo: 'Cilmi-Baaris' },
  { path: '/about', labelEn: 'About', labelSo: 'Nagu Saabsan' },
];

// All drawer links for mobile
const ALL_DRAWER_LINKS = [
  { path: '/', labelEn: 'Home', labelSo: 'Hoy' },
  { path: '/tourism', labelEn: 'Tourism', labelSo: 'Dalxiiska' },
  { path: '/explore-the-coast', labelEn: 'Explore the Coast', labelSo: 'Sahmi Xeebta' },
  { path: '/experiences', labelEn: 'Ocean Experiences', labelSo: 'Khibradaha Badda' },
  { path: '/marine-life', labelEn: 'Marine Life', labelSo: 'Noolaha Badda' },
  { path: '/research', labelEn: 'Research & Conservation', labelSo: 'Cilmi-Baaris & Ilaalin' },
  { path: '/communities', labelEn: 'Coastal Communities', labelSo: 'Bulshooyinka Xeebta' },
  { path: '/about', labelEn: 'About Somalia Blue Heaven', labelSo: 'Nagu Saabsan' },
  { path: '/contact', labelEn: 'Contact', labelSo: 'Xiriir' },
];

// Quick destinations for search modal
const SEARCH_SUGGESTIONS = [
  { title: 'Ras Hafun Peninsula', region: 'Puntland', path: '/explore-the-coast/hafun' },
  { title: 'Bosaso Harbor & Shelf', region: 'Puntland', path: '/explore-the-coast/bosaso' },
  { title: 'Dooxada Eyl Gorge', region: 'Puntland', path: '/explore-the-coast/eyl' },
  { title: 'Cape Guardafui Horn', region: 'Puntland', path: '/explore-the-coast/guardafui' },
  { title: 'Bajuni Coral Atolls', region: 'Jubaland', path: '/explore-the-coast/kismayo' },
  { title: 'Kismayo White Sands', region: 'Jubaland', path: '/explore-the-coast/kismayo' },
  { title: 'Liido Historic Seashore', region: 'Benadir', path: '/explore-the-coast/mogadishu' },
  { title: 'Jazira Coral Lagoon', region: 'Benadir', path: '/explore-the-coast/mogadishu' },
  { title: 'Zeila Coral Archipelago', region: 'Somaliland', path: '/explore-the-coast/zeila' },
  { title: 'Berbera Deep Bay', region: 'Somaliland', path: '/explore-the-coast/berbera' },
  { title: 'Hobyo Ancient Seaport', region: 'Galmudug', path: '/explore-the-coast/hobyo' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const isSomali = language === 'so';
  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;

  // Transparent initially over hero, blurred backdrop when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Close dropdown / search on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent body scroll when mobile menu or search is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  const currentPath = stripLangPrefix(location.pathname);
  const isActive = (path) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'so' : 'en');
  };

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_SUGGESTIONS;

  const handleSelectSuggestion = (path) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(localizedPath(path));
  };

  const userInitial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U');
  const roleDisplay = user?.role?.replace('_', ' ') || 'Member';
  const dashboardHref = canManageAdmin(user) ? '/admin' : '/dashboard';

  return (
    <>
      <header
        ref={headerRef}
        className={`travel-header ${scrolled ? 'travel-header--scrolled' : 'travel-header--transparent'}`}
        role="banner"
      >
        <div className="travel-header__inner">
          {/* Somalia Blue Heaven Brand Logo */}
          <Link
            to={localizedPath('/')}
            className="travel-header__brand"
            aria-label="Somalia Blue Heaven Home"
          >
            <img
              src="/Somalia Blue Heaven Wave Logo.png"
              alt="Somalia Blue Heaven"
              className="travel-header__brand-logo"
            />
          </Link>

          {/* Desktop Nav: All Tabs and Pages as Main Header */}
          <nav className="travel-header__nav" aria-label="Main site navigation">
            <ul className="travel-header__nav-list">
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.path} className="travel-header__nav-item">
                  <Link
                    to={localizedPath(link.path)}
                    className={`travel-header__nav-link ${isActive(link.path) ? 'travel-header__nav-link--active' : ''}`}
                  >
                    {isSomali ? link.labelSo : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Controls: 'en - so' Language Toggle & Circular Frosted Search Button */}
          <div className="travel-header__actions">
            {/* Minimalist 'en - so' switch */}
            <button
              type="button"
              className="travel-header__lang-toggle"
              onClick={toggleLanguage}
              aria-label={`Current language: ${language}. Click to switch.`}
              id="header-lang-toggle"
            >
              <span className={`travel-header__lang-code ${language === 'en' ? 'travel-header__lang-code--active' : ''}`}>
                en
              </span>
              <span className="travel-header__lang-sep"> - </span>
              <span className={`travel-header__lang-code ${language === 'so' ? 'travel-header__lang-code--active' : ''}`}>
                so
              </span>
            </button>

            {/* Circular Frosted Glass Search Button */}
            <button
              type="button"
              className="travel-header__circle-btn travel-header__search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search destinations"
              title="Search destinations"
              id="header-search-btn"
            >
              <Search size={16} />
            </button>

            {/* Auth User Menu or Sign In */}
            {isAuthenticated ? (
              <div className="travel-header__user-wrap" ref={userDropdownRef}>
                <button
                  type="button"
                  className="travel-header__circle-btn travel-header__user-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User account menu"
                  id="header-user-menu"
                >
                  <span className="travel-header__avatar">{userInitial}</span>
                </button>

                {userDropdownOpen && (
                  <div className="travel-header__dropdown" role="menu">
                    <div className="travel-header__dropdown-info">
                      <div className="travel-header__dropdown-name">{user.full_name || 'Explorer'}</div>
                      <div className="travel-header__dropdown-email">{user.email}</div>
                      <span className="badge badge-turquoise">{roleDisplay}</span>
                    </div>
                    <div className="travel-header__dropdown-divider" />
                    <Link
                      to="/profile"
                      className="travel-header__dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <UserCircle size={14} />
                      <span>{t('auth.myProfile')}</span>
                    </Link>
                    <Link
                      to={dashboardHref}
                      className="travel-header__dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LayoutDashboard size={14} />
                      <span>{t('auth.dashboard')}</span>
                    </Link>
                    <button
                      type="button"
                      className="travel-header__dropdown-item travel-header__dropdown-item--logout"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={14} />
                      <span>{t('auth.logOut')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="travel-header__circle-btn travel-header__login-btn"
                onClick={() => openAuthModal('login')}
                title={t('auth.logIn')}
                aria-label={t('auth.logIn')}
                id="header-login-btn"
              >
                <LogIn size={15} />
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="travel-header__hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-travel-drawer"
              id="header-mobile-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Frosted Glass Search Modal */}
      {searchOpen && (
        <div className="travel-search-modal" role="dialog" aria-modal="true" aria-label="Search Somalia Blue Heaven">
          <div className="travel-search-modal__backdrop" onClick={() => setSearchOpen(false)} />
          <div className="travel-search-modal__card">
            <div className="travel-search-modal__top">
              <Search size={18} className="travel-search-modal__icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="travel-search-modal__input"
                placeholder={isSomali ? 'Raadi xeebaha, jasiiradaha, ama goobaha...' : 'Search destinations, atolls, coastlines...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="travel-search-modal__close-btn"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="travel-search-modal__body">
              <div className="travel-search-modal__heading">
                {searchQuery.trim() ? (isSomali ? 'Natiijooyinka' : 'Matching Destinations') : (isSomali ? 'Goobaha Caanka Ah' : 'Featured Destinations')}
              </div>
              <div className="travel-search-modal__list">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      className="travel-search-modal__item"
                      onClick={() => handleSelectSuggestion(item.path)}
                    >
                      <MapPin size={15} className="travel-search-modal__pin" />
                      <div className="travel-search-modal__info">
                        <span className="travel-search-modal__title">{item.title}</span>
                        <span className="travel-search-modal__region">{item.region}</span>
                      </div>
                      <ArrowRight size={14} className="travel-search-modal__arrow" />
                    </button>
                  ))
                ) : (
                  <div className="travel-search-modal__empty">
                    {isSomali ? 'Wax natiijo ah lama helin.' : 'No destinations found.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-travel-drawer"
        className={`travel-mobile-drawer ${mobileOpen ? 'travel-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="travel-mobile-drawer__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="travel-mobile-drawer__panel">
          <div className="travel-mobile-drawer__header">
            <Link
              to={localizedPath('/')}
              className="travel-header__brand"
              onClick={() => setMobileOpen(false)}
              aria-label="Somalia Blue Heaven Home"
            >
              <img
                src="/Somalia Blue Heaven Wave Logo.png"
                alt="Somalia Blue Heaven"
                className="travel-header__brand-logo"
              />
            </Link>
            <button
              type="button"
              className="travel-mobile-drawer__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="travel-mobile-drawer__nav">
            {ALL_DRAWER_LINKS.map((link) => (
              <Link
                key={link.path}
                to={localizedPath(link.path)}
                className={`travel-mobile-drawer__link ${isActive(link.path) ? 'travel-mobile-drawer__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{isSomali ? link.labelSo : link.labelEn}</span>
                <ArrowRight size={14} className="travel-mobile-drawer__arrow" />
              </Link>
            ))}
          </nav>

          <div className="travel-mobile-drawer__footer">
            <div className="travel-mobile-drawer__row">
              <button
                type="button"
                className="travel-header__lang-toggle"
                onClick={toggleLanguage}
              >
                <span className={language === 'en' ? 'travel-header__lang-code--active' : ''}>en</span>
                <span> - </span>
                <span className={language === 'so' ? 'travel-header__lang-code--active' : ''}>so</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
