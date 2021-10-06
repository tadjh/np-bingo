import { useContext } from 'react';
import { Ball, Player, Winner } from '@np-bingo/types';
import { RoomContext, UserContext } from '../../../context';

export function useHostEmitters() {
  const { socket } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  /**
   * To Room: Host left room
   */
  const emitLeaveRoom = () => {
    socket.emit('host:event', 'leave-room', room);
  };

  /**
   * To player: Kick Player
   */
  const emitKickPlayer = (player: Player) => {
    socket.emit('host:event', 'kick-player', room, player);
  };

  /**
   * To Room: Host ready
   */
  const emitHostReady = () => {
    socket.emit('host:event', 'sync-gamestate', room, 'ready');
  };

  /**
   * To Room: Host on standby
   */
  const emitHostStandby = () => {
    socket.emit('host:event', 'sync-gamestate', room, 'standby');
  };

  /**
   * To Room: Send new ball
   * @param ball
   */
  const emitSendBall = (ball: Ball) => {
    socket.emit('host:event', 'dispense-ball', room, ball);
  };

  /**
   * To Room: Card(s) is a winner
   */
  const emitWinners = (winners: Winner[]) => {
    socket.emit('host:event', 'winning-cards', room, winners);
  };

  /**
   * To Room: Card(s) not a winner
   */
  const emitLosers = (losers: Player[]) => {
    socket.emit('host:event', 'losing-cards', room, losers);
  };

  /**
   * To Room: Game over
   */
  const emitHostEnd = () => {
    socket.emit('host:event', 'sync-gamestate', room, 'end');
  };

  return {
    emitLeaveRoom,
    emitKickPlayer,
    emitHostReady,
    emitHostStandby,
    emitSendBall,
    emitWinners,
    emitLosers,
    emitHostEnd,
  };
}
