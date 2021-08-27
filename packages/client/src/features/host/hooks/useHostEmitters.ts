import { useCallback, useContext } from 'react';
import { Ball, Player } from '@np-bingo/types';
import { RoomContext, UserContext } from '../../../context';

export function useHostEmitters() {
  const { socket } = useContext(UserContext);
  const { room, winner } = useContext(RoomContext);

  /**
   * To Room: Host left room
   */
  const emitLeaveRoom = () => {
    socket.emit('host:leave-room', room);
  };

  /**
   * To player: Kick Player
   */
  const emitKickPlayer = (player: Player) => {
    socket.emit('host:kick-player', room, player);
  };

  /**
   * To Room: Host ready
   */
  const emitHostReady = useCallback(() => {
    socket.emit('host:gamestate', 'ready', room);
  }, [socket, room]);

  /**
   * To Room: Host on standby
   */
  const emitHostStandby = useCallback(() => {
    socket.emit('host:gamestate', 'standby', room);
  }, [socket, room]);

  /**
   * To Room: Host started game
   */
  const emitHostStart = useCallback(() => {
    socket.emit('host:gamestate', 'start', room);
  }, [socket, room]);

  /**
   * To Room: Send new ball
   * @param ball
   */
  const emitSendBall = (ball: Ball) => {
    // TODO set player gamestate on new ball
    socket.emit('host:ball', room, ball);
  };

  /**
   * To Room: Validating Card
   */
  // const emitHostValidate = useCallback(() => {
  //   socket.emit('checking-card', room);
  // }, [socket, room]);

  /**
   * To Room: Card is not a winner
   */
  // const emitNotAWinner = useCallback(() => {
  //   socket.emit('losing-card', room, winner);
  // }, [socket, room, winner]);

  /**
   * To Room: Card is a winner
   */
  // const emitIsAWinner = useCallback(() => {
  //   socket.emit('winning-card', room, winner);
  // }, [socket, room, winner]);

  /**
   * To Room: Game over
   */
  const emitHostEnd = useCallback(() => {
    socket.emit('host:gamestate', 'end', room);
  }, [socket, room]);

  return {
    // emitCreateRoom,
    emitLeaveRoom,
    emitKickPlayer,
    emitHostReady,
    emitHostStandby,
    emitHostStart,
    emitSendBall,
    // emitHostValidating,
    // emitNotAWinner,
    // emitIsAWinner,
    emitHostEnd,
  };
}
