import { Dispatch, useCallback, useContext, useEffect } from 'react';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import {
  Ball,
  Gamestate,
  HostEvent,
  Player,
  Room,
  RoomEvent,
  Winner,
} from '@np-bingo/types';
import {
  CHECK_CARD,
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  GAME_OVER,
  INIT,
  PAUSE,
  PLAYER_KICK,
  READY_CHECK,
  SET_BALL,
  STANDBY,
  START,
} from '../../../config/constants';
import { PlayActions } from '../../../reducers/play.reducer';
import { Socket } from 'socket.io-client';
import { AppActions, initialWinner } from '../../../reducers/app.reducer';
import { initialPlayer } from '../../../hooks';
//playDispatch: Dispatch<PlayActions>
export function usePlayListenersRoom(
  socket: Socket,
  dispatch: Dispatch<AppActions>
): [() => void, () => void] {
  /**
   * To Room: Sync Gamestate
   * @param gamestate
   */
  const syncGamestate = (gamestate: Gamestate) => {
    switch (gamestate) {
      // case 'init':
      //   dispatch({ type: INIT });
      //   break;
      case 'ready':
        logger('Click to ready up');
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        logger('Game starting shortly...');
        dispatch({ type: STANDBY });
        break;
      // case 'start':
      //   logger('Game started');
      //   dispatch({ type: START });
      //   break;
      // case 'validate':
      //   dispatch({ type: CHECK_CARD });
      //   break;
      // case 'pause':
      //   logger(`A card has been sent to the host. Checking if it's a winner!`);
      //   dispatch({ type: PAUSE });
      //   break;
      // case 'failure':
      //   logger(`The card was not a winner...`);
      //   dispatch({ type: CHECK_CARD_FAILURE });
      //   break;
      // case 'win':
      case 'end':
        logger('Game over!');
        dispatch({ type: GAME_OVER });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  };

  /**
   * To Room: Ball dispensed
   */
  const ballDispensed = (ball: Ball) => {
    logger(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
    dispatch({ type: SET_BALL, payload: ball });
  };

  /**
   * To Room: Player sent a card
   * @param playerName
   */
  const sendCard = (playerName: Player['name']) => {
    logger(`${playerName} has sent their card to the host`);
    dispatch({ type: PAUSE });
  };

  /**
   * To Room Winner: Win Game
   * @param winner
   */
  const winningCards = (
    winningPlayers: Pick<Player, 'name' | 'socketId'>[]
  ) => {
    let sender = false;
    // let winners = [] as Winner[];
    for (let i = 0; i < winningPlayers.length; i++) {
      if (winningPlayers[i].socketId === socket.id) {
        sender = true;
        break;
      }
      logger(`${winningPlayers[i].name} won the game!`);
      // winners = [
      //   ...winners,
      //   {
      //     ...initialWinner,
      //     player: {
      //       ...initialPlayer,
      //       name: winningPlayers[i].name,
      //       socketId: winningPlayers[i].socketId,
      //     },
      //   },
      // ];
    }
    if (sender) return;
    dispatch({ type: GAME_OVER });
  };

  const losingCards = () => {
    logger(`No winners...`);
    dispatch({ type: CHECK_CARD_FAILURE });
  };

  /**
   * Room Actions Handler
   * @param event
   */
  const roomEventsListener = (
    event: RoomEvent,
    payload:
      | Ball
      | Gamestate
      | Winner
      | Player['name']
      | Pick<Player, 'name' | 'socketId'>[]
  ) => {
    switch (event) {
      case 'sync-gamestate':
        syncGamestate(payload as Gamestate);
        break;
      case 'dispense-ball':
        ballDispensed(payload as Ball);
        break;
      case 'send-card':
        sendCard(payload as Player['name']);
        break;
      case 'winning-cards':
        winningCards(payload as Pick<Player, 'name' | 'socketId'>[]);
        break;
      case 'losing-cards':
        losingCards();
        break;
      default:
        throw new Error('Error in room action');
    }
  };

  /**
   * Subscribe to Room events
   */
  const subscribeToRoom = () => {
    logger('Listening for room actions...');
    socket.on('room:event', roomEventsListener);
  };

  /**
   * Unsubscribe to Room events
   */
  const unsubscribeFromRoom = () => {
    logger('No longer listening for room actions.');
    socket.off('room:event', roomEventsListener);
  };

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

  return [subscribeToRoom, unsubscribeFromRoom];
}
