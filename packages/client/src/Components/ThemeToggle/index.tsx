import React from 'react';
import IconButton from '../IconButton';
import MoonIcon from '../../Assets/MoonIcon';
import SunIcon from '../../Assets/SunIcon';
import { Theme } from '@np-bingo/types';

export interface ThemeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
}

export default function ThemeToggle({
  theme = 'light',
  onClick,
}: ThemeToggleProps): JSX.Element {
  return (
    <IconButton
      className="group"
      onClick={onClick}
      description={theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
    >
      {theme === 'light' ? (
        <SunIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      ) : (
        <MoonIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      )}
    </IconButton>
  );
}
