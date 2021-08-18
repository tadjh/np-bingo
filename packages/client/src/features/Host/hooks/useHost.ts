import { useCallback, useContext, useEffect } from 'react';
import { Player } from '@np-bingo/types';
import { BallContext, FeautresContext, GameContext } from '../../../context';
import { apiDeleteRoom, apiSaveRoom } from '../api';
import { useProgress } from '../../../hooks';
import { useHostEmitters } from '.';
import { useHostListeners } from './useHostListeners';
import { HostDispatchers } from '../routes/Host';

export function useHost(dispatchers: HostDispatchers) {
  const { ballDelay } = useContext(FeautresContext);
  const { gamestate, room, winner, play } = useContext(GameContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);
  const { newBall } = useContext(BallContext);
  const {
    emitKickPlayer,
    emitSendBall,
    emitCreateRoom,
    emitLeaveRoom,
    emitHostReady,
    emitHostStandby,
    emitHostStartedGame,
    emitHostValidating,
    emitNotAWinner,
    emitIsAWinner,
    emitHostGameOver,
  } = useHostEmitters();
  const {
    listenPlayerJoined,
    deafenPlayerJoined,
    listenPlayerLeft,
    deafenPlayerLeft,
    listenPlayerReady,
    deafenPlayerReady,
    listenReceiveCard,
    deafenReceiveCard,
  } = useHostListeners(dispatchers);

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
    dispatchers.dispatchRemovePlayer(player);
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

  const saveRoom = useCallback(() => {
    apiSaveRoom(room, winner);
  }, [room, winner]);

  /**
   * Keep the room in sync with this host's gamestate
   */
  useEffect(() => {
    switch (gamestate) {
      case 'init':
        // TODO probably unreachable
        emitCreateRoom();
        // TODO move play into different useEffect ??
        play('ready');
        break;
      case 'ready':
        emitHostReady();
        break;
      case 'standby':
        emitHostStandby();
        break;
      case 'start':
        emitHostStartedGame();
        break;
      case 'validate':
        emitHostValidating();
        break;
      case 'failure':
        emitNotAWinner();
        break;
      case 'win':
        emitIsAWinner();
        saveRoom();
        break;
      case 'end':
        emitHostGameOver();
        break;
    }
  }, [
    gamestate,
    play,
    emitCreateRoom,
    emitHostReady,
    emitHostStandby,
    emitHostStartedGame,
    emitHostValidating,
    emitNotAWinner,
    emitIsAWinner,
    emitHostGameOver,
    saveRoom,
  ]);

  /**
   * Control listeners based on gamestate
   */
  useEffect(() => {
    switch (gamestate) {
      case 'init':
        break;
      case 'ready':
        listenPlayerJoined();
        listenPlayerLeft();
        listenPlayerReady();
        break;
      case 'standby':
        deafenPlayerJoined();
        deafenPlayerReady();
        break;
      case 'start':
        listenReceiveCard();
        break;
      case 'validate':
        deafenReceiveCard();
        break;
      default:
        break;
    }
    return () => {
      deafenPlayerLeft();
    };
  }, [
    gamestate,
    listenPlayerJoined,
    deafenPlayerJoined,
    listenPlayerLeft,
    deafenPlayerLeft,
    listenPlayerReady,
    deafenPlayerReady,
    listenReceiveCard,
    deafenReceiveCard,
  ]);

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
