import { Dispatch, useEffect, useMemo } from 'react';
import socketInit from '../lib/socket.io';
import { logger } from '../utils';
import { UserActions } from '../reducers/user.reducer';
import { SOCKET_SUCCESS } from '../config/constants';

export function useSocket(userDispatch: Dispatch<UserActions>) {
  const socket = useMemo(socketInit, [socketInit]);

  /**
   * Connect
   */
  const connect = () => {
    socket.connect();
  };

  /**
   * Disconnect
   */
  const disconnect = () => {
    socket.disconnect();
  };

  /**
   * Socket.io listeners
   */
  useEffect(() => {
    /**
     * On Connect event
     */
    const onConnect = () => {
      logger('You have connected');
      logger(socket.id);
      userDispatch({ type: SOCKET_SUCCESS, payload: socket.id });
    };

    /**
     * On Disconnect event
     */
    const onDisconnect = () => {
      logger('You have disconnected');
    };

    /**
     * Connect event listener
     */
    socket.on('connect', onConnect);

    /**
     * Disconnect event listener
     */
    socket.on('disconnect', onDisconnect);
  }, [socket, userDispatch]);

  return {
    socket,
    connect,
    disconnect,
  };
}
