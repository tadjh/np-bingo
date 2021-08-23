import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { Card, PlayerAction } from '@np-bingo/types';
import { IPlayer } from '../models/player';
import { useCommonHandlers } from './useCommonHandlers';

export function usePlayerHandlers(io: Server, socket: Socket) {
  const { leaveRoom } = useCommonHandlers(io, socket);

  /**
   * Player: Action handler
   * @param action
   * @param room
   * @param hostSocketId
   * @param player
   * @param card (optional)
   */
  const playerAction = (
    action: PlayerAction,
    room: Room,
    hostSocketId: SocketId,
    player: IPlayer,
    card?: Card
  ) => {
    switch (action) {
      case 'join-room':
        joinRoom(room, hostSocketId, player);
        break;
      case 'leave-room':
        playerLeaveRoom(room, hostSocketId, player);
        break;
      default:
        throw new Error('Invalid player action');
    }
  };

  /**
   * Player: Leave rooms
   * @param room
   * @param hostSocketId
   * @param player
   */
  const joinRoom = (room: Room, hostSocketId: SocketId, player: IPlayer) => {
    socket.join(room);
    console.log(`Room ${room}: Player joined`);
    io.to(hostSocketId).emit('host:player-action', 'join-room', player);
  };

  /**
   * Player: Notifiy host of player leaving room, then leave room.
   * @param room
   * @param hostSocketId
   * @param player
   */
  const playerLeaveRoom = (
    room: Room,
    hostSocketId: SocketId,
    player: IPlayer
  ) => {
    io.to(hostSocketId).emit('host:player-action', 'leave-room', player);
    leaveRoom(room, player.name);
  };

  return { playerAction, playerLeaveRoom };
}
