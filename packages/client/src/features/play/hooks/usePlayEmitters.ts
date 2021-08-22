import { useContext, useEffect } from 'react';
import { Card } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import socket from '../../../lib/socket.io';
import { usePlayButton } from '.';

export function usePlayEmitters() {
  const user = useContext(UserContext);
  const { gamestate, room, host, winner } = useContext(GameContext);
  // const { triggerBallEffects } = usePlayButton();

  // TODO Consider socket host.socket, user and maybe room into an object

  /**
   * To Host: Send user ready
   */
  const emitReadyUp = () => {
    socket.emit('ready-up', host.socket, user);
  };

  /**
   * To Host & Room: Send user card
   */
  const emitSendCard = (card: Card) => {
    socket.emit('send-card', room, host.socket, user, card);
  };

  /**
   * To Room: Send player left
   */
  const emitLeaveRoom = () => {
    // if (gamemode === 'solo') return;
    socket.emit('leave-room', room, host.socket, user);
  };

  // TODO Is this necessary?
  /**
   * To Room: Player won the game
   */
  const emitGameWin = () => {
    socket.emit('win', room, winner.player.name);
  };

  useEffect(() => {
    if (gamestate === 'win') {
      emitGameWin();
    }
    // TODO Does this work? MOVE TO LISTNERS
    // socket.on('game-ball', () => {
    //   triggerBallEffects();
    // });
  });
  return { emitReadyUp, emitSendCard, emitLeaveRoom, emitGameWin };
}
