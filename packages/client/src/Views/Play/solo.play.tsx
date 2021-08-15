import { Gamestate } from '@np-bingo/types';

/**
 * Solo mode primary button text strings
 * @param gamestate
 * @returns string
 */
export function soloPrimaryButtonText(gamestate: Gamestate): string {
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
      return 'start';
  }
}

/**
 * Solo mode primary button disabled states
 * @param gamestate
 * @returns boolean
 */
export function soloDisablePrimaryButton(gamestate: Gamestate): boolean {
  if (
    gamestate === 'start' ||
    gamestate === 'pause' ||
    gamestate === 'win' ||
    gamestate === 'failure'
  )
    return false;
  return true;
}
