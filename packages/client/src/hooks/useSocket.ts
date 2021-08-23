import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { Socket } from 'socket.io-client';
import { Player, Room } from '@np-bingo/types';
import socketInit from '../lib/socket.io';
import { logger } from '../utils';

export function useSocket(
  setUser: Dispatch<SetStateAction<Player>>,
  setIsUpdatingUser: Dispatch<SetStateAction<boolean>>
) {
  const socket = useMemo(socketInit, [socketInit]);
  /**
   * Host Manual Connect
   */
  const hostConnect = (room: Room) => {
    if (socket.id) return;
    connect();
    emitCreateRoom(room);
  };

  /**
   * Host: Emit create room
   * @param room
   */
  const emitCreateRoom = (room: Room) => {
    logger(`Creating room: ${room}`);
    socket.emit('host:create-room', room);
  };

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
   * On Connect event
   */
  const onConnect = useCallback(() => {
    logger('You have connected');
    logger(socket.id);
    setUser((prevUser) => ({ ...prevUser, socketId: socket.id }));
    setIsUpdatingUser(true);
  }, [socket.id, setUser, setIsUpdatingUser]);

  /**
   * On Disconnect event
   */
  const onDisconnect = () => {
    logger('You have disconnected');
  };

  /**
   * Socket.io listeners
   */
  useEffect(() => {
    /**
     * Connect event listener
     */
    socket.on('connect', onConnect);

    /**
     * Disconnect event listener
     */
    socket.on('disconnect', onDisconnect);
  }, [socket, onConnect]);

  return {
    socket,
    connect,
    hostConnect,
  };
}
