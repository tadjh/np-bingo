import React from 'react';
import { Gamemode, Gamestate } from '@np-bingo/types';
import { useStatus } from './hooks';

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
  const [status] = useStatus(gamestate, mode, count, host);
  return (
    <div className="text-black dark:text-white text-opacity-90 dark:text-opacity-90">
      {status}
    </div>
  );
}
