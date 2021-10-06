import { useContext } from 'react';
import useSound from 'use-sound';
import { clickSfx } from '../config/sounds';
import { SoundContext } from '../context';

export function useClickHard(): () => void {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(clickSfx, {
    volume: volume / 2,
    sprite: {
      clickHard: [0, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  /**
   * Wrapper for button mouse down event
   */
  const clickHardSfx = () => playSfx({ id: 'clickHard' });

  return clickHardSfx;
}
