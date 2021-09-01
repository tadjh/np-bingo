import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { Card, Player, PlayerCard, PlayerEvent } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';

export function usePlayerHandlers(io: Server, socket: Socket) {
  const { emitLeaveRoom, emitRoomCheckCard } = useCommonHandlers(io, socket);

  /**
   * To Host: Player Join room
   * @param room
   * @param hostSocketId
   * @param player
   */
  const joinRoom = (room: Room, hostSocketId: SocketId, player: Player) => {
    socket.join(room);
    console.log(`Room ${room}: ${player.name} joined`);
    io.to(hostSocketId).emit('host:player-event', 'join-room', player);
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
    io.to(hostSocketId).emit('host:player-event', 'leave-room', player);
    emitLeaveRoom(room, player.name);
  };

  /**
   * To Host: Player is Ready
   * @param room
   * @param hostSocketId
   * @param player
   */
  const readyUp = (room: Room, hostSocketId: SocketId, player: Player) => {
    console.log(`Room ${room}: ${player.name} is ready`);
    io.to(hostSocketId).emit('host:player-event', 'ready-up', player);
  };

  /**
   * To Host & Room: Player sent a card
   * @param room
   * @param hostSocketId
   * @param player
   * @param card
   */
  const sendCard = (
    room: Room,
    hostSocketId: SocketId,
    playerCard: PlayerCard
  ) => {
    console.log(`Room ${room}: ${playerCard.owner.name} sent a card`);
    io.to(hostSocketId).emit('host:player-event', 'send-card', playerCard);
    emitRoomCheckCard(room, playerCard.owner.name);
  };

  /**
   * Player: Event listener
   * @param event
   * @param room
   * @param hostSocketId
   * @param player
   * @param card (optional)
   */
  const playerEventsListener = (
    event: PlayerEvent,
    room: Room,
    hostSocketId: SocketId,
    payload: Player | PlayerCard
  ) => {
    switch (event) {
      case 'join-room':
        joinRoom(room, hostSocketId, payload as Player);
        break;
      case 'leave-room':
        playerLeaveRoom(room, hostSocketId, payload as Player);
        break;
      case 'ready-up':
        readyUp(room, hostSocketId, payload as Player);
        break;
      case 'send-card':
        sendCard(room, hostSocketId, payload as PlayerCard);
        break;
      default:
        throw new Error('Invalid player event');
    }
  };

  return { playerEventsListener };
}
