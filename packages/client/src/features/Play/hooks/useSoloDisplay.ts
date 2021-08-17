import { useContext } from 'react';
import { GameContext } from '../../../context';

export function useSoloDisplay(): [() => string, () => boolean] {
  const { gamestate } = useContext(GameContext);

  /**
   * Solo mode primary button text strings
   * @param gamestate
   * @returns string
   */
  const soloPrimaryButtonText = (): string => {
    switch (gamestate) {
      case 'start':
        return 'Pause';
      case 'pause':
        return 'Resume';
      case 'win':
        return 'New Game';
      case 'failure':
        return 'Resume';
      default:
        return 'Start';
    }
  };

  /**
   * Solo mode primary button disabled states
   * @param gamestate
   * @returns boolean
   */
  const soloDisablePrimaryButton = (): boolean => {
    switch (gamestate) {
      case 'start':
      case 'pause':
      case 'win':
      case 'failure':
        return false;
      default:
        return true;
    }
  };
  return [soloPrimaryButtonText, soloDisablePrimaryButton];
}
