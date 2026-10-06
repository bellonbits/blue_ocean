import { useState } from 'react';
import { Menu, Search, X, Compass, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RajaNavbar({ onOpenMenu, onGetStarted }) {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isSomali = language === 'so';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <header className="raja-nav" role="navigation" aria-label="Main Navigation">
      {/* Left Menu Button */}
      <button
        type="button"
        className="raja-nav__menu-btn"
        onClick={onOpenMenu}
        aria-label={isSomali ? 'Fur Liiska' : 'Open Navigation Menu'}
      >
        <Menu size={18} />
        <span>{isSomali ? 'Liiska' : 'Menu'}</span>
      </button>

      {/* Center Links - No Pricing */}
      <nav className="raja-nav__nav">
        <ul className="raja-nav__links">
          <li>
            <button
              type="button"
              className="raja-nav__link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => scrollTo('about-archipelago')}
            >
              {isSomali ? 'Ku Saabsan' : 'About'}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="raja-nav__link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => scrollTo('discover-destination')}
            >
              {isSomali ? 'Gobollada' : 'Regions'}
            </button>
          </li>
          <li>
            <Link to={`/${language}/research`} className="raja-nav__link">
              {isSomali ? 'Cilmibaaris' : 'Research'}
            </Link>
          </li>
          <li>
            <Link to={`/${language}/contact`} className="raja-nav__link">
              {isSomali ? 'Xiriir' : 'Contact'}
            </Link>
          </li>
          <li>
            <Link
              to={`/${language}/explore-the-coast`}
              className="raja-nav__link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0284c7', fontWeight: 600 }}
            >
              <Compass size={14} />
              <span>{isSomali ? 'Sahami Xeebaha' : 'Explore Coast'}</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Actions: Language Switcher, Search & CTA */}
      <div className="raja-nav__actions">
        {/* Language Switcher Toggle */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="raja-nav__lang-toggle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 10px',
            borderRadius: 9999,
            border: '1px solid rgba(0, 0, 0, 0.12)',
            background: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.76rem',
            fontWeight: 700,
            color: '#0f172a',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={isSomali ? 'Switch to English' : 'U beddel Af-Soomaali'}
          aria-label="Toggle language"
        >
          <Globe size={13} color="#0284c7" />
          <span>{isSomali ? 'SO' : 'EN'}</span>
        </button>

        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f1f5f9', padding: '4px 12px', borderRadius: 9999 }}>
            <Search size={14} color="#64748b" />
            <input
              type="text"
              placeholder={isSomali ? 'Raadi xeebaha...' : 'Search coast...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.84rem', width: 130 }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}
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
