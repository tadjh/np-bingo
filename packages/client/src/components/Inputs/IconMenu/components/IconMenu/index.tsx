import React from 'react';
import clsx from 'clsx';
import CloseCircleIcon from '../../../../../assets/icons/CloseCircle';
import CogIcon from '../../../../../assets/icons/Cog';
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
  const [isOpen, toggle, ,] = useToggle(override);
  const { toggleSfx, menuStyle, tooltipStyle } = useIconMenu(isOpen, direction);
  const hidden = !isOpen ? 'invisible' : undefined;
  return (
    <div
      className={clsx(
        'relative block w-[44px] h-[44px] flex justify-center',
        isOpen || 'overflow-hidden hover:overflow-visible'
      )}
    >
      <ul
        className={clsx(
          'absolute flex p-1 transition-all duration-75 rounded-full border-2 gap-1',
          isOpen
            ? 'z-50 bg-gray-200 dark:bg-gray-700 shadow-2xl border-gray-300 dark:border-gray-600'
            : 'border-transparent',
          menuStyle()
        )}
      >
        <li>
          <IconButton
            onClick={toggle}
            onMouseDown={toggleSfx}
            description={!isOpen ? 'Settings' : 'Close'}
            direction={tooltipStyle()}
          >
            {!isOpen ? <CogIcon /> : <CloseCircleIcon />}
          </IconButton>
        </li>
        <li className={hidden}>
          <ThemeToggle direction={tooltipStyle()} />
        </li>
        <li className={hidden}>
          <VolumeToggle direction={tooltipStyle()} />
        </li>
      </ul>
    </div>
  );
}
