import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import useSound from 'use-sound';
import CloseIcon from '../../Assets/Icons/Close';
import Cog from '../../Assets/Icons/Cog';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';
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
        return 'flex-col-reverse left-0 bottom-full';
      case 'down':
        return 'flex-col left-0 top-full';
      case 'left':
        return 'flex-row-reverse top-0 right-full';
      case 'right':
        return 'flex-row top-0 left-full';
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

  /**
   * Style rounded border nearest cog wheel
   * @param direction
   * @returns
   */
  const stylePopoutMenuBorderCog = (direction: MenuDirection): string => {
    switch (direction) {
      case 'up':
        return 'rounded-b-full';
      case 'down':
        return 'rounded-t-full';
      case 'left':
        return 'rounded-r-full';
      case 'right':
        return 'rounded-l-full';
      default:
        throw new Error('Error in style popout menu border cog');
    }
  };

  /**
   * Style rounded border nearest drawer
   * @param direction
   * @returns
   */
  const stylePopoutMenuBorderDrawer = (direction: MenuDirection): string => {
    switch (direction) {
      case 'up':
        return 'rounded-t-full';
      case 'down':
        return 'rounded-b-full';
      case 'left':
        return 'rounded-l-full';
      case 'right':
        return 'rounded-r-full';
      default:
        throw new Error('Error in style popout menu border drawer');
    }
  };

  return (
    <div
      className={`relative p-1 transition-all duration-100 ${
        open && 'z-50 bg-gray-300 dark:bg-gray-700'
      } ${open && stylePopoutMenuBorderCog(direction)}`}
    >
      <IconButton
        onClick={toggleMenu}
        onMouseDown={toggleMenuSfx}
        description="Settings"
        direction={stylePopoutMenuTooltips(direction)}
      >
        <Cog className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      </IconButton>
      <ul
        className={`absolute flex p-1 transition-all duration-100 ${stylePopoutMenu(
          direction
        )} ${!open ? 'invisible' : 'z-50 bg-gray-300 dark:bg-gray-700'} ${
          open && stylePopoutMenuBorderDrawer(direction)
        }`}
      >
        <li>
          <ThemeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li>
          <VolumeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li>
          <IconButton
            onClick={closeMenu}
            onMouseDown={closeMenuSfx}
            description="Close"
            direction={stylePopoutMenuTooltips(direction)}
          >
            <CloseIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
