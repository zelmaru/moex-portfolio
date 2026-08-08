import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';
import { storage } from '#imports';

/**
 * Valid application theme modes.
 */
const Mode = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

type Mode = (typeof Mode)[keyof typeof Mode];

interface ThemeContext {
  /** True if the active theme is dark. */
  isDark: boolean;
  /** Toggles between light and dark modes and saves the preference. */
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

// Track user system preference for dark mode
const media = window.matchMedia('(prefers-color-scheme: dark)');
const subscribe = (cb: () => void) => {
  media.addEventListener('change', cb);
  return () => {
    media.removeEventListener('change', cb);
  };
};

/**
 * Manages application themes and syncs preferences with extension storage.
 *
 * Note: If the user manually selects a light or dark theme, the provider
 * overrides and ignores any future system-level theme changes.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Mode>(Mode.SYSTEM);
  const [isLoading, setIsLoading] = useState(true);

  // Match system preferences
  const isSystemDark = useSyncExternalStore(subscribe, () => media.matches);
  const isDark = mode === Mode.SYSTEM ? isSystemDark : mode === Mode.DARK;

  // Synchronize theme attributes with the DOM root for Tailwind
  useEffect(() => {
    if (isLoading) return;
    const root = document.documentElement;
    root.classList.toggle(Mode.DARK, isDark);
    root.setAttribute('data-theme', isDark ? Mode.DARK : Mode.LIGHT);
    root.style.colorScheme = mode === Mode.SYSTEM ? 'light dark' : mode;
  }, [isDark, mode, isLoading]);

  // Load configuration from extension storage on mount
  useEffect(() => {
    storage
      .getItem('local:app_theme')
      .then((saved) => {
        // Check if the saved theme from storage is valid
        const isValidMode = Object.values(Mode).includes(saved as Mode);
        if (isValidMode) {
          setMode(saved as Mode);
        }
      })
      .catch((err: unknown) => {
        console.error('Theme load fail:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /**
   * Switches the active theme and updates extension storage.
   */
  const toggleTheme = async () => {
    const nextMode = isDark ? Mode.LIGHT : Mode.DARK;
    setMode(nextMode);

    try {
      await storage.setItem('local:app_theme', nextMode);
    } catch (error) {
      // Set mode back to previous mode if storage update fails
      setMode(mode);
      console.error(error);
    }
  };

  // Prevents UI flicker while reading initial storage state
  if (isLoading) return null;

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the theme context state and actions.
 * @throws Error if used outside a ThemeProvider.
 */
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within a ThemeProvider');
  return context;
};
