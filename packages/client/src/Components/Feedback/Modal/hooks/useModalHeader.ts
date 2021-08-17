import { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../context';
import { buttonSfx } from '../../../../config/sounds';
export function useModalHeader() {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: volume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  const buttonPressSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  return [buttonPressSfx];
}
