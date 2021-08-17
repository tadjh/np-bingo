import { useContext } from 'react';
import { Player } from '@np-bingo/types';
import { BallContext, FeautresContext, GameContext } from '../../../context';
import { apiDeleteRoom } from '../api';
import { useProgress } from '../../../hooks';
import { useHostSocket } from './useHostSocket';

export function useHost(dispatchRemovePlayer: (player: Player) => void) {
  const { ballDelay } = useContext(FeautresContext);
  const { gamestate, room, play } = useContext(GameContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);
  const { newBall } = useContext(BallContext);
  const { emitKickPlayer, emitSendBall, emitLeaveRoom } = useHostSocket();

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
    emitKickPlayer(player);
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
      emitSendBall(ball);
    }
  };

  /**
   * Leave room by room code
   * @param room Room code
   */
  const handleLeaveRoom = () => {
    emitLeaveRoom();
    apiDeleteRoom(room);
    // TODO Best way to handle async??
    // setIsDeleteRoom(true);
  };

  return {
    progress,
    inProgress,
    isDisabled,
    gamestateToggle,
    toggleText,
    handleRemovePlayer,
    handleBall,
    handleLeaveRoom,
  };
}
