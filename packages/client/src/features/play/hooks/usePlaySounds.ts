import { useContext } from 'react';
import useSound from 'use-sound';
import { dispenseSfx, themeSfx, deniedSfx } from '../../../config/sounds';
import { SoundContext } from '../../../context';
import { randomNumber } from '../../../utils';

export function usePlaySounds() {
  const { volume, sounds } = useContext(SoundContext);

  const [playDispenseSfx] = useSound(dispenseSfx, {
    volume: volume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });

  const [playWinSfx, playWinSfxData] = useSound(themeSfx, {
    volume: volume,
    soundEnabled: sounds,
  });

  const [playLoseSfx] = useSound(deniedSfx, {
    volume: volume / 4,
    soundEnabled: sounds,
  });

  const playRandomSfx = () => {
    playDispenseSfx({ id: `dispenseBall${randomNumber(2)}` });
  };

  return { playWinSfxData, playRandomSfx, playWinSfx, playLoseSfx };
}
