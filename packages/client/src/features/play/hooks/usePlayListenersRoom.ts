import { Dispatch } from 'react';
import { logger } from '../../../utils';
import { Ball, Gamestate, Player, RoomEvent, Winner } from '@np-bingo/types';
import {
  CHECK_CARD_FAILURE,
  GAME_OVER,
  LOSE_GAME,
  PAUSE,
  READY_CHECK,
  SET_BALL,
  STANDBY,
} from '../../../config/constants';
import { Socket } from 'socket.io-client';
import { AppActions } from '../../../reducers/app.reducer';
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
      case 'ready':
        logger('Click to ready up');
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        logger('Game starting shortly...');
        dispatch({ type: STANDBY });
        break;
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
  const winningCards = (winningPlayers: Winner[]) => {
    let sender = false;
    for (let i = 0; i < winningPlayers.length; i++) {
      if (winningPlayers[i].player.socketId === socket.id) {
        sender = true;
        break;
      }
      logger(`${winningPlayers[i].player.name} won the game!`);
    }
    if (sender) return;
    dispatch({ type: LOSE_GAME, payload: winningPlayers });
  };

  /**
   * No winner
   */
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
    payload: Ball | Gamestate | Winner | Player['name'] | Winner[]
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
        winningCards(payload as Winner[]);
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

  return [subscribeToRoom, unsubscribeFromRoom];
}
