import React from 'react';
import features from '../config/features';
import { Theme } from '@np-bingo/types';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const inititalThemeContext: ThemeContextProps = {
  theme: features.theme,
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext(inititalThemeContext);
