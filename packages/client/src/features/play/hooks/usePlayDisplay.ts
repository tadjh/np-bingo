import { useSoloDisplay } from '.';
import { Gamemode, Gamestate } from '@np-bingo/types';

export function usePlayDisplay(gamemode: Gamemode, gamestate: Gamestate) {
  const [soloPrimaryButtonText, soloDisablePrimaryButton] = useSoloDisplay(
    gamestate
  );

  /**
   * Text to display on primary button
   * @returns String
   */
  function primaryButtonText(): string {
    if (gamemode === 'solo') return soloPrimaryButtonText();
    return 'Ready';
  }

  /**
   * Disables primary button based on gamestate
   * @returns boolean
   */
  function disablePrimaryButton(): boolean {
    if (gamemode === 'solo') return soloDisablePrimaryButton();
    if (gamestate === 'ready') return false;
    return true;
  }

  /**
   * Disables ball
   * @param gamestate
   * @returns
   */
  function disableBallDisplay(): boolean {
    if (gamestate === 'start' || gamestate === 'failure') return false;
    return true;
  }

  return {
    primaryButtonText,
    disablePrimaryButton,
    disableBallDisplay,
  };
}
