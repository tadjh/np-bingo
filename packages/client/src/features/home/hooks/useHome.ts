import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Host } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { apiCreateRoom } from '../api';

export function useHome(
  dispatchCreateRoom: (room: string, host: Host) => void
): [boolean, () => void] {
  let history = useHistory();
  const user = useContext(UserContext);
  const { gamestate, room, play } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    play('init');
  }, [gamestate, play]);

  /**
   * Route after create room
   */
  useEffect(() => {
    if (gamestate !== 'init' || room === '') return;
    history.push(`/host?r=${room}`);
  }, [gamestate, room, history]);

  /**
   * Create a new game room
   */
  const createRoom = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    apiCreateRoom(user, (res) => {
      dispatchCreateRoom(res.data.game.room, res.data.game.host);
      setIsLoading(false);
    });
  }, [isLoading, user, dispatchCreateRoom]);

  return [isLoading, createRoom];
}
