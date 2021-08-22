import { useCallback, useContext, useEffect, useState } from 'react';
import { Host } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { apiCreateRoom } from '../api';

export function useHome(
  dispatchCreateRoom: (room: string, host: Host) => void
) {
  const { user, hostConnect } = useContext(UserContext);
  const { gamestate, play } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    play('init');
  }, [gamestate, play]);

  /**
   * Create a new game room
   */
  const createRoom = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    apiCreateRoom(user, (res) => {
      dispatchCreateRoom(res.data.game.room, res.data.game.host);
      setIsLoading(false);
      hostConnect(res.data.game.room);
      setRedirect(true);
      play('ready'); // kind of hacky
    });
  }, [isLoading, user, play, dispatchCreateRoom, hostConnect]);

  return { isLoading, redirect, createRoom };
}
