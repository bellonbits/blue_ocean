import { createContext, useContext, useEffect } from 'react';
import { syncStatusBarWithTheme } from '../lib/native';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
    syncStatusBarWithTheme(false);
    try {
      localStorage.setItem('blue_ocean_theme', 'light');
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    // No-op: strictly light theme requested
  };

  const setTheme = () => {
    // No-op: strictly light theme requested
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        setTheme,
        toggleTheme,
        isDark: false,
        isLight: true,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
