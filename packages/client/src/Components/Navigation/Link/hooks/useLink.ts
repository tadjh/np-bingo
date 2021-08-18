import { useContext } from 'react';
import useSound from 'use-sound';
import { buttonSfx } from '../../../../config/sounds';
import { FeautresContext, SoundContext } from '../../../../context';

export default function useLink() {
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(SoundContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: defaultVolume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  /**
   * Wrapper for link sound effect
   */
  const linkSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  return [linkSfx];
}
