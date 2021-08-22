import { Theme } from '@np-bingo/types';
import { useContext } from 'react';
import { SoundContext } from '../../../../../../context';
import useSound from 'use-sound';
import { lightSfx } from '../../../../../../config/sounds';

export function useThemeToggle(theme: Theme) {
  const { volume, sounds } = useContext(SoundContext);
  const [playSfx] = useSound(lightSfx, {
    volume,
    sprite: {
      lightOffPress: [0, 1000],
      lightOffUnpress: [1000, 1000],
      lightOnPress: [2000, 1000],
      lightOnUnpress: [3000, 1000],
    },
    soundEnabled: sounds,
  });

  /**
   * onMouseDown sound effect
   */
  const pressSfx = () => {
    theme === 'light'
      ? playSfx({ id: 'lightOnPress' })
      : playSfx({ id: 'lightOffPress' });
  };

  /**
   * onMouseUp sound effect
   */
  const releaseSfx = () => {
    theme === 'light'
      ? playSfx({ id: 'lightOnUnpress' })
      : playSfx({ id: 'lightOffUnpress' });
  };
  return [pressSfx, releaseSfx];
}
