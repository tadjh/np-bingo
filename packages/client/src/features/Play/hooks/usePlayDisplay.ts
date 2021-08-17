import { useContext } from 'react';
import { useSoloDisplay } from '.';
import { GameContext } from '../../../context';

export function usePlayDisplay() {
  const { gamestate, gamemode } = useContext(GameContext);
  const [soloPrimaryButtonText, soloDisablePrimaryButton] = useSoloDisplay();

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
