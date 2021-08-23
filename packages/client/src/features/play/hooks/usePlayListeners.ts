import { useCallback, useContext, useEffect } from 'react';
import { PlayDispatchers } from '..';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { Ball, HostAction, Room, Winner } from '@np-bingo/types';

export interface PlayListenerDispatchers extends PlayDispatchers {
  dispatchRoomAbandoned: () => void;
  dispatchPlayerKicked: () => void;
}

export function usePlayListeners({
  dispatchRoomAbandoned,
  dispatchPlayerKicked,
  dispatchDispenseBall,
  dispatchPlayerReady,
  dispatchCheckCardSuccess,
  dispatchCheckCardFailure,
  dispatchSendCard,
}: PlayListenerDispatchers) {
  const { socket } = useContext(UserContext);
  const { gamestate, play } = useContext(GameContext);
  /**
   * To Player: Host left
   */
  // TODO Dialog when host leaves
  // const listenHostAbandoned = useCallback(() => {
  //   socket.on('host-left', () => {
  //     logger(`Host left, and you have been removed from the room`);
  //     // TODO Fix
  //     dispatchRoomAbandoned && dispatchRoomAbandoned();
  //   });
  // }, [socket, dispatchRoomAbandoned]);

  // const deafenHostAbandoned = useCallback(() => {
  //   socket.off('host-left');
  // }, [socket]);

  /**
   * To Player: Removed from game
   */
  const playerKicked = () => {
    logger(`You have been removed from the room`);
    dispatchPlayerKicked();
  };

  /**
   * Host Action Handler
   * @param action
   */
  const hostAction = (action: HostAction) => {
    switch (action) {
      case 'player-kicked':
        playerKicked();
        break;
      default:
        throw new Error('Error in host action');
    }
  };

  /**
   * Listen for Host Action
   */
  const listenHostAction = () => {
    socket.on('host:action', hostAction);
  };

  /**
   * Deafen Host Action
   */
  const deafenHostAction = () => {
    socket.off('host:action', hostAction);
  };

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
   * To Room: Notify a card is being checked
   */
  // const listenGameValidation = useCallback(() => {
  //   socket.on('game-validation', () => {
  //     logger(`A card has been sent to the host. Checking if it's a winner!`);
  //     // Card sender should be in validate state
  //     // TODO FIX
  //     play('pause');
  //   });
  // }, [socket, play]);

  // const deafenGameValidation = useCallback(() => {
  //   socket.off('game-validation');
  // }, [socket]);

  /**
   * To Player: Winner
   * @param winner Winner
   */
  // const listenGameWinner = useCallback(() => {
  //   socket.on('winner', (room: Room, winner: Winner) => {
  //     logger(`You won the game!`);
  //     dispatchCheckCardSuccess(winner);
  //   });
  // }, [socket, dispatchCheckCardSuccess]);

  // const deafenGameWinner = useCallback(() => {
  //   socket.off('winner');
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
  return { listenHostAction, deafenHostAction };
}
