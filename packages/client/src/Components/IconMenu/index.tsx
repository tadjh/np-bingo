import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import useSound from 'use-sound';
import CloseIcon from '../../assets/Icons/Close';
import Cog from '../../assets/Icons/Cog';
import { FeautresContext, ThemeContext } from '../../context';
import IconButton from '../IconButton';
import ThemeToggle from '../ThemeToggle';
import { TooltipDirection } from '../Tooltip';
import VolumeToggle from '../VolumeToggle';
import menuSfx from '../../Assets/Sounds/Drawer_Open_Close.mp3';

export type MenuDirection = 'up' | 'right' | 'down' | 'left';

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
  const [open, setOpen] = useState(false);
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(ThemeContext);
  const [playMenuSfx] = useSound(menuSfx, {
    volume: defaultVolume,
    sprite: {
      menuOpen: [3000, 1000],
      menuClosed: [2000, 1000],
    },
    soundEnabled: sounds,
  });

  /**
   * Override default menu open state on component mount if override is set
   */
  useEffect(() => {
    if (!override) return;
    setOpen(override);
  }, [override]);

  /**
   * Toggle menu open or closed
   */
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  /**
   * Close menu
   */
  const closeMenu = () => {
    setOpen(false);
  };

  /**
   * Play open menu sfx
   */
  const openMenuSfx = () => {
    playMenuSfx({ id: 'menuOpen' });
  };

  /**
   * Play clsoe menu sfx
   */
  const closeMenuSfx = () => {
    playMenuSfx({ id: 'menuClosed' });
  };

  /**
   * Toggle menu sound effect based on open or closed
   */
  const toggleMenuSfx = () => {
    !open ? openMenuSfx() : closeMenuSfx();
  };

  /**
   * Returns classes for popout menu based on direction
   * @param direction
   * @returns classes
   */
  const stylePopoutMenu = (direction: MenuDirection): string => {
    switch (direction) {
      case 'up':
        return 'flex-col-reverse bottom-0';
      case 'down':
        return 'flex-col';
      case 'left':
        return 'flex-row-reverse right-0';
      case 'right':
        return 'flex-row';
      default:
        throw new Error('Error in style popout menu');
    }
  };

  /**
   * Changes tooltip direction based on menu direction
   * @param direction
   * @returns Tooltip Direction
   */
  const stylePopoutMenuTooltips = (
    direction: MenuDirection
  ): TooltipDirection => {
    switch (direction) {
      case 'up':
        return 'left';
      case 'down':
        return 'left';
      case 'left':
        return 'top';
      case 'right':
        return 'top';
      default:
        throw new Error('Error in style popout menu tooltip');
    }
  };

  return (
    <div
      className={`relative block w-14 h-14 ${
        !open ? 'overflow-hidden hover:overflow-visible' : ''
      }`}
    >
      <ul
        className={`absolute flex p-1 transition-all duration-75 rounded-full border-2 ${
          open
            ? 'z-50 bg-gray-300 dark:bg-gray-700 shadow-2xl border-gray-500 dark:border-gray-600'
            : 'border-transparent'
        } ${stylePopoutMenu(direction)}`}
      >
        <li>
          <IconButton
            onClick={toggleMenu}
            onMouseDown={toggleMenuSfx}
            description="Settings"
            direction={stylePopoutMenuTooltips(direction)}
          >
            <Cog className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
        <li className={`${!open ? 'invisible' : ''}`}>
          <ThemeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li className={`${!open ? 'invisible' : ''}`}>
          <VolumeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li className={`${!open ? 'invisible' : ''}`}>
          <IconButton
            onClick={closeMenu}
            onMouseDown={closeMenuSfx}
            description="Close"
            direction={stylePopoutMenuTooltips(direction)}
          >
            <CloseIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
