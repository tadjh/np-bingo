import { useContext } from 'react';
import useSound from 'use-sound';
import { dispenseSfx } from '../../../config/sounds';
import { SoundContext } from '../../../context';
import { randomNumber } from '../../../utils';

export function useHostSounds() {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(dispenseSfx, {
    volume: volume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });

  const playRandomSfx = () => {
    playSfx({ id: `dispenseBall${randomNumber(4)}` });
  };

  return [playRandomSfx];
}
