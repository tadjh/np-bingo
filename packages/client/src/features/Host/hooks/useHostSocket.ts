import { useContext, useEffect } from 'react';
import { Ball, Player } from '@np-bingo/types';
import socket from '../../../lib/socket.io';
import { GameContext } from '../../../context';
import { apiSaveRoom } from '../api';
export function useHostSocket() {
  const { gamestate, room, winner, play } = useContext(GameContext);

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
   * Keep the room in sync with this host's gamestate
   */
  useEffect(() => {
    switch (gamestate) {
      case 'init':
        socket.emit('create-room', room);
        play('ready');
        break;
      case 'ready':
        socket.emit('ready', room);
        break;
      case 'standby':
        socket.emit('standby', room);
        break;
      case 'start':
        socket.emit('start', room);
        break;
      case 'failure':
        socket.emit('losing-card', room, winner);
        break;
      case 'win':
        socket.emit('winning-card', room, winner);
        apiSaveRoom(room, winner);
        break;
      case 'end':
        socket.emit('end', room);
        break;
    }
  }, [gamestate, room, winner, play]);

  return { emitKickPlayer, emitSendBall, emitLeaveRoom };
}
