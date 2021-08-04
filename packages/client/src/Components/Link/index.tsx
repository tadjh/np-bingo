import React, { useContext } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import useSound from 'use-sound';
import buttonSfx from '../../Assets/Sounds/Click_1.mp3';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';

export default function Link({
  className = '',
  children,
  ...props
}: LinkProps) {
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
    <RouterLink
      className={[
        'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400',
        className,
      ].join(' ')}
      onMouseDown={buttonPressSfx}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
