import React from 'react';
import { Gamemode, Gamestate } from '@np-bingo/types';
import { useStatus } from './hooks';

export interface StatusProps {
  gamestate?: Gamestate;
  gamemode?: Gamemode;
  host?: boolean;
  count?: number;
}

export default function Status({
  gamestate = 'init',
  gamemode = 'default',
  host = false,
  count = 0,
}: StatusProps): JSX.Element {
  const [status] = useStatus(gamestate, gamemode, host, count);
  return (
    <div className="text-black dark:text-white text-opacity-90 dark:text-opacity-90">
      {status()}
    </div>
  );
}
