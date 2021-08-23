import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { Card, Player, PlayerAction } from '@np-bingo/types';
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
    player: Player,
    card?: Card
  ) => {
    switch (action) {
      case 'join-room':
        joinRoom(room, hostSocketId, player);
        break;
      case 'leave-room':
        playerLeaveRoom(room, hostSocketId, player);
        break;
      case 'ready-up':
        readyUp(room, hostSocketId, player);
        break;
      default:
        throw new Error('Invalid player action');
    }
  };

  /**
   * To Host: Player Join room
   * @param room
   * @param hostSocketId
   * @param player
   */
  const joinRoom = (room: Room, hostSocketId: SocketId, player: Player) => {
    socket.join(room);
    console.log(`Room ${room}: Player joined`);
    io.to(hostSocketId).emit('host:player-action', 'join-room', player);
  };

  /**
   * To Host: Player Leave Room
   * @param room
   * @param hostSocketId
   * @param player
   */
  const playerLeaveRoom = (
    room: Room,
    hostSocketId: SocketId,
    player: Player
  ) => {
    io.to(hostSocketId).emit('host:player-action', 'leave-room', player);
    leaveRoom(room, player.name);
  };

  /**
   * To Host: Player Ready Up
   * @param room
   * @param hostSocketId
   * @param player
   */
  const readyUp = (room: Room, hostSocketId: SocketId, player: Player) => {
    console.log(`Room ${room}: ${player.name} is ready`);
    io.to(hostSocketId).emit('host:player-action', 'ready-up', player);
  };

  return { playerAction, playerLeaveRoom };
}
