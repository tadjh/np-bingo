import { Gamestate } from '@np-bingo/types';

export function useSoloDisplay(
  gamestate: Gamestate
): [() => string, () => boolean] {
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
        return 'Replay';
      case 'failure':
        return 'Resume';
      case 'end':
        return 'Replay';
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
      case 'ready':
      case 'start':
      case 'pause':
      case 'win':
      case 'failure':
      case 'end':
        return false;
      default:
        return true;
    }
  };
  return [soloPrimaryButtonText, soloDisablePrimaryButton];
}
