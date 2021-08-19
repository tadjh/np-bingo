import React from 'react';
import CloseIcon from '../../../../../assets/icons/Close';
import Cog from '../../../../../assets/icons/Cog';
import IconButton from '../../../IconButton/components/IconButton';
import ThemeToggle from '../ThemeToggle';
import VolumeToggle from '../VolumeToggle';
import { useToggle } from '../../../../../hooks';
import { useIconMenu } from '../../hooks';
import { MenuDirection } from '../..';

export interface IconMenuProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  direction?: MenuDirection;
  open?: boolean;
}

export default function IconMenu({
  direction = 'down',
  open: override = false,
  ...props
}: IconMenuProps): JSX.Element {
  const [isOpen, toggle, , close] = useToggle(override);
  const [closeSfx, toggleSfx, menuStyle, tooltipStyle] = useIconMenu(
    isOpen,
    direction
  );
  const hidden = !isOpen ? 'invisible' : undefined;

  return (
    <div
      className={`relative block w-14 h-14 ${
        !isOpen ? 'overflow-hidden hover:overflow-visible' : ''
      }`}
    >
      <ul
        className={[
          'absolute flex p-1 transition-all duration-75 rounded-full border-2',
          isOpen
            ? 'z-50 bg-gray-300 dark:bg-gray-700 shadow-2xl border-gray-400 dark:border-gray-600'
            : 'border-transparent',
          menuStyle(),
        ].join(' ')}
      >
        <li>
          <IconButton
            onClick={toggle}
            onMouseDown={toggleSfx}
            description="Settings"
            direction={tooltipStyle()}
          >
            <Cog className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
        <li className={hidden}>
          <ThemeToggle direction={tooltipStyle()} />
        </li>
        <li className={hidden}>
          <VolumeToggle direction={tooltipStyle()} />
        </li>
        <li className={hidden}>
          <IconButton
            onClick={close}
            onMouseDown={closeSfx}
            description="Close"
            direction={tooltipStyle()}
          >
            <CloseIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
