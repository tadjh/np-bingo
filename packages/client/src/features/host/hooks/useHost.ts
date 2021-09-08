import { useCallback, useContext, useEffect, useState } from 'react';
import { Ball, Player } from '@np-bingo/types';
import {
  BallContext,
  FeaturesContext,
  GameContext,
  RoomContext,
  UserContext,
} from '../../../context';
import { apiSaveRoom } from '../api';
import { useProgress } from '../../../hooks';
import { useHostEmitters } from '.';
import { useHostListeners } from './useHostListeners';
import {
  GAME_OVER,
  NEW_BALL,
  PLAYER_KICK,
  READY_CHECK,
} from '../../../config/constants';
import { Socket } from 'socket.io-client';
import { initialBall } from '../../../reducers/app.reducer';

export function useHost(socket: Socket) {
  const { ballDelay } = useContext(FeaturesContext);
  const { room, winners, players } = useContext(RoomContext);
  const { gamestate, dispatch } = useContext(GameContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);
  const { ball, newBall } = useContext(BallContext);
  const [isNewGame, setIsNewGame] = useState(true);
  const [prevBall, setPrevBall] = useState<Ball>(initialBall);
  const {
    emitKickPlayer,
    emitSendBall,
    // emitCreateRoom,
    // emitLeaveRoom,
    // emitHostReady,
    // emitHostStandby,
    // emitHostStart,
    // emitHostValidating,
    // emitNotAWinner,
    // emitIsAWinner,
    // emitHostGameOver,
  } = useHostEmitters();
  const { subscribeToPlayerEvents, unsubscribeFromPlayerEvents } =
    useHostListeners(socket, dispatch);
  /**
   * Kick player from room
   * @param player
   */
  const handleRemovePlayer = (player: Player) => {
    dispatch({ type: PLAYER_KICK, payload: player });
    emitKickPlayer(player);
  };

  /**
   * Trigger gamestate start, queue new ball and show ball progress animation
   * @param gamestate
   * @param room
   */
  const handleBall = () => {
    const currentBall = newBall();
    if (currentBall.ball.number === 0) return dispatch({ type: GAME_OVER });

    emitSendBall(currentBall.ball);
    dispatch({
      type: NEW_BALL,
      payload: currentBall,
    });
    enableProgress();
  };

  /**
   * Save Room
   */
  const saveRoom = useCallback(() => {
    apiSaveRoom(room, winners);
  }, [room, winners]);

  /**
   * Filters out kicked and leaver players and returns player count.
   * @returns number
   */
  const activePlayerCount = (): number => {
    const activePlayers = players.filter((item) => !item.kicked && !item.leave);
    return activePlayers.length;
  };

  /**
   * Set new game
   */
  useEffect(() => {
    if (!isNewGame) return;
    setIsNewGame(false);
    subscribeToPlayerEvents();
  }, [isNewGame, dispatch, subscribeToPlayerEvents]);

  // TODO deafenPlayerAction
  /**
   * Keep the room in sync with this host's gamestate
   */
  // useEffect(() => {
  //   switch (gamestate) {
  //     case 'validate':
  //       emitHostValidating();
  //       break;
  //     case 'failure':
  //       emitNotAWinner();
  //       break;
  //     case 'win':
  //       emitIsAWinner();
  //       saveRoom();
  //       break;
  //     case 'end':
  //       emitHostGameOver();
  //       break;
  //   }
  // }, [
  //   gamestate,
  //   play,
  //   emitCreateRoom,
  //   emitHostReady,
  //   emitHostStandby,
  //   emitHostStartedGame,
  //   emitHostValidating,
  //   emitNotAWinner,
  //   emitIsAWinner,
  //   emitHostGameOver,
  //   saveRoom,
  // ]);

  /**
   * Control listeners based on gamestate
   */
  // useEffect(() => {
  //   switch (gamestate) {
  //     case 'init':
  //       break;
  //     case 'ready':
  //       listenPlayerJoined();
  //       listenPlayerLeft();
  //       listenPlayerReady();
  //       break;
  //     case 'standby':
  //       deafenPlayerJoined();
  //       deafenPlayerReady();
  //       break;
  //     case 'start':
  //       listenReceiveCard();
  //       break;
  //     case 'validate':
  //       deafenReceiveCard();
  //       break;
  //     default:
  //       break;
  //   }
  //   return () => {
  //     deafenPlayerLeft();
  //   };
  // }, [
  //   gamestate,
  //   listenPlayerJoined,
  //   deafenPlayerJoined,
  //   listenPlayerLeft,
  //   deafenPlayerLeft,
  //   listenPlayerReady,
  //   deafenPlayerReady,
  //   listenReceiveCard,
  //   deafenReceiveCard,
  // ]);

  return {
    progress,
    inProgress,
    activePlayerCount,
    handleRemovePlayer,
    handleBall,
  };
}
