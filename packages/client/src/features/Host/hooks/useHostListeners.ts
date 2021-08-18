import { useCallback, useContext, useEffect } from 'react';
import { Card, Player, Room } from '@np-bingo/types';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import { HostDispatchers } from '..';

export function useHostListeners({
  dispatchPlayerJoined,
  dispatchPlayerLeft,
  dispatchPlayerReady,
}: HostDispatchers) {
  const {
    user: { socket },
  } = useContext(UserContext);
  const { gamestate, play } = useContext(GameContext);

  /**
   * To Host: Player joined
   */
  const listenPlayerJoined = useCallback(() => {
    socket.on('player-joined', (player: Player) => {
      logger(`${player.name} joined`);
      dispatchPlayerJoined(player);
    });
  }, [socket, dispatchPlayerJoined]);

  const deafenPlayerJoined = useCallback(() => {
    socket.off('player-joined');
  }, [socket]);

  /**
   * To Host: Player left
   */

  const listenPlayerLeft = useCallback(() => {
    socket.on('player-left', (player: Player) => {
      logger(`${player.name} left`);
      dispatchPlayerLeft(player);
    });
  }, [socket, dispatchPlayerLeft]);

  const deafenPlayerLeft = useCallback(() => {
    socket.off('player-left');
  }, [socket]);

  /**
   * To Host: Player is ready
   */
  const listenPlayerReady = useCallback(() => {
    socket.on('player-ready', (player: Player) => {
      logger(`${player.name} ready`);
      dispatchPlayerReady(player);
    });
  }, [socket, dispatchPlayerReady]);

  const deafenPlayerReady = useCallback(() => {
    socket.off('player-ready');
  }, [socket]);

  /**
   * To Host: Receive Card
   */
  const listenReceiveCard = useCallback(() => {
    socket.on('receive-card', (room: Room, player: Player, card: Card) => {
      logger(`${player.name} sent a card to you.`);
      play('validate');
      // dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
    });
  }, [socket, play]);

  const deafenReceiveCard = useCallback(() => {
    socket.off('receive-card');
  }, [socket]);

  return {
    listenPlayerJoined,
    deafenPlayerJoined,
    listenPlayerLeft,
    deafenPlayerLeft,
    listenPlayerReady,
    deafenPlayerReady,
    listenReceiveCard,
    deafenReceiveCard,
  };
}
