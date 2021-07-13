import React, { useContext } from 'react';
import IconButton from '../IconButton';
import MoonIcon from '../../Assets/Moon';
import SunIcon from '../../Assets/Sun';
import { ThemeContext } from '../../Utils/contexts';

export interface ThemeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ThemeToggle({
  ...props
}: ThemeToggleProps): JSX.Element {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <IconButton
      className="group"
      onClick={toggleTheme}
      description={theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
      direction="top"
    >
      {theme === 'light' ? (
        <SunIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      ) : (
        <MoonIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      )}
    </IconButton>
  );
}
