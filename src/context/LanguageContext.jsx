import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import translations, { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../lib/i18n/translations';
import { useAuth } from './AuthContext';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'blue_ocean_lang';

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const code = (candidate || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(code)) return code;
  }
  return DEFAULT_LANGUAGE;
}

function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// The two localized public route trees live at /en/... and /so/... (see
// App.jsx) — everything else (admin, dashboard, profile) is unprefixed, so
// stripping/adding a prefix only ever touches those two segments.
export function stripLangPrefix(pathname) {
  const match = pathname.match(/^\/(en|so)(\/.*|$)/);
  return match ? match[2] || '/' : pathname;
}

export function pathHasLangPrefix(pathname) {
  return /^\/(en|so)(\/|$)/.test(pathname);
}

export function LanguageProvider({ children }) {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
    } catch {
      // localStorage unavailable (private mode, etc.) — fall through to detection.
    }
    return detectBrowserLanguage();
  });

  // The URL is the source of truth once it carries a language segment —
  // a direct visit, a shared link, or browser back/forward to /so/... must
  // render in Somali even if localStorage/the account says otherwise.
  // (setLanguage below does the reverse: state change -> URL update.)
  useLayoutEffect(() => {
    const match = location.pathname.match(/^\/(en|so)(\/|$)/);
    if (match && match[1] !== language) {
      setLanguageState(match[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // A logged-in user's saved preference wins over whatever was detected/
  // stored locally, so their language follows them across devices.
  useEffect(() => {
    if (isAuthenticated && user?.preferred_language && SUPPORTED_LANGUAGES.includes(user.preferred_language)) {
      setLanguageState(user.preferred_language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.preferred_language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Non-fatal — the language just won't be remembered next visit.
    }
  }, [language]);

  const persistToAccount = useCallback(
    async (lang) => {
      if (!isAuthenticated || !token) return;
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        await fetch(`${API_BASE_URL}/api/v1/auth/me/language`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ preferred_language: lang }),
        });
      } catch {
        // Non-fatal — the choice still applies for this session via localStorage.
      }
    },
    [isAuthenticated, token]
  );

  const setLanguage = useCallback(
    (lang) => {
      if (!SUPPORTED_LANGUAGES.includes(lang) || lang === language) return;
      setLanguageState(lang);
      persistToAccount(lang);

      // Swap the /en or /so segment of the current URL in place, if present,
      // so switching languages keeps you on the same page.
      if (pathHasLangPrefix(location.pathname)) {
        const rest = stripLangPrefix(location.pathname);
        navigate(`/${lang}${rest === '/' ? '' : rest}${location.search}`, { replace: true });
      }
    },
    [language, persistToAccount, location.pathname, location.search, navigate]
  );

  const t = useCallback(
    (path, ...args) => {
      let value = getPath(translations[language], path);
      if (value === undefined) value = getPath(translations[DEFAULT_LANGUAGE], path);
      if (typeof value === 'function') return value(...args);
      return value ?? path;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
