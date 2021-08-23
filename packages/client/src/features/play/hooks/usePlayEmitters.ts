import { useContext, useEffect } from 'react';
import { Card } from '@np-bingo/types';
import { GameContext, RoomContext, UserContext } from '../../../context';

export function usePlayEmitters() {
  const { user, socket } = useContext(UserContext);
  const { room, host, winner } = useContext(RoomContext);
  const { gamestate } = useContext(GameContext);

  // TODO Consider socket host.socket, user and maybe room into an object
  /**
   * To Host: Send user ready
   */
  const emitReadyUp = () => {
    socket.emit('player:action', 'ready-up', room, host.socketId, user);
  };

  /**
   * To Host & Room: Send user card
   */
  // const emitSendCard = (card: Card) => {
  //   socket.emit('send-card', room, host.socketId, user, card);
  // };

  /**
   * To Room: Send player left
   */
  const emitLeaveRoom = () => {
    socket.emit('player:action', 'leave-room', room, host.socketId, user);
  };

  // TODO Is this necessary?
  /**
   * To Room: Player won the game
   */
  // const emitGameWin = () => {
  //   socket.emit('win', room, winner.player.name);
  // };

  // TODO ????
  // useEffect(() => {
  //   if (gamestate === 'win') {
  //     emitGameWin();
  //   }
  // });

  return {
    emitReadyUp,
    // emitSendCard,
    emitLeaveRoom,
    // emitGameWin
  };
}
