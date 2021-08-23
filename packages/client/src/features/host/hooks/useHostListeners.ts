import { useCallback, useContext } from 'react';
import { Card, Player, Room, PlayerAction } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { HostDispatchers } from '..';

export function useHostListeners({
  dispatchPlayerJoined,
  dispatchPlayerLeft,
  dispatchPlayerReady,
}: HostDispatchers) {
  const { socket } = useContext(UserContext);
  const { play } = useContext(GameContext);

  /**
   * From Player: Player Join Room
   * @param player
   */
  const playerJoinRoom = (player: Player) => {
    logger(`${player.name} joined`);
    dispatchPlayerJoined(player);
  };

  /**
   *From Player: Player Leave Room
   * @param player
   */
  const playerLeaveRoom = (player: Player) => {
    logger(`${player.name} left`);
    dispatchPlayerLeft(player);
  };

  /**
   * Player Actions Listener Handler
   * @param action
   * @param player
   */
  const playerAction = (action: PlayerAction, player: Player) => {
    switch (action) {
      case 'join-room':
        playerJoinRoom(player);
        break;
      case 'leave-room':
        playerLeaveRoom(player);
        break;
      default:
        throw new Error('Error in Host Player Action');
    }
  };

  /**
   * Listener for Player Actions
   */
  const listenPlayerAction = () => {
    logger('Listening for player actions...');
    socket.on('host:player-action', playerAction);
  };

  /**
   * Deafen Player Actions Listener
   */
  const deafenPlayerAction = () => {
    logger('No longer listening for player actions.');
    socket.off('host:player-action', playerAction);
  };

  /**
   * To Host: Player is ready
   */
  // const listenPlayerReady = useCallback(() => {
  //   socket.on('player-ready', (player: Player) => {
  //     logger(`${player.name} ready`);
  //     dispatchPlayerReady(player);
  //   });
  // }, [socket, dispatchPlayerReady]);

  // const deafenPlayerReady = useCallback(() => {
  //   socket.off('player-ready');
  // }, [socket]);

  /**
   * To Host: Receive Card
   */
  // const listenReceiveCard = useCallback(() => {
  //   socket.on('receive-card', (room: Room, player: Player, card: Card) => {
  //     logger(`${player.name} sent a card to you.`);
  //     play('validate');
  //     // dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
  //   });
  // }, [socket, play]);

  // const deafenReceiveCard = useCallback(() => {
  //   socket.off('receive-card');
  // }, [socket]);

  return {
    listenPlayerAction,
    deafenPlayerAction,
  };
}
