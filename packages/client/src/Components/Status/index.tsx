import React from 'react';
import { Gamemode, Gamestate } from '@np-bingo/types';
// import { randomElement } from '../../Utils';

/**
 * Text to be displayed to players based on current gamestate
 * @param gamestate
 * @param host View
 * @returns string
 */
export function statusText(gamestate: Gamestate, mode?: Gamemode): string {
  switch (gamestate) {
    case 'init':
      //default
      if (mode !== 'solo') return 'Waiting on host to start the game...';
      // solo
      return ' ';
    case 'ready':
      // default
      if (mode !== 'solo')
        return 'Click ready, then wait for host to start game...';
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
      return 'A card is being checked for BINGO!';
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
    case 'win':
      return 'BINGO!';
    default:
      throw new Error(`Invalid Gamestate in Player Status`);
  }
}

/**
 * Text to be displayed to host based on current gamestate
 * @param gamestate
 * @param count
 * @returns string
 */
export function hostStatusText(gamestate: Gamestate, count?: number): string {
  switch (gamestate) {
    case 'init':
      // return 'Click to start the game.';
      return ' ';
    case 'ready':
      if (count === 1) return `${count} player has joined...`;
      if (count && count > 1) return `${count} players have joined...`;
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
}: StatusProps): JSX.Element {
  return (
    <div className="text-black dark:text-white text-opacity-90 dark:text-opacity-90">
      {host ? hostStatusText(gamestate, count) : statusText(gamestate, mode)}
    </div>
  );
}
