import { Status } from '../Constants/types';

/**
 * Takes an array and returns a random element.
 * @param array
 */
export function randomElement(array: any[]) {
  return array[randomIndex(array)];
}

/**
 * Takes an array and returns a random index position
 * @param array Any array
 */
export function randomIndex(array: any[]) {
  return Math.floor(Math.random() * array.length);
}

/**
 * Text to be displayed based for current status
 * @param status
 * @param host View
 */
export function statusText(status: Status, host?: boolean) {
  let text = ' ';
  switch (status) {
    case 'init':
      text = 'Waiting on host to start the game...';

      if (host) {
        text = 'Click to start the game.';
      }
      break;
    case 'ready':
      text = 'Select a card and click ready.';

      if (host) {
        text = 'Waiting for player to ready up...';
      }
      break;
    case 'standby':
      text = 'Waiting for a ball...';

      if (host) {
        text = 'Click to dispense a ball.';
      }
      break;
    case 'start':
      text = 'Click a square on the card to cross it out';
      if (host) {
        let rollText = [
          'Keep on rolling...',
          'Fetch another ball!',
          'Roll another!',
          'Dispense a ball.',
        ];
        text = randomElement(rollText);
      }
      break;
    case 'validate':
      text = 'Sending card to host...';
      if (host) {
        text = 'Check card for a BINGO!';
      }
      break;
    case 'failure':
      text = 'This card was not a valid Bingo. Keep trying...';
      if (host) {
        text = 'This card is not a Bingo. Roll on!';
      }
      break;
    case 'end':
      text = 'BINGO!';
      break;
    default:
      throw new Error(
        `Invalid Game state in ${host ? 'Host' : 'Player'} Status`
      );
  }
  return text;
}
