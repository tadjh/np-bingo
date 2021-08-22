import { Socket } from 'socket.io-client';
import socket from '../lib/socket.io';
import { logger } from '../utils';

export function useAppSocket() {
  /**
   * Manual Connect
   */
  const socketConnect = () => {
    socket.connect();
  };

  /**
   * Manual Disconnect
   */
  const socketDisconnect = () => {
    socket.disconnect();
  };

  /**
   * Add player socketId on connect
   */
  const socketOnConnect = () => {
    socket.on('connect', () => {
      logger('You have connected');
      // TODO how to do this?
      // setUserSocket(socket);
      logger(socket.id);
    });
  };

  /**
   * On Disconnect Event
   */
  const socketOnDisconnect = () => {
    socket.on('disconnect', () => {
      logger('You have disconnected');
    });
  };

  return {
    socket,
    socketConnect,
    socketOnConnect,
    socketDisconnect,
    socketOnDisconnect,
  };
}
