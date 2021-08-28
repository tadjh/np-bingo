import { Dispatch, useContext } from 'react';
import { Card, Player, PlayerEvent } from '@np-bingo/types';
import { logger } from '../../../utils';
import {
  GET_CARD,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  PLAYER_READY,
} from '../../../config/constants';
import { Socket } from 'socket.io-client';
import { AppActions } from '../../../reducers/app.reducer';
import { GameContext, RoomContext } from '../../../context';

export function useHostListeners(
  socket: Socket,
  dispatch: Dispatch<AppActions>
) {
  const { playerCard } = useContext(GameContext);
  const { room } = useContext(RoomContext);
  /**
   * From Player: Player Join Room
   * @param player
   */
  const playerJoinRoom = (player: Player) => {
    logger(`${player.name} joined`);
    dispatch({ type: PLAYER_JOIN, payload: player });
  };

  /**
   *From Player: Player Leave Room
   * @param player
   */
  const playerLeaveRoom = (player: Player) => {
    logger(`${player.name} left`);
    dispatch({ type: PLAYER_LEAVE, payload: player });
  };

  /**
   * From Player: Player is ready
   * @param player
   */
  const playerReadyUp = (player: Player) => {
    logger(`${player.name} ready`);
    dispatch({ type: PLAYER_READY, payload: player });
  };

  /**
   * From Player: Player sent a card
   * @param player
   * @param card
   */
  const playerSendCard = (player: Player, card: Card) => {
    if (playerCard == null) return;
    logger(`${player.name} sent a card to you.`);
    dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
  };

  /**
   * Player Actions Listener Handler
   * @param event
   * @param player
   */
  const playerEventsListener = (
    event: PlayerEvent,
    player: Player,
    card?: Card
  ) => {
    switch (event) {
      case 'join-room':
        playerJoinRoom(player);
        break;
      case 'leave-room':
        playerLeaveRoom(player);
        break;
      case 'ready-up':
        playerReadyUp(player);
        break;
      case 'send-card':
        if (!card) return;
        playerSendCard(player, card);
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
