import { Gamestate } from '@np-bingo/types';

export function useHostStatus(gamestate: Gamestate, count: number) {
  /**
   * Text to be displayed to host based on current gamestate
   * @param gamestate
   * @param count
   * @returns string
   */
  function hostStatus(): string {
    switch (gamestate) {
      case 'init':
        // return 'Click to start the game.';
        return '\u00a0';
      case 'ready':
        if (count === 1) return `${count} player has joined...`;
        if (count > 1) return `${count} players have joined...`;
        return 'Waiting for player(s) to join...';
      case 'standby':
        return 'Click "+" to dispense a ball.';
      case 'start':
        // let rollText = [
        //   'Call the ball, then keep on rolling...',
        //   'Call it out! Then fetch another ball!',
        //   'Say the name of the ball, then roll again!',
        //   'Call out the ball, then dispense another.',
        // ];
        // return randomElement(rollText);
        return 'Call out the ball, then dispense another';
      case 'validate':
        return 'Check card for a BINGO!';
      case 'pause':
        return 'Checking if card is a winner...';
      case 'failure':
        return 'This card is not a Bingo. Roll on!';
      case 'end':
        return 'Game Over!';
      case 'win':
        return 'BINGO!';
      default:
        throw new Error('Invalid Gamestate in Host Status');
    }
  }
  return [hostStatus];
}
