import React from 'react';
import { Gamestate } from '../../Constants/types';
import { randomElement } from '../../Utils';

/**
 * Text to be displayed based for current status
 * @param gamestate
 * @param host View
 */
function statusText(gamestate: Gamestate, host?: boolean) {
  let text = ' ';
  switch (gamestate) {
    case Gamestate.INIT:
      text = 'Waiting on host to start the game...';

      if (host) {
        text = 'Click to start the game.';
      }
      break;
    case Gamestate.READY:
      text = 'Select a card and click ready.';

      if (host) {
        text = 'Waiting for player to ready up...';
      }
      break;
    case Gamestate.STANDBY:
      text = 'Waiting for a ball...';

      if (host) {
        text = 'Click to dispense a ball.';
      }
      break;
    case Gamestate.START:
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
    case Gamestate.VALIDATE:
      text = 'Sending card to host...';
      if (host) {
        text = 'Check card for a BINGO!';
      }
      break;
    case Gamestate.FAILURE:
      let failureText = [
        'Jumping the gun. No Bingo...',
        'False alarm... BONGO!',
        'Just practicing? No Bingo...',
        'Falsie. Keep trying...',
      ];
      text = randomElement(failureText);
      if (host) {
        text = 'This card is not a Bingo. Roll on!';
      }
      break;
    case Gamestate.END:
      text = 'BINGO!';
      break;
    default:
      throw new Error(
        `Invalid Gamestate in ${host ? 'Host' : 'Player'} Status`
      );
  }
  return text;
}

type Props = {
  gamestate: Gamestate;
  host?: boolean;
  winningText?: string;
};

function Status(props: Props) {
  let { gamestate, host } = props;
  let text = statusText(gamestate, host);
  return <p>{text}</p>;
}

export default Status;
