'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null); // Initialize theme as null

  useEffect(() => {
    // This effect runs only on the client-side after mount
    const initialTheme =
      (localStorage.getItem(storageKey) as Theme) ||
      (enableSystem
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : defaultTheme);
    setTheme(initialTheme);
  }, [storageKey, enableSystem, defaultTheme]);

  useEffect(() => {
    if (!theme) return; // Do nothing if theme is still null

    const root = window.document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.setAttribute(attribute, systemTheme);
      localStorage.removeItem(storageKey); // Remove from local storage if 'system'
    } else {
      root.setAttribute(attribute, theme);
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, attribute, storageKey]);

  const contextValue: ThemeContextType = {
    theme: theme || 'light', // Default to 'light' if theme is null
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}