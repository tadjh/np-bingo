import { Dispatch, useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
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
    const onDisconnect = (reason: Socket.DisconnectReason) => {
      switch (reason) {
        case 'io server disconnect':
          logger('You have been forcefully disconnected from the server.');
          break;
        case 'io client disconnect':
          logger('You have been manually disconnected from the server.');
          break;
        case 'ping timeout':
          logger('Server timeout. You have been disconnected.');
          break;
        case 'transport close':
          logger('You have lost connection to the server.');
          break;
        case 'transport error':
          logger('Connection error. You have been disconnected.');
          break;
        default:
          throw new Error('Invalid disconnection reason provided');
      }
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
