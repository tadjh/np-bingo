import { useContext } from 'react';
import { GameContext } from '../../../context';

export function useHostButtons() {
  const { gamestate, play } = useContext(GameContext);
  /**
   * Three way toggle for host main button
   * @param gamestate Gamestate
   * @param room Room
   */
  const gamestateToggle = () => {
    switch (gamestate) {
      case 'ready':
        play('standby');
        break;
      case 'end':
        play('ready');
        break;
      default:
        play('end');
        break;
    }
  };

  /**
   * Display text for main action button
   * @param gamestate
   * @returns
   */
  const toggleText = (): string => {
    switch (gamestate) {
      case 'ready':
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
  };

  /**
   * Disabled check card unless gamestate is currenly validate
   * @returns boolean
   */
  const disableCheckCard = (): boolean => {
    if (gamestate === 'validate') return false;
    return true;
  };

  /**
   * Disable during certian gamestates
   * @returns boolean
   */
  const setDisabled = (): boolean => {
    switch (gamestate) {
      case 'start':
      case 'standby':
      case 'failure':
        return false;
      default:
        return true;
    }
  };

  return { gamestateToggle, toggleText, disableCheckCard, setDisabled };
}
