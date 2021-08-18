import { Gamemode, Gamestate } from '@np-bingo/types';
import { useHostStatus } from './useHostStatus';
import { usePlayerStatus } from './usePlayerStatus';

export function useStatus(
  gamestate: Gamestate,
  gamemode: Gamemode,
  host: boolean,
  count: number
) {
  const [hostStatus] = useHostStatus(gamestate, count);
  const [playerStatus] = usePlayerStatus(gamestate, gamemode);

  const status = host ? hostStatus : playerStatus;

  return [status];
}
