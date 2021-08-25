import { useContext, useEffect, useState } from 'react';
import { CreateRoom, Player, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { INIT, CREATE_ROOM } from '../../../config/constants';
import { useFetch } from '../../../hooks';

export function useHome() {
  const { user, socket, connect } = useContext(UserContext);
  const { gamestate, dispatch } = useContext(GameContext);
  const [isRedirect, setIsRedirect] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const { result, isLoading, isError, setBody } = useFetch<Player, CreateRoom>(
    'POST',
    '/api/game'
  );

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    dispatch({ type: INIT });
  }, [gamestate, dispatch]);

  /**
   * Create a new game room
   */
  const createRoom = () => {
    setCreatingRoom(true);
    connect();
  };

  /**
   * Trigger Fetch once socket has loaded
   */
  useEffect(() => {
    if (user.socketId === null || !creatingRoom) return; // TODO Does this work?
    setBody(user);
  }, [user, creatingRoom, setBody]);

  /**
   * After Successful Fetch
   */
  useEffect(() => {
    if (result === null) return;

    /**
     * Host: Emit create room
     * @param room
     */
    const emitCreateRoom = (room: Room) => {
      logger(`Room ${room}: Room created`);
      socket.emit('host:create-room', room);
    };

    dispatch({
      type: CREATE_ROOM,
      payload: { room: result.data.room, host: result.data.host },
    });

    emitCreateRoom(result.data.room);

    setCreatingRoom(false);

    setIsRedirect(true);
  }, [result, socket, dispatch]);

  return { isLoading, isError, isRedirect, createRoom };
}
