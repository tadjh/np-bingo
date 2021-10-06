import React from 'react';
import VolumeOffIcon from '../../../../../assets/icons/VolumeOff';
import VolumeUpIcon from '../../../../../assets/icons/VolumeUp';
import IconButton, {
  IconButtonProps,
} from '../../../IconButton/components/IconButton';
import { useVolumeToggle } from './hooks';

export interface VolumeToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  direction?: IconButtonProps['direction'];
}

export default function VolumeToggle({
  direction = 'top',
  ...props
}: VolumeToggleProps): JSX.Element {
  const [sounds, toggleSounds, toggleSfx] = useVolumeToggle();
  return (
    <IconButton
      className="group"
      onClick={toggleSounds}
      onMouseDown={toggleSfx}
      description={sounds ? 'Turn Sounds Off' : 'Turn Sounds On'}
      direction={direction}
      {...props}
    >
      {sounds ? <VolumeUpIcon /> : <VolumeOffIcon />}
    </IconButton>
  );
}
