import { useContext } from 'react';
import { GameContext } from '../../../../context';
import { useHostStatus } from './useHostStatus';
import { usePlayerStatus } from './usePlayerStatus';

export function useStatus(count: number, host: boolean) {
  const { gamestate, gamemode } = useContext(GameContext);
  const [hostStatus] = useHostStatus(gamestate, count);
  const [playerStatus] = usePlayerStatus(gamestate, gamemode);

  const status = host ? hostStatus : playerStatus;

  return [status];
}
