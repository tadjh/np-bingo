import { Status } from '../Constants/types';

/**
 * Takes an array and returns a random index position
 * @param array integer array
 */
export function randomIndex(array: (number | string)[]) {
  return Math.floor(Math.random() * array.length);
}

/**
 * Text to be displayed based on card valdaiton results
 * @param state
 */
export function validationText(state?: boolean) {
  let text = '';
  let attemptText = [
    'Not quite...',
    'Keep trying!',
    'You got this.',
    'Hang in there',
    'Hi Dean',
  ];

  switch (state) {
    case undefined:
      break;
    case true:
      return 'Winner!';
    case false:
      return attemptText[randomIndex(attemptText)];
    default:
      throw new Error('Winner case invalid');
  }
  return text;
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
        text = 'Waiting for player(s) to ready up...';
      }
      break;
    case 'start':
      text = 'Click a square on the Bingo card to mark it';
      if (host) {
        text = 'Pull a new Bingo ball.';
      }
      break;
    case 'end':
      // if (winningText) {
      //   text = winningText;
      // }
      break;
    default:
      throw new Error(
        `Invalid Game state in ${host ? 'Host' : 'Player'} Status`
      );
  }
  return text;
}

/**
 * Text to be displayed in game loop buttons based on current status
 * @param status
 * @param host View
 */
export function buttonText(status: Status, host?: boolean) {
  let next: Status = 'init';
  let text = '';
  switch (status) {
    case 'init':
      next = 'ready';
      text = 'New Game';
      break;
    case 'ready':
      next = 'start';
      text = 'Ready';
      if (host) {
        next = 'end';
        text = 'End Round';
      }
      break;
    case 'start':
      next = 'end';
      text = 'End Round';
      break;
    case 'end':
      next = 'ready';
      text = 'New Round';
      break;
    default:
      throw new Error('Invalid value passed to Next Button.');
  }
  return { next, text };
}
