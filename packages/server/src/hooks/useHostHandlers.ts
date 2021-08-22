import { Server, Socket } from 'socket.io';
import { Gamestate, Room } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';

export function useHostHandlers(io: Server, socket: Socket) {
  const { emitRoomGamestate } = useCommonHandlers(io, socket);
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room) => {
    console.log(`User created room ${room}`);
    socket.join(room);
  };

  /**
   * Host: emit gamestate to room
   * @param gamestate
   * @param room
   */
  const hostEmitRoomGamestate = (gamestate: Gamestate, room: Room) => {
    switch (gamestate) {
      case 'ready':
        console.log('Waiting for players to ready up');
        break;
      case 'standby':
        console.log('Game beginning...');
        break;
      case 'start':
        console.log('Game started');
        break;
      case 'end':
        console.log('Game over!');
        break;
      default:
        break;
    }
    emitRoomGamestate(room, gamestate);
  };

  /**
   * From Host: Create room
   * @param room Room
   */
  socket.on('host:create-room', createRoom);

  /**
   * From Host: Gamestate listener
   */
  socket.on('host:gamestate', hostEmitRoomGamestate);
}
