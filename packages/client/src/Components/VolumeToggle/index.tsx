import React, { useContext } from 'react';
import useSound from 'use-sound';
import VolumeOffIcon from '../../Assets/Icons/VolumeOff';
import VolumeUpIcon from '../../Assets/Icons/VolumeUp';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';
import IconButton from '../IconButton';
import { TooltipDirection } from '../Tooltip';
import volumeSfx from '../../Assets/Sounds/Click_2.mp3';

export interface VolumeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  direction?: TooltipDirection;
}

export default function VolumeToggle({
  direction = 'top',
  ...props
}: VolumeToggleProps): JSX.Element {
  const { sounds, toggleSounds } = useContext(ThemeContext);
  const { defaultVolume } = useContext(FeautresContext);
  const [playVolumeSfx] = useSound(volumeSfx, {
    volume: defaultVolume,
    sprite: {
      soundOn: [150, 850],
      soundOff: [1000, 1000],
    },
    soundEnabled: true, // volume toggle should always have sound enabled
  });

  /**
   * Play volume on sfx
   */
  const volumeOnSfx = () => {
    playVolumeSfx({ id: 'soundOn' });
  };

  /**
   * Play volume off sfx
   */
  const volumeOffSfx = () => {
    playVolumeSfx({ id: 'soundOff' });
  };

  /**
   * Toggle sound effect based upon volume on or off
   */
  const toggleVolumeSfx = () => {
    !sounds ? volumeOnSfx() : volumeOffSfx();
  };

  return (
    <IconButton
      className="group"
      onClick={toggleSounds}
      onMouseDown={toggleVolumeSfx}
      description={sounds ? 'Turn Sounds Off' : 'Turn Sounds On'}
      direction={direction}
    >
      {sounds ? (
        <VolumeUpIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      ) : (
        <VolumeOffIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      )}
    </IconButton>
  );
}
