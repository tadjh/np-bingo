import { Gamemode, Gamestate } from '@np-bingo/types';
import { soloDisablePrimaryButton, soloPrimaryButtonText } from './solo.play';

/**
 * Text to display on primary button
 * @returns String
 */
export function primaryButtonText(
  gamemode: Gamemode,
  gamestate: Gamestate
): string {
  if (gamemode === 'solo') return soloPrimaryButtonText(gamestate);
  return 'Ready';
}

/**
 * Disables primary button based on gamestate
 * @returns boolean
 */
export function disablePrimaryButton(
  gamemode: Gamemode,
  gamestate: Gamestate
): boolean {
  if (gamemode === 'solo') return soloDisablePrimaryButton(gamestate);
  if (gamestate === 'ready') return false;
  return true;
}

/**
 * Disables ball
 * @param gamestate
 * @returns
 */
export function disableBallDisplay(gamestate: Gamestate): boolean {
  if (gamestate === 'start' || gamestate === 'failure') return false;
  return true;
}
