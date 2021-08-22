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
        //default
        if (mode !== 'solo') return 'Waiting on host to start the game...';
        // solo
        return 'Click start to begin.';
      // return '\u00a0';
      case 'ready':
        // default
        if (mode !== 'solo') return 'Click ready, then wait for host to begin.';
        // solo
        return 'Click start to begin.';
      case 'standby':
        return 'Waiting for host to dispense a ball...';
      case 'start':
        return 'Click a number to cross it out.';
      case 'validate':
        // default
        if (mode !== 'solo') return 'Sending card to host...';
        // solo
        return 'Checking card for Bingo...';
      case 'pause':
        // default
        if (mode !== 'solo') return 'A card is being checked for BINGO!';
        // solo
        return 'Game paused.';
      case 'win':
        return 'BINGO!';
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
