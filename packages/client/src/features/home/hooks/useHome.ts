import { useContext, useEffect, useState } from 'react';
import { CreateRoom, Host, Player, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { CREATE_ROOM, INIT, SOCKET_INIT } from '../../../config/constants';
import { useFetch } from '../../../hooks';

export function useHome() {
  const { user, socket, isSocketLoading, connect, userDispatch } = useContext(
    UserContext
  );
  const { gamestate, dispatch } = useContext(GameContext);
  const [isRedirect, setIsRedirect] = useState(false);
  const [didInit, setDidInit] = useState(false);
  const { result, isLoading, isError, setBody } = useFetch<Player, CreateRoom>(
    'POST',
    '/api/game'
  );

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (didInit) return;
    if (gamestate === 'init') return setDidInit(true);
    dispatch({ type: INIT });
  }, [gamestate, didInit, dispatch]);

  /**
   * Connect to socket.io
   */
  useEffect(() => {
    // Don't reconnect if already connected
    if (socket.connected === true || isSocketLoading) return;
    userDispatch({ type: SOCKET_INIT });
    connect();
  }, [socket, isSocketLoading, connect, userDispatch]);

  /**
   * Create a new game room
   * Trigger Fetch only if socket is loaded
   */
  const createRoom = () => {
    if (user.socketId === null) return; //  || !creatingRoom
    setBody(user);
    // setCreatingRoom(true);
  };

  /**
   * After Successful Fetch
   */
  useEffect(() => {
    if (result === null) return;

    /**
     * Host: Emit create room
     * @param room
     */
    const emitCreateRoom = (room: Room, name: Host['name']) => {
      logger(`Room ${room}: ${name} created a new room`);
      socket.emit('host:create-room', room, name);
    };

    dispatch({
      type: CREATE_ROOM,
      payload: { room: result.data.room, host: result.data.host },
    });

    emitCreateRoom(result.data.room, result.data.host.name);

    setIsRedirect(true);
  }, [result, socket, dispatch]);

  return { isLoading, isError, isRedirect, isSocketLoading, createRoom };
}
