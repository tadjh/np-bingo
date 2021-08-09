import React, { useContext } from 'react';
import useSound from 'use-sound';
import CloseIcon from '../../Assets/Icons/Close';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';
import IconButton from '../IconButton';
import buttonSfx from '../../Assets/Sounds/Click_1.mp3';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export default function ModalHeader({
  onClose,
  children,
  ...props
}: ModalHeaderProps): JSX.Element {
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(ThemeContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: defaultVolume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  const buttonPressSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  return (
    <div
      className="flex items-center justify-between bg-blue-300 dark:bg-gray-700 p-5 border-b-2 border-blue-400 dark:border-gray-900"
      {...props}
    >
      <span className="text-lg text-black dark:text-white text-opacity-90 dark:text-opacity-90">
        {children}
      </span>
      <IconButton
        className="close-button"
        onClick={onClose}
        onMouseDown={buttonPressSfx}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
