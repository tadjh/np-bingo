import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Gamestate } from '@np-bingo/types';
import { randomElement } from '../../Utils';

/**
 * Text to be displayed based for current status
 * @param gamestate
 * @param host View
 */
function statusText(gamestate: Gamestate, host?: boolean, count?: number) {
  let text = ' ';
  switch (gamestate) {
    case 'init':
      text = 'Waiting on host to start the game...';

      if (host) {
        // text = 'Click to start the game.';
        text = ' ';
      }
      break;
    case 'ready':
      text = 'Draw a card and click ready.';

      if (host) {
        text = 'Waiting for player(s) to join...';
        if (count) {
          if (count === 1) {
            text = `${count} player has joined...`;
          }
          if (count > 1) {
            text = `${count} players have joined...`;
          }
        }
      }

      break;
    case 'standby':
      text = 'Waiting for host to dispense a ball...';

      if (host) {
        text = 'Click to dispense a ball.';
      }
      break;
    case 'start':
      text = 'Click a square on the card to cross it out';
      if (host) {
        let rollText = [
          'Call the ball, then keep on rolling...',
          'Call it out! Then fetch another ball!',
          'Say the name of the ball, then roll again!',
          'Call out the ball, then dispense another.',
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
    case 'pause':
      text = 'A card is being checked for BINGO!';
      if (host) {
        text = 'Checking if card is a winner...';
      }
      break;
    case 'failure':
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
    case 'end':
      text = 'Game Over!';
      break;
    case 'win':
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
  count?: number;
};

function Status(props: Props) {
  let { gamestate, host, count } = props;
  let text = statusText(gamestate, host, count);
  return <Typography>{text}</Typography>;
}

export default Status;
