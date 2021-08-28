import { Server, Socket } from 'socket.io';
import { Ball, Gamestate, Host, HostEvent, Player } from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';
import { Room, SocketId } from 'socket.io-adapter';

export function useHostHandlers(io: Server, socket: Socket) {
  const { emitLeaveRoom, emitRoomGamestate, emitRoomNewBall } =
    useCommonHandlers(io, socket);
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room, user: Host) => {
    console.log(`Room ${room}: ${user} created room`);
    socket.join(room);
  };

  /**
   * To Room: Host leaving room
   * @param room
   */
  const hostLeaveRoom = (room: Room) => {
    socket.to(room).emit('host:event', 'left-room');
    emitLeaveRoom(room, 'Host');
  };

  /**
   * Host: Kick player from room
   * @param player
   */
  const kickPlayer = (room: Room, player: Player) => {
    if (player.socketId === null)
      return console.log(
        `Room ${room}: ${player.name} could not be kicked. Invalid socket.`
      );
    io.to(player.socketId).emit('host:event', 'player-kicked');
    console.log(`Room ${room}: ${player.name} kicked`);
  };

  /**
   * To Room: New Gamestate
   * @param gamestate
   * @param room
   */
  const hostGamestate = (room: Room, gamestate: Gamestate) => {
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
  const dispenseBall = (room: Room, ball: Ball) => {
    console.log(
      `Room ${room}: Ball ${ball.column.toUpperCase()}${ball.number} dispensed`
    );
    emitRoomNewBall(room, ball);
  };

  /**
   * Host Events Listener
   * @param event
   * @param room
   * @param payload
   */
  const hostEventsListener = (
    event: HostEvent,
    room: Room,
    payload: Player | Gamestate | Ball
  ) => {
    switch (event) {
      case 'create-room':
        createRoom(room, payload as Player);
        break;
      case 'leave-room':
        hostLeaveRoom(room);
        break;
      case 'kick-player':
        kickPlayer(room, payload as Player);
        break;
      case 'sync-gamestate':
        hostGamestate(room, payload as Gamestate);
        break;
      case 'dispense-ball':
        dispenseBall(room, payload as Ball);
        break;
      default:
        throw new Error('Invalid Host Event');
    }
  };

  return {
    hostEventsListener,
  };
}
