import { Dispatch } from 'react';
import { logger } from '../../../utils';
import { HostEvent, Room, Winner } from '@np-bingo/types';
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
  const playerKicked = (room: Room) => {
    logger(`You have been kicked from the room`);
    playDispatch({ type: PLAYER_KICK, payload: 'banned' });
    socket.emit('player:event', 'kick-player', room);
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
  const hostEventListener = (event: HostEvent, payload?: Room | Winner) => {
    switch (event) {
      case 'kick-player':
        playerKicked(payload as Room);
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

  return [subscribeToHost, unsubscribeFromHost];
}
