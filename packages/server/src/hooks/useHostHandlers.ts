import { Server, Socket } from 'socket.io';
import {
  Ball,
  Gamestate,
  Host,
  HostEvent,
  Player,
  Winner,
} from '@np-bingo/types';
import { useCommonHandlers } from './useCommonHandlers';
import { Room } from 'socket.io-adapter';

export function useHostHandlers(io: Server, socket: Socket) {
  const {
    emitLeaveRoom,
    emitRoomGamestate,
    emitRoomNewBall,
    emitRoomWinners,
    emitRoomLosers,
  } = useCommonHandlers(io, socket);
  /**
   * Host: Create room and join it
   * @param room
   */
  const createRoom = (room: Room, username: Host['name']) => {
    console.log(`Room ${room}: ${username} created room`);
    socket.join(room);
    socket.data = { room, player: { name: username } };
  };

  /**
   * To Room: Host leaving room
   * @param room
   */
  const hostLeaveRoom = (room: Room) => {
    socket.to(room).emit('host:event', 'leave-room');
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
    io.to(player.socketId).emit('host:event', 'kick-player');
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

  const winningCards = (room: Room, winners: Winner[]) => {
    const privateWinnerNames: Winner[] = winners.map((winner) => {
      const privatePlayer: Pick<Player, 'name' | 'socketId'> = {
        name: winner.player.name,
        socketId: winner.player.socketId,
      };

      const privateWinner = { ...winner, player: privatePlayer };

      if (winner.player.socketId)
        io.to(winner.player.socketId).emit(
          'host:event',
          'winning-cards',
          winner
        );

      console.log(`Room ${room}: ${winner.player.name} has BINGO!`);

      return privateWinner;
    });
    emitRoomWinners(room, privateWinnerNames);
  };

  const losingCards = (room: Room, losers: Player[]) => {
    const loserNames = losers.map((loser) => {
      if (!loser.socketId) return loser.name;
      console.log(`Room ${room}: ${loser.name} does not have BINGO...`);
      // io.to(loser.socketId).emit('host:event', 'losing-cards');
      return loser.name;
    });
    emitRoomLosers(room, loserNames);
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
    payload: Player | Gamestate | Ball | Winner[] | Player[]
  ) => {
    switch (event) {
      case 'create-room':
        createRoom(room, payload as Player['name']);
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
      case 'winning-cards':
        winningCards(room, payload as Winner[]);
        break;
      case 'losing-cards':
        losingCards(room, payload as Player[]);
        break;
      default:
        throw new Error('Invalid Host Event');
    }
  };

  return {
    hostEventsListener,
  };
}
