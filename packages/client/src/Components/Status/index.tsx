import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Gamemode, Gamestate } from '@np-bingo/types';
import './style.css';
// import { randomElement } from '../../Utils';

/**
 * Text to be displayed to players based on current gamestate
 * @param gamestate
 * @param host View
 * @returns string
 */
export function statusText(gamestate: Gamestate, mode?: Gamemode) {
  let text: string;
  switch (gamestate) {
    case 'init':
      text = 'Waiting on host to start the game...';
      break;
    case 'ready':
      // default
      if (mode !== 'solo') {
        text = 'Click ready, then wait for host to start game...';
      }

      // solo
      text = 'Click start to begin.';
      break;
    case 'standby':
      text = 'Waiting for host to dispense a ball...';
      break;
    case 'start':
      text = 'Click a number to cross it out.';
      break;
    case 'validate':
      // default
      if (mode !== 'solo') {
        text = 'Sending card to host...';
      }

      text = 'Checking card for Bingo...';
      break;
    case 'pause':
      text = 'A card is being checked for BINGO!';
      break;
    case 'failure':
      // let failureText = [
      //   'Jumping the gun. No Bingo...',
      //   'False alarm... BONGO!',
      //   'Just practicing? No Bingo...',
      //   'Falsie. Keep trying...',
      // ];
      // text = randomElement(failureText);
      text = 'Jumping the gun. No Bingo...';
      break;
    case 'end':
      text = 'Game Over!';
      break;
    case 'win':
      text = 'BINGO!';
      break;
    default:
      throw new Error(`Invalid Gamestate in Player Status`);
  }
  return text;
}

/**
 * Text to be displayed to host based on current gamestate
 * @param gamestate
 * @param count
 * @returns string
 */
export function hostStatusText(gamestate: Gamestate, count?: number) {
  let text: string;
  switch (gamestate) {
    case 'init':
      // text = 'Click to start the game.';
      text = ' ';
      break;
    case 'ready':
      text = 'Waiting for player(s) to join...';
      if (!count) break;

      if (count === 1) {
        text = `${count} player has joined...`;
        break;
      }

      if (count > 1) {
        text = `${count} players have joined...`;
        break;
      }
      break;
    case 'standby':
      text = 'Click "+" to dispense a ball.';
      break;
    case 'start':
      // let rollText = [
      //   'Call the ball, then keep on rolling...',
      //   'Call it out! Then fetch another ball!',
      //   'Say the name of the ball, then roll again!',
      //   'Call out the ball, then dispense another.',
      // ];
      // text = randomElement(rollText);
      text = 'Call out the ball, then dispense another';
      break;
    case 'validate':
      text = 'Check card for a BINGO!';
      break;
    case 'pause':
      text = 'Checking if card is a winner...';
      break;
    case 'failure':
      text = 'This card is not a Bingo. Roll on!';
      break;
    case 'end':
      text = 'Game Over!';
      break;
    case 'win':
      text = 'BINGO!';
      break;
    default:
      throw new Error('Invalid Gamestate in Host Status');
  }
  return text;
}

export interface StatusProps {
  gamestate: Gamestate;
  host?: boolean;
  count?: number;
  mode?: Gamemode;
}

export default function Status({
  gamestate = 'init',
  host = false,
  count = 0,
  mode = 'default',
}: StatusProps) {
  return (
    <Typography className="status-text">
      {host ? hostStatusText(gamestate, count) : statusText(gamestate, mode)}
    </Typography>
  );
}
