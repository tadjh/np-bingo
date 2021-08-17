import { useContext, useEffect } from 'react';
import { Ball, Player } from '@np-bingo/types';
import { GameContext } from '../../../context';
import socket from '../../../lib/socket.io';
import { apiDeleteRoom, apiSaveRoom } from '../api';

export default function useHost(
  dispatchRemovePlayer: (player: Player) => void,
  newBall: () => Ball,
  enableProgress: () => void
): [
  boolean,
  () => void,
  () => void,
  (player: Player) => void,
  () => void,
  () => void
] {
  const { gamestate, room, winner, play } = useContext(GameContext);
  /**
   * isDisabled is true when gamestate is not start, standby or failure
   */
  const isDisabled =
    gamestate !== 'start' &&
    gamestate !== 'standby' &&
    gamestate !== 'failure' &&
    true;

  /**
   * Three way toggle for host main button
   * @param gamestate Gamestate
   * @param room Room
   */
  const gamestateToggle = () => {
    switch (gamestate) {
      case 'ready':
        play('standby');
        break;
      case 'end':
        play('ready');
        break;
      default:
        play('end');
        break;
    }
  };

  /**
   * Display text for main action button
   * @param gamestate
   * @returns
   */
  const toggleText = (): string => {
    switch (gamestate) {
      case 'ready':
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
  };

  /**
   * Kick player from room
   * @param player
   */
  const handleRemovePlayer = (player: Player) => {
    socket.emit('remove-player', player);
    dispatchRemovePlayer(player);
  };

  /**
   * Trigger gamestate start, queue new ball and show ball progress animation
   * @param gamestate
   * @param room
   */
  const handleBall = () => {
    // If gamestate isn't already start, set it when a ball is drawn
    if (gamestate === 'standby' || gamestate === 'failure') {
      play('start');
    }
    const ball = newBall();

    if (ball.number === 0) {
      play('end');
    } else {
      enableProgress();
      socket.emit('ball', room, ball);
    }
  };

  /**
   * Leave room by room code
   * @param room Room code
   */
  const handleLeaveRoom = () => {
    socket.emit('leave-room', room);
    apiDeleteRoom(room);
    // TODO Best way to handle async??
    // setIsDeleteRoom(true);
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

  return [
    isDisabled,
    gamestateToggle,
    toggleText,
    handleRemovePlayer,
    handleBall,
    handleLeaveRoom,
  ];
}
