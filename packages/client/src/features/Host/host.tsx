import { Gamestate } from '@np-bingo/types';
/**
 * Display text for main action button
 * @param gamestate
 * @returns
 */
export function gamestateToggleText(gamestate: Gamestate): string {
  switch (gamestate) {
    case 'ready':
      return 'Start Game';
    case 'end':
      return 'New Game';
    default:
      return 'End Game';
  }
}
