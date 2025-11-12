import React, { createContext, useContext, useMemo, useState } from 'react';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const lightColors = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#111827',
  mutedText: '#6B7280',
  surface: '#FFFFFF',
  surfaceAlt: '#F7F7F8',
  primary: '#E64A19',
  accent: '#F55A3C',
  divider: '#E5E7EB',
};

const darkColors = {
  background: '#0B0F14',
  card: '#0F172A',
  text: '#F3F4F6',
  mutedText: '#9CA3AF',
  surface: '#111827',
  surfaceAlt: '#1F2937',
  primary: '#F97316',
  accent: '#F55A3C',
  divider: '#374151',
};

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  navTheme: NavigationDefaultTheme,
  toggleTheme: () => {},
  setDark: (_v) => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? darkColors : lightColors;

  const navTheme = useMemo(() => ({
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.divider,
      primary: colors.primary,
    },
  }), [isDark]);

  const value = useMemo(() => ({
    isDark,
    colors,
    navTheme,
    toggleTheme: () => setIsDark((v) => !v),
    setDark: (v) => setIsDark(!!v),
  }), [isDark, colors, navTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
