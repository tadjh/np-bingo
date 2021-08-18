import { useCallback, useContext } from 'react';
import { Ball, Player } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';

export function useHostEmitters() {
  const {
    user: { socket },
  } = useContext(UserContext);
  const { room, winner } = useContext(GameContext);

  /**
   * To player: Kick Player
   */
  const emitKickPlayer = (player: Player) => {
    socket.emit('remove-player', player);
  };

  /**
   * To Room: Send new ball
   * @param ball
   */
  const emitSendBall = (ball: Ball) => {
    socket.emit('ball', room, ball);
  };

  /**
   * To Room: Host left room
   */
  const emitLeaveRoom = () => {
    socket.emit('leave-room', room);
  };

  /**
   * To Room: Host created room
   */
  const emitCreateRoom = useCallback(() => {
    socket.emit('create-room', room);
  }, [socket, room]);

  /**
   * To Room: Host ready
   */
  const emitHostReady = useCallback(() => {
    socket.emit('ready', room);
  }, [socket, room]);

  /**
   * To Room: Host on standby
   */
  const emitHostStandby = useCallback(() => {
    socket.emit('standby', room);
  }, [socket, room]);

  /**
   * To Room: Host started game
   */
  const emitHostStartedGame = useCallback(() => {
    socket.emit('start', room);
  }, [socket, room]);

  /**
   * To Room: Validating Card
   */
  const emitHostValidating = useCallback(() => {
    socket.emit('checking-card', room);
  }, [socket, room]);

  /**
   * To Room: Card is not a winner
   */
  const emitNotAWinner = useCallback(() => {
    socket.emit('losing-card', room, winner);
  }, [socket, room, winner]);

  /**
   * To Room: Card is a winner
   */
  const emitIsAWinner = useCallback(() => {
    socket.emit('winning-card', room, winner);
  }, [socket, room, winner]);

  /**
   * To Room: Card is a winner
   */
  const emitHostGameOver = useCallback(() => {
    socket.emit('end', room);
  }, [socket, room]);

  return {
    emitKickPlayer,
    emitSendBall,
    emitLeaveRoom,
    emitCreateRoom,
    emitHostReady,
    emitHostStandby,
    emitHostStartedGame,
    emitHostValidating,
    emitNotAWinner,
    emitIsAWinner,
    emitHostGameOver,
  };
}
