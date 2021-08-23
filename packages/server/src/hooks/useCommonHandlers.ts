import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { Ball, Gamestate } from '@np-bingo/types';

export function useCommonHandlers(io: Server, socket: Socket) {
  /**
   * Leave room
   * @param room
   */
  const leaveRoom = (room: Room, name: string) => {
    socket.leave(room);
    console.log(`Room ${room}: ${name} left room`);
  };

  /**
   * Send socket's gamestate to room
   * @param room
   * @param gamestate
   */
  const emitRoomGamestate = (room: Room, gamestate: Gamestate) => {
    socket.to(room).emit('room:gamestate', gamestate);
  };

  /**
   * Send new ball to room
   * @param room
   * @param ball
   */
  const emitRoomNewBall = (room: Room, ball: Ball) => {
    socket.to(room).emit('room:new-ball', ball);
  };

  return { leaveRoom, emitRoomGamestate, emitRoomNewBall };
}
