import { Gamestate, Gamemode } from '@np-bingo/types';

export function usePlayStatus(gamestate: Gamestate, mode: Gamemode) {
  /**
   * Text to be displayed to players based on current gamestate
   * @param gamestate
   * @param host View
   * @returns string
   */
  function playStatus(): string {
    switch (gamestate) {
      case 'init':
        // solo
        if (mode === 'solo') return 'Click start to begin.';
        //default
        return 'Waiting on host to start the game...';
      case 'ready':
        // solo
        if (mode === 'solo') return 'Click start to begin.';
        // default
        return 'Click ready, then wait for host to begin.';
      case 'standby':
        return 'Waiting for host to dispense a ball...';
      case 'start':
        return 'Click a number to cross it out.';
      case 'validate':
        // solo
        if (mode === 'solo') return 'Checking card for Bingo...';
        // default
        return 'Sending card to host...';
      case 'pause':
        // solo
        if (mode === 'solo') return 'Game paused.';
        // default
        return 'A card is being checked for BINGO!';
      case 'win':
        return 'BINGO!';
      case 'lose':
        return 'You lose! Better luck next time...';
      case 'failure':
        // let failureText = [
        //   'Jumping the gun. No Bingo...',
        //   'False alarm... BONGO!',
        //   'Just practicing? No Bingo...',
        //   'Falsie. Keep trying...',
        // ];
        // return randomElement(failureText);
        return 'Jumping the gun. No Bingo...';
      case 'end':
        return 'Game Over!';
      default:
        throw new Error(`Invalid Gamestate in Player Status`);
    }
  }
  return [playStatus];
}
