import { Gamestate } from '@np-bingo/types';

export default function useHost(gamestate: Gamestate) {
  /**
   * Display text for main action button
   * @param gamestate
   * @returns
   */
  function toggleText(gamestate: Gamestate): string {
    switch (gamestate) {
      case 'ready':
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
  }
  return { toggleText };
}
