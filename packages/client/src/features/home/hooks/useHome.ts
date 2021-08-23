import { useCallback, useContext, useEffect, useState } from 'react';
import { Host } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { apiCreateRoom } from '../api';

export function useHome(
  dispatchCreateRoom: (room: string, host: Host) => void
) {
  const { user, isUpdatingUser, setIsUpdatingUser, connect } =
    useContext(UserContext);
  const { gamestate, play } = useContext(GameContext);
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
    if (isUpdatingUser) return;
    connect();
  }, [isUpdatingUser, connect]);

  useEffect(() => {
    if (!isUpdatingUser || user.socketId === '') return;
    setIsUpdatingUser(false);
    apiCreateRoom(user, (res) => {
      dispatchCreateRoom(res.data.game.room, res.data.game.host);
      setRedirect(true);
      play('ready'); // kind of hacky
    });
  }, [isUpdatingUser, user, dispatchCreateRoom, play, setIsUpdatingUser]);

  return { redirect, createRoom };
}
