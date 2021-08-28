import { useCallback, useContext } from 'react';
import { Ball, Player, Winner } from '@np-bingo/types';
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
  const emitHostReady = () => {
    socket.emit('host:gamestate', 'ready', room);
  };

  /**
   * To Room: Host on standby
   */
  const emitHostStandby = () => {
    socket.emit('host:gamestate', 'standby', room);
  };

  /**
   * To Room: Host started game
   */
  // const emitHostStart = useCallback(() => {
  //   socket.emit('host:gamestate', 'start', room);
  // }, [socket, room]);

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
  const emitValidate = (player: Player) => {
    socket.emit('host:event', 'check-card', room, player);
  };

  /**
   * To Room: Card is a winner
   */
  const emitWinner = (owner: Player) => {
    socket.emit('host:event', 'winning-card', room, owner);
  };

  /**
   * To Room: Card is not a winner
   */
  const emitNotWinner = (owner: Player) => {
    socket.emit('host:event', 'losing-card', room, owner);
  };

  /**
   * To Room: Game over
   */
  const emitHostEnd = () => {
    socket.emit('host:gamestate', 'end', room);
  };

  return {
    // emitCreateRoom,
    emitLeaveRoom,
    emitKickPlayer,
    emitHostReady,
    emitHostStandby,
    // emitHostStart,
    emitSendBall,
    emitValidate,
    emitWinner,
    emitNotWinner,
    emitHostEnd,
  };
}
