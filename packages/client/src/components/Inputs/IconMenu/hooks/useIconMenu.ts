import { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../context';
import { drawerSfx } from '../../../../config/sounds';
import { MenuDirection } from '..';
import { TooltipDirection } from '../../../Display/Tooltip';

export function useIconMenu(isOpen: boolean, direction: MenuDirection) {
  const { volume, sounds } = useContext(SoundContext);
  const [playSfx] = useSound(drawerSfx, {
    volume: volume,
    sprite: {
      menuOpen: [3000, 1000],
      menuClosed: [2000, 1000],
    },
    soundEnabled: sounds,
  });

  /**
   * Play open menu sfx
   */
  const openSfx = () => {
    playSfx({ id: 'menuOpen' });
  };

  /**
   * Play clsoe menu sfx
   */
  const closeSfx = () => {
    playSfx({ id: 'menuClosed' });
  };

  /**
   * Toggle menu sound effect based on open or closed
   */
  const toggleSfx = () => {
    !isOpen ? openSfx() : closeSfx();
  };

  /**
   * Returns classes for popout menu based on direction
   * @param direction
   * @returns classes
   */
  const menuStyle = (): string => {
    switch (direction) {
      case 'up':
        return 'flex-col-reverse -bottom-1';
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
  const tooltipStyle = (): TooltipDirection => {
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

  return { toggleSfx, menuStyle, tooltipStyle };
}
