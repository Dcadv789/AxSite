import { createContext, useContext } from 'react';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}
