import { useContext } from 'react';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  GAME_OVER,
  READY_CHECK,
  STANDBY,
} from '../../../config/constants';
import { GameContext, RoomContext } from '../../../context';
import { apiDeleteRoom, apiSaveRoom } from '../api';
import { useHostEmitters } from './useHostEmitters';
import { Player, PlayerCard, Winner } from '@np-bingo/types';

export function useHostButtons() {
  const { room, winners } = useContext(RoomContext);
  const { gamestate, playerCards, split, checkCard, dispatch } = useContext(
    GameContext
  );
  const {
    emitLeaveRoom,
    emitHostStandby,
    emitHostReady,
    emitWinners,
    emitLosers,
    emitHostEnd,
  } = useHostEmitters();
  /**
   * Three way toggle for host main button
   * @param gamestate Gamestate
   */
  const gamestateToggle = () => {
    switch (gamestate) {
      case 'ready':
        dispatch({ type: STANDBY });
        emitHostStandby();
        break;
      case 'end':
        dispatch({ type: READY_CHECK });
        emitHostReady();
        break;
      default:
        dispatch({ type: GAME_OVER });
        emitHostEnd();
        // TODO When to save?
        // apiSaveRoom(room, winner);
        break;
    }
  };

  /**
   * Display text for main action button
   * @param gamestate
   * @returns string
   */
  const toggleText = (): string => {
    switch (gamestate) {
      case 'ready':
        return 'Start';
      case 'end':
        return 'Replay';
      default:
        return 'End';
    }
  };

  /**
   * Card(s) a winner
   * @param winner
   */
  const validateWinners = (winners: Winner[]) => {
    dispatch({ type: CHECK_CARD_SUCCESS, payload: winners });
    emitWinners(winners);
  };

  /**
   * Card(s) not a winner
   * @param winner
   */
  const validateLosers = (losers: Player[]) => {
    dispatch({ type: CHECK_CARD_FAILURE });
    emitLosers(losers);
  };

  const multipleWinners = (playerCards: PlayerCard[]) => {
    const winners: Winner[] = [];
    const losers: Player[] = [];
    for (let i = 0; i < playerCards.length; i++) {
      const { owner } = playerCards[i];
      const winner = checkCard(playerCards[i]);
      if (winner) return [...winners, winner];
      return [...losers, owner];
    }

    // No winners
    if (winners.length === 0) return validateLosers(losers);

    validateWinners(winners);
    if (losers.length > 0) {
      emitLosers(losers);
    }
  };

  /**
   * Validates card
   * @returns void
   */
  const handleValidate = () => {
    if (split) return multipleWinners(playerCards);
    // single
    const { owner } = playerCards[0];
    const winner = checkCard(playerCards[0]);
    winner ? validateWinners([winner]) : validateLosers([owner]);
  };

  /**
   * Disabled check card unless gamestate is currenly validate
   * @returns boolean
   */
  const disableCheckCard = (): boolean => {
    if (gamestate === 'validate') return false;
    return true;
  };

  /**
   * Disable during certian gamestates
   * @returns boolean
   */
  const setDisabled = (): boolean => {
    switch (gamestate) {
      case 'start':
      case 'standby':
      case 'failure':
        return false;
      default:
        return true;
    }
  };

  /**
   * Leave room by room code
   * @param room Room code
   */
  const handleLeaveRoom = () => {
    emitLeaveRoom();
    // TODO Deletes room if players[] is empty. Maybe add logic here to prevent unecesssary api trips
    apiDeleteRoom(room);
    // TODO Best way to handle async??
    // setIsDeleteRoom(true);
  };

  const disableDraws = gamestate === 'end' && true;

  return {
    disableDraws,
    gamestateToggle,
    toggleText,
    handleValidate,
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  };
}
