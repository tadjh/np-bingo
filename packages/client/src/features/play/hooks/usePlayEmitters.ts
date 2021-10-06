import { useContext } from 'react';
import { Card } from '@np-bingo/types';
import { RoomContext, UserContext } from '../../../context';

export function usePlayEmitters() {
  const { user, socket } = useContext(UserContext);
  const { room, host } = useContext(RoomContext);

  /**
   * To Host: Send user ready
   */
  const emitReadyUp = () => {
    socket.emit('player:event', 'ready-up', room, host.socketId, user);
  };

  /**
   * To Host & Room: Send user card
   */
  const emitSendCard = (card: Card) => {
    socket.emit('player:event', 'send-card', room, host.socketId, {
      card,
      owner: user,
    });
  };

  /**
   * To Room: Send player left
   */
  const emitLeaveRoom = () => {
    socket.emit('player:event', 'leave-room', room, host.socketId, user);
  };

  return {
    emitReadyUp,
    emitSendCard,
    emitLeaveRoom,
  };
}
