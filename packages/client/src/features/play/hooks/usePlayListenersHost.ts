import { Dispatch, useCallback, useContext, useEffect } from 'react';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { Ball, HostEvent, Room, Winner } from '@np-bingo/types';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  PLAYER_KICK,
} from '../../../config/constants';
import { PlayActions } from '../../../reducers/play.reducer';
import { Socket } from 'socket.io-client';
import { AppActions } from '../../../reducers/app.reducer';

export function usePlayListenersHost(
  socket: Socket,
  playDispatch: Dispatch<PlayActions>,
  dispatch: Dispatch<AppActions>
): [() => void, () => void] {
  /**
   * To Player: Removed from game room
   */
  const playerKicked = () => {
    logger(`You have been kicked from the room`);
    playDispatch({ type: PLAYER_KICK, payload: 'banned' });
  };

  /**
   * To Player: Game room abandoned
   */
  const roomAbandoned = () => {
    logger(`The Host has abandoned the room`);
    playDispatch({ type: PLAYER_KICK, payload: 'abandoned' });
  };

  /**
   * To Player: You have BINGO!
   * @param winner
   */
  const winningCards = (winner: Winner) => {
    logger(`Your card is a BINGO!`);
    dispatch({ type: CHECK_CARD_SUCCESS, payload: [winner] });
  };

  /**
   * Top Player: No BINGO!
   */
  const losingCards = () => {
    logger(`Your card is not a winner...`);
    dispatch({ type: CHECK_CARD_FAILURE });
  };

  /**
   * Host Actions Handler
   * @param event
   */
  const hostEventListener = (event: HostEvent, payload?: Winner) => {
    switch (event) {
      case 'kick-player':
        playerKicked();
        break;
      case 'leave-room':
        roomAbandoned();
        break;
      case 'winning-cards':
        winningCards(payload as Winner);
        break;
      case 'losing-cards':
        losingCards();
        break;
      default:
        throw new Error('Error in host action');
    }
  };

  /**
   * Subscribe to host events
   */
  const subscribeToHost = () => {
    logger('Listening for host actions...');
    socket.on('host:event', hostEventListener);
  };

  /**
   * Unsubscribe to host events
   */
  const unsubscribeFromHost = () => {
    logger('No longer listening for host actions.');
    socket.off('host:event', hostEventListener);
  };

  // const ballDispensed = (ball: Ball) => {
  //   logger(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
  // };

  // const listenRoomAction = () => {
  //   socket.on('room:action', roomAction);
  // }

  // const listenRoomAction = () => {
  //   socket.on('room:action', roomAction);
  // }

  /**
   * To Room: Ready check
   */
  // const listenGameReady = useCallback(() => {
  //   socket.on('game-ready', () => {
  //     logger('Click to ready up');
  //     play('ready');
  //   });
  // }, [socket, play]);

  // const deafenGameReady = useCallback(() => {
  //   socket.off('game-ready');
  // }, [socket]);

  /**
   * To Room: Standby for first ball
   */
  // const listGameStandby = useCallback(() => {
  //   socket.on('game-standby', () => {
  //     logger('Game starting shortly...');
  //     play('standby');
  //   });
  // }, [socket, play]);

  // const deafenGameStandby = useCallback(() => {
  //   socket.off('game-standby');
  // }, [socket]);

  /**
   * To Room: Game start
   */
  // const listenGameStart = useCallback(() => {
  //   socket.on('game-start', () => {
  //     logger('Game started');
  //     play('start');
  //   });
  // }, [socket, play]);

  // const deafenGameStart = useCallback(() => {
  //   socket.off('game-start');
  // }, [socket]);

  /**
   * To Room: Ball Dispensed
   * @param ball Ball
   */
  // const listenDispeneBall = useCallback(() => {
  //   socket.on('game-ball', (ball: Ball) => {
  //     logger(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
  //     dispatchDispenseBall(ball);
  //   });
  // }, [socket, dispatchDispenseBall]);

  // const deafenDispenseBall = useCallback(() => {
  //   socket.off('game-ball');
  // }, [socket]);

  /**
   * To Player: Loser
   */
  // const listenGameLoser = useCallback(() => {
  //   socket.on('loser', () => {
  //     logger(`This card is not a winner...`);
  //     dispatchCheckCardFailure();
  //   });
  // }, [socket, dispatchCheckCardFailure]);

  // const deafenGameLoser = useCallback(() => {
  //   socket.off('loser');
  // }, [socket]);

  /**
   * To Room: Broadcast Winner
   */
  // const listGameRoomWinner = useCallback(() => {
  //   socket.on('game-win', (username) => {
  //     logger(`${username} won the game!`);
  //     // TODO Show winner name on win ?
  //     play('win');
  //   });
  // }, [socket, play]);

  // const deafenGameRoomWinner = useCallback(() => {
  //   socket.off('game-win');
  // }, [socket]);

  /**
   * To Room: Continue
   */
  // const listenGameContinue = useCallback(() => {
  //   socket.on('game-continue', () => {
  //     logger('Not a winner...');

  //     // TODO play('start');
  //   });
  // }, [socket]);

  // const deafenGameContinue = useCallback(() => {
  //   socket.off('game-continue');
  // }, [socket]);

  /**
   * To Room: Game End
   */
  // const listenGameEnd = useCallback(() => {
  //   socket.on('game-end', () => {
  //     logger('Game over!');
  //     play('end');
  //   });
  // }, [socket, play]);

  // const deafenGameEnd = useCallback(() => {
  //   socket.off('game-end');
  // }, [socket]);

  // useEffect(() => {
  //   listenHostAbandoned();
  //   listenPlayerKicked();
  //   return () => {
  //     deafenHostAbandoned();
  //     deafenPlayerKicked();
  //   };
  // }, [
  //   listenHostAbandoned,
  //   deafenHostAbandoned,
  //   listenPlayerKicked,
  //   deafenPlayerKicked,
  // ]);

  // TODO Turn state changes into ONE socket subscription that sends state change strings
  /**
   * Socket.io Side-effects
   */
  // useEffect(() => {
  //   switch (gamestate) {
  //     case 'init':
  //       listenGameReady();
  //       break;
  //     case 'ready':
  //       deafenGameReady();
  //       listGameStandby();
  //       break;
  //     case 'standby':
  //       deafenGameStandby();
  //       listenGameStart();
  //       break;
  //     case 'start':
  //       deafenGameStart();
  //       listenDispeneBall();
  //       deafenGameContinue();
  //       break;
  //     case 'validate':
  //       deafenDispenseBall();
  //       listenGameValidation();
  //       listenGameWinner();
  //       listenGameLoser();
  //       break;
  //     case 'pause':
  //       deafenGameValidation();
  //       listGameRoomWinner();
  //       listenGameContinue();
  //       listenGameEnd();
  //       break;
  //     case 'end':
  //       deafenGameWinner();
  //       deafenGameRoomWinner();
  //       deafenGameLoser();
  //       deafenGameValidation();
  //       deafenGameEnd();
  //       break;
  //   }
  // });
  return [subscribeToHost, unsubscribeFromHost];
}
