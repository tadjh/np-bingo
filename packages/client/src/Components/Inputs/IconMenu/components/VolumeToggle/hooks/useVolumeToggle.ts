import { useContext } from 'react';
import useSound from 'use-sound';
import { FeautresContext, SoundContext } from '../../../../../../context';
import { clickSfx } from '../../../../../../config/sounds';

export function useVolumeToggle(): [boolean, () => void, () => void] {
  const { sounds, toggleSounds } = useContext(SoundContext);
  const { defaultVolume } = useContext(FeautresContext);

  const [playVolumeSfx] = useSound(clickSfx, {
    volume: defaultVolume,
    sprite: {
      soundOn: [0, 1000],
      soundOff: [1000, 1000],
    },
    soundEnabled: true, // volume toggle should always have sound enabled
  });

  /**
   * Play volume on sfx
   */
  const volumeOn = () => {
    playVolumeSfx({ id: 'soundOn' });
  };

  /**
   * Play volume off sfx
   */
  const volumeOff = () => {
    playVolumeSfx({ id: 'soundOff' });
  };

  /**
   * Toggle sound effect based upon volume on or off
   */
  const toggleSfx = () => {
    !sounds ? volumeOn() : volumeOff();
  };

  return [sounds, toggleSounds, toggleSfx];
}
