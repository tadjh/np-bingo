import { Server, Socket } from 'socket.io';
import { Ball, Gamestate } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';
import { Room, SocketId } from 'socket.io-adapter';
import { IPlayer } from '../models/player';

export function useHostHandlers(io: Server, socket: Socket) {
  const { leaveRoom, emitRoomGamestate, emitRoomNewBall } = useCommonHandlers(
    io,
    socket
  );
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room) => {
    console.log(`Room ${room}: Host created room`);
    socket.join(room);
  };

  /**
   * Host: Broadcast host leaveing room, then leave
   * @param room
   */
  const hostLeaveRoom = (room: Room) => {
    socket.to(room).emit('host:left-room');
    leaveRoom(room, 'Host');
  };

  /**
   * Host: emit gamestate to room
   * @param gamestate
   * @param room
   */
  const hostGamestate = (gamestate: Gamestate, room: Room) => {
    switch (gamestate) {
      case 'ready':
        console.log(`Room ${room}: Waiting for players to ready up`);
        break;
      case 'standby':
        console.log(`Room ${room}: Game beginning...`);
        break;
      case 'start':
        console.log(`Room ${room}: Game started`);
        break;
      case 'end':
        console.log(`Room ${room}: Game over!`);
        break;
      default:
        break;
    }
    emitRoomGamestate(room, gamestate);
  };

  /**
   * Host: new ball dispensed
   * @param room
   * @param ball
   */
  const newBall = (room: Room, ball: Ball) => {
    console.log(
      `Room ${room}: Ball ${ball.column.toUpperCase()}${ball.number} dispensed`
    );
    emitRoomNewBall(room, ball);
  };

  return { createRoom, hostLeaveRoom, hostGamestate, newBall };
}
