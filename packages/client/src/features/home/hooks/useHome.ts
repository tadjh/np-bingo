import { useContext, useEffect, useState } from 'react';
import { CreateRoom, Player, Room } from '@np-bingo/types';
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
  // const [isHome, setIsHome] = useState(true);
  const { result, isLoading, isError, setBody } = useFetch<Player, CreateRoom>(
    'POST',
    '/api/game'
  );

  // TODO handle this better
  /**
   * Reset gamestate on visit to home
   */
  // useEffect(() => {
  //   if (gamestate === 'init') return;
  //   dispatch({ type: INIT });
  // }, [gamestate, dispatch]);

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

  // TODO Move socket delegation to App

  /**
   * Trigger Fetch once socket is loaded
   */
  // useEffect(() => {
  //   if (user.socketId === null || !creatingRoom) return;
  //   setBody(user);
  // }, [user, creatingRoom, setBody]);

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

    setIsRedirect(true);
  }, [result, socket, dispatch]);

  return { isLoading, isError, isRedirect, isSocketLoading, createRoom };
}
