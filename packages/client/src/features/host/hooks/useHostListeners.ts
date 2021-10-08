import { Dispatch, useContext } from 'react';
import { Player, PlayerCard, PlayerEvent } from '@np-bingo/types';
import { logger } from '../../../utils';
import {
  GET_CARD,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  PLAYER_READY,
} from '../../../config/constants';
import { Socket } from 'socket.io-client';
import { AppActions } from '../../../reducers/app.reducer';
import { GameContext } from '../../../context';
import { toast } from 'react-toastify';
import { useHostSounds } from '.';

export function useHostListeners(
  socket: Socket,
  dispatch: Dispatch<AppActions>
) {
  const { split, playerCards } = useContext(GameContext);
  const { joinSfx, leaveSfx, readySfx, sendSfx } = useHostSounds();

  /**
   * From Player: Player Join Room
   * @param player
   */
  const playerJoinRoom = (player: Player) => {
    logger(`${player.name} joined`);
    dispatch({ type: PLAYER_JOIN, payload: player });
    joinSfx();
  };

  /**
   *From Player: Player Leave Room
   * @param player
   */
  const playerLeaveRoom = (player: Player) => {
    logger(`${player.name} left`);
    dispatch({ type: PLAYER_LEAVE, payload: player });
    leaveSfx();
  };

  /**
   * From Player: Player is ready
   * @param player
   */
  const playerReadyUp = (player: Player) => {
    logger(`${player.name} ready`);
    dispatch({ type: PLAYER_READY, payload: player });
    readySfx();
  };

  /**
   * From Player: Player sent a card
   * @param playerCard
   */
  const playerSendCard = (playerCard: PlayerCard) => {
    // If winnings are not a split pot and
    // playerCards already has a card don't store additional cards
    if (!split && playerCards.length > 0) return;
    logger(`${playerCard.owner.name} sent a card to you.`);
    dispatch({ type: GET_CARD, payload: playerCard });
    toast.info(`${playerCard.owner.name} sent a card.`);
    sendSfx();
  };

  /**
   * Player Actions Listener Handler
   * @param event
   * @param player
   */
  const playerEventsListener = (
    event: PlayerEvent,
    payload: Player | PlayerCard
  ) => {
    switch (event) {
      case 'join-room':
        playerJoinRoom(payload as Player);
        break;
      case 'leave-room':
        playerLeaveRoom(payload as Player);
        break;
      case 'ready-up':
        playerReadyUp(payload as Player);
        break;
      case 'send-card':
        playerSendCard(payload as PlayerCard);
        break;
      default:
        throw new Error('Error in Host Player Action');
    }
  };

  /**
   * Listener for Player Actions
   */
  const subscribeToPlayerEvents = () => {
    logger('Listening for player actions...');
    socket.on('host:player-event', playerEventsListener);
  };

  /**
   * Deafen Player Actions Listener
   */
  const unsubscribeFromPlayerEvents = () => {
    logger('No longer listening for player actions.');
    socket.off('host:player-event', playerEventsListener);
  };

  return { subscribeToPlayerEvents, unsubscribeFromPlayerEvents };
}
