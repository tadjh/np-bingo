import React, { useContext } from 'react';
import IconButton from '../IconButton';
import MoonIcon from '../../Assets/Moon';
import SunIcon from '../../Assets/Sun';
import { ThemeContext } from '../../Utils/contexts';
import useSound from 'use-sound';
import lightSfx from '../..//Assets/Sounds/Light_Switch_On_Off.mp3';
import { SpriteMap } from 'use-sound/dist/types';

export interface ThemeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ThemeToggle({
  ...props
}: ThemeToggleProps): JSX.Element {
  const { theme, toggleTheme, sounds } = useContext(ThemeContext);
  const lightSfxSpriteMap = {
    lightOffPress: [0, 1000],
    lightOffUnpress: [1000, 1000],
    lightOnPress: [2000, 1000],
    lightOnUnpress: [3000, 1000],
  } as SpriteMap;
  const [playSfx] = useSound(lightSfx, {
    volume: 0.25,
    sprite: { ...lightSfxSpriteMap },
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
