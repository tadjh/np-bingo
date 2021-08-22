import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { IPlayer } from '../models/player';
import { useCommonHandlers } from './useCommonHandlers';

export function usePlayerHandlers(io: Server, socket: Socket) {
  const { leaveRoom } = useCommonHandlers(io, socket);

  /**
   * Notifiy host of player leaving room, then leave room.
   * @param room
   * @param hostSocketId
   * @param player
   */
  const playerLeaveRoom = (
    room: Room,
    hostSocketId: SocketId,
    name: string
  ) => {
    io.to(hostSocketId).emit('host:player-left', name);
    leaveRoom(room, name);
  };

  /**
   * From Player: Leaving room
   */
  socket.on('player:leave-room', playerLeaveRoom);
}
