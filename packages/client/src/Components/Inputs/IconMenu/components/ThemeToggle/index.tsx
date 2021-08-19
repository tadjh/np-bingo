import React, { useContext } from 'react';
import IconButton from '../../../IconButton/components/IconButton';
import MoonIcon from '../../../../../assets/icons/Moon';
import SunIcon from '../../../../../assets/icons/Sun';
import { TooltipDirection } from '../../../../Display/Tooltip';
import { ThemeContext } from '../../../../../context';
import { useThemeToggle } from './hooks';

export interface ThemeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  direction?: TooltipDirection;
}

export default function ThemeToggle({
  direction = 'top',
  ...props
}: ThemeToggleProps): JSX.Element {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [pressSfx, releaseSfx] = useThemeToggle(theme);
  return (
    <IconButton
      className="group"
      onClick={toggleTheme}
      onMouseDown={pressSfx}
      onMouseUp={releaseSfx}
      description={theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
      direction={direction}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
