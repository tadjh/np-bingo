import { Server, Socket } from 'socket.io';
import { Gamestate } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';
import { Room, SocketId } from 'socket.io-adapter';
import { IPlayer } from '../models/player';

export function useHostHandlers(io: Server, socket: Socket) {
  const { leaveRoom, emitRoomGamestate } = useCommonHandlers(io, socket);
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room) => {
    console.log(`${room}: Host created room`);
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
  const hostEmitRoomGamestate = (gamestate: Gamestate, room: Room) => {
    switch (gamestate) {
      case 'ready':
        console.log(`${room}: Waiting for players to ready up`);
        break;
      case 'standby':
        console.log(`${room}: Game beginning...`);
        break;
      case 'start':
        console.log(`${room}: Game started`);
        break;
      case 'end':
        console.log(`${room}: Game over!`);
        break;
      default:
        break;
    }
    emitRoomGamestate(room, gamestate);
  };

  return { createRoom, hostLeaveRoom, hostEmitRoomGamestate };
}
