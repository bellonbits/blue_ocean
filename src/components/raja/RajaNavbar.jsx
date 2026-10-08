import { useState } from 'react';
import { Search, X, Globe, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, stripLangPrefix } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { canManageAdmin } from '../../pages/admin/roles';

export const RAJA_NAV_LINKS = [
  { labelKey: 'nav.home', defaultLabel: 'Home', path: '/' },
  { labelKey: 'nav.tourism', defaultLabel: 'Tourism', path: '/tourism' },
  { labelKey: 'nav.exploreCoast', defaultLabel: 'Explore the Coast', path: '/explore-the-coast' },
  { labelKey: 'nav.oceanExperiences', defaultLabel: 'Ocean Experiences', path: '/experiences' },
  { labelKey: 'nav.marineLife', defaultLabel: 'Marine Life', path: '/marine-life' },
  { labelKey: 'nav.research', defaultLabel: 'Research', path: '/research' },
  { labelKey: 'nav.conservation', defaultLabel: 'Conservation', path: '/conservation' },
  { labelKey: 'nav.communities', defaultLabel: 'Communities', path: '/communities' },
  { labelKey: 'nav.news', defaultLabel: 'News', path: '/news' },
  { labelKey: 'nav.about', defaultLabel: 'About', path: '/about' },
  { labelKey: 'nav.contact', defaultLabel: 'Contact', path: '/contact' },
];

export default function RajaNavbar({ onOpenMenu, onGetStarted }) {
  const { language, setLanguage, t } = useLanguage();
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isSomali = language === 'so';
  const currentPath = stripLangPrefix(location.pathname);

  const localizedPath = (path) => `/${language}${path === '/' ? '' : path}`;
  const isActive = (path) =>
    path === '/' ? (currentPath === '/' || currentPath === '') : currentPath.startsWith(path);

  const getLabel = (link) => {
    const val = t(link.labelKey);
    return val && val !== link.labelKey ? val : link.defaultLabel;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/${language}/explore-the-coast?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'so' ? 'en' : 'so');
  };

  const dashboardHref = canManageAdmin(user) ? '/admin' : '/dashboard';

  return (
    <header className="raja-nav" role="navigation" aria-label="Main Navigation">
      {/* Brand Logo on the left */}
      <Link to={localizedPath('/')} className="raja-nav__brand" aria-label="Somalia Blue Heaven Home">
        <img
          src="/Somalia Blue Heaven Wave Logo.png"
          alt="Somalia Blue Heaven"
          className="raja-nav__brand-img"
        />
      </Link>

      {/* Center Nav Links */}
      <nav className="raja-nav__nav" aria-label="Site menu">
        <ul className="raja-nav__links">
          {RAJA_NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={localizedPath(link.path)}
                className={`raja-nav__link ${isActive(link.path) ? 'raja-nav__link--active' : ''}`}
              >
                {getLabel(link)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Actions: Language Switcher, Search, Dashboard (if auth), & CTA */}
      <div className="raja-nav__actions">
        {/* Language Switcher Toggle */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="raja-nav__lang-toggle"
          title={isSomali ? 'Switch to English' : 'U beddel Af-Soomaali'}
          aria-label="Toggle language"
        >
          <Globe size={13} color="#0284c7" />
          <span>{isSomali ? 'SO' : 'EN'}</span>
        </button>

        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} className="raja-nav__search-form">
            <Search size={14} color="#64748b" />
            <input
              type="text"
              placeholder={isSomali ? 'Raadi xeebaha...' : 'Search coast...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="raja-nav__search-input"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="raja-nav__search-close"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="raja-nav__search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label={isSomali ? 'Raadi' : 'Search'}
          >
            <Search size={15} />
            <span>{isSomali ? 'Raadi' : 'Search'}</span>
          </button>
        )}

        {isAuthenticated && (
          <Link
            to={dashboardHref}
            className="raja-nav__dashboard-btn"
            title={canManageAdmin(user) ? 'Admin CMS' : 'My Dashboard'}
          >
            <LayoutDashboard size={14} />
            <span>{canManageAdmin(user) ? 'Admin' : 'Dashboard'}</span>
          </Link>
        )}

        <button
          type="button"
          className="raja-nav__cta"
          onClick={onGetStarted}
        >
          {isSomali ? 'Bilow Socdaalka' : 'Get Started'}
        </button>
      </div>
    </header>
  );
}
