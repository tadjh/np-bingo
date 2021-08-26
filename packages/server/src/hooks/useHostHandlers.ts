import { Server, Socket } from 'socket.io';
import { Ball, Gamestate, Host, Player } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';
import { Room, SocketId } from 'socket.io-adapter';

export function useHostHandlers(io: Server, socket: Socket) {
  const { leaveRoom, emitRoomGamestate, emitRoomNewBall } = useCommonHandlers(
    io,
    socket
  );
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room, name: Host['name']) => {
    console.log(`Room ${room}: ${name} created room`);
    socket.join(room);
  };

  /**
   * Host: Kick player from room
   * @param player
   */
  const kickPlayer = (room: Room, player: Player) => {
    io.to(player.socketId).emit('host:action', 'player-kicked');
    console.log(`Room ${room}: ${player.name} kicked`);
  };

  /**
   * To Room: New Gamestate
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
   * To Room: New ball dispensed
   * @param room
   * @param ball
   */
  const newBall = (room: Room, ball: Ball) => {
    console.log(
      `Room ${room}: Ball ${ball.column.toUpperCase()}${ball.number} dispensed`
    );
    emitRoomNewBall(room, ball);
  };

  /**
   * To Room: Host leaving room
   * @param room
   */
  const hostLeaveRoom = (room: Room) => {
    socket.to(room).emit('host:action', 'left-room');
    leaveRoom(room, 'Host');
  };

  return { createRoom, kickPlayer, hostGamestate, newBall, hostLeaveRoom };
}
