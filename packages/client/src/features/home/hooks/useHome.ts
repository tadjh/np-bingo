import { useCallback, useContext, useEffect, useState } from 'react';
import { Host, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { apiCreateRoom } from '../api';
import { logger } from '../../../utils';

export function useHome(
  dispatchCreateRoom: (room: string, host: Host) => void
) {
  const { user, socket, isUpdatingUser, setIsUpdatingUser, connect } =
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
  const createRoom = () => {
    if (isUpdatingUser) return;
    connect();
  };

  /**
   * Host: Emit create room
   * @param room
   */
  const emitCreateRoom = useCallback(
    (room: Room) => {
      logger(`Room ${room}: Room created`);
      socket.emit('host:create-room', room);
    },
    [socket]
  );

  useEffect(() => {
    if (!isUpdatingUser || user.socketId === '') return;
    setIsUpdatingUser(false);
    apiCreateRoom(user, (res) => {
      dispatchCreateRoom(res.data.game.room, res.data.game.host);
      emitCreateRoom(res.data.game.room);
      setRedirect(true);
    });
  }, [
    isUpdatingUser,
    user,
    dispatchCreateRoom,
    play,
    setIsUpdatingUser,
    emitCreateRoom,
  ]);

  return { redirect, createRoom };
}
