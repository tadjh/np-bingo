import React, { useContext } from 'react';
import IconButton from '../IconButton';
import MoonIcon from '../../assets/Icons/Moon';
import SunIcon from '../../assets/Icons/Sun';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';
import useSound from 'use-sound';
import lightSfx from '../..//Assets/Sounds/Light_Switch_On_Off.mp3';
import { TooltipDirection } from '../Tooltip';

export interface ThemeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  direction?: TooltipDirection;
}

export default function ThemeToggle({
  direction = 'top',
  ...props
}: ThemeToggleProps): JSX.Element {
  const { defaultVolume } = useContext(FeautresContext);
  const { theme, toggleTheme, sounds } = useContext(ThemeContext);
  const [playSfx] = useSound(lightSfx, {
    volume: defaultVolume,
    sprite: {
      lightOffPress: [0, 1000],
      lightOffUnpress: [1000, 1000],
      lightOnPress: [2000, 1000],
      lightOnUnpress: [3000, 1000],
    },
    soundEnabled: sounds,
  });
  return (
    <IconButton
      className="group"
      onClick={toggleTheme}
      onMouseDown={() => {
        theme === 'light'
          ? playSfx({ id: 'lightOnPress' })
          : playSfx({ id: 'lightOffPress' });
      }}
      onMouseUp={() => {
        theme === 'light'
          ? playSfx({ id: 'lightOnUnpress' })
          : playSfx({ id: 'lightOffUnpress' });
      }}
      description={theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
      direction={direction}
    >
      {theme === 'light' ? (
        <SunIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      ) : (
        <MoonIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      )}
    </IconButton>
  );
}
