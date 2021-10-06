import { useContext } from 'react';
import useSound from 'use-sound';
import { clickSfx } from '../config/sounds';
import { SoundContext } from '../context';

export function useClickSoft(): () => void {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(clickSfx, {
    volume: volume,
    sprite: {
      clickSoft: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  /**
   * Wrapper for link sound effect
   */
  const clickSoftSfx = () => {
    playSfx({ id: 'clickSoft' });
  };

  return clickSoftSfx;
}
