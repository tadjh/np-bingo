import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { Ball, Card, Gamestate, Player, Winner } from '@np-bingo/types';

export function useCommonHandlers(io: Server, socket: Socket) {
  /**
   * Leave room
   * @param room
   */
  const emitLeaveRoom = (room: Room, name: string) => {
    socket.leave(room);
    console.log(`Room ${room}: ${name} left room`);
  };

  /**
   * Send socket's gamestate to room
   * @param room
   * @param gamestate
   */
  const emitRoomGamestate = (room: Room, gamestate: Gamestate) => {
    socket.to(room).emit('room:event', 'sync-gamestate', gamestate);
  };

  /**
   * Send new ball to room
   * @param room
   * @param ball
   */
  const emitRoomNewBall = (room: Room, ball: Ball) => {
    socket.to(room).emit('room:event', 'dispense-ball', ball);
  };

  /**
   * Notify the room that a card was sent to the host
   * @param room
   * @param playerName
   */
  const emitRoomCheckCard = (room: Room, playerName: Player['name']) => {
    socket.to(room).emit('room:event', 'send-card', playerName);
  };

  /**
   * Notify the room that the player's card is a winner
   * @param room
   * @param playerName
   */
  const emitRoomWinners = (room: Room, winningPlayers: Winner[]) => {
    socket.to(room).emit('room:event', 'winning-cards', winningPlayers);
  };

  /**
   * Notify the room that the player's card is not a winner
   * @param room
   * @param playerName
   */
  const emitRoomLosers = (room: Room, playerNames: Player['name'][]) => {
    // TODO Nothing being done with these names
    socket.to(room).emit('room:event', 'losing-cards', playerNames);
  };

  return {
    emitLeaveRoom,
    emitRoomGamestate,
    emitRoomNewBall,
    emitRoomCheckCard,
    emitRoomWinners,
    emitRoomLosers,
  };
}
