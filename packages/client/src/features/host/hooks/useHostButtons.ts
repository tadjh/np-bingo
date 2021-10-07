import { useContext } from 'react';
import {
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  GAME_OVER,
  READY_CHECK,
  STANDBY,
} from '../../../config/constants';
import { GameContext, RoomContext } from '../../../context';
import { apiDeleteRoom, apiDeactivateRoom } from '../api';
import { useHostEmitters } from './useHostEmitters';
import { ApiError, Player, PlayerCard, Winner } from '@np-bingo/types';
import { useFetch } from '../../../hooks';
import { toast } from 'react-toastify';

export function useHostButtons() {
  const { gameId, room, players } = useContext(RoomContext);
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
  const { setBody } = useFetch<Winner[], { message: string }, ApiError>(
    'PUT',
    `/api/game/${gameId}`
  );

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
   * Displays winners in a toast notification
   * @param winners
   */
  const notifyWinners = (winners: Winner[]) => {
    for (let i = 0; i < winners.length; i++) {
      let name = winners[i].player.name;
      toast.success(`${name} has BINGO!`);
    }
  };

  /**
   * Card(s) a winner
   * @param winner
   */
  const validateWinners = (winners: Winner[]) => {
    dispatch({ type: CHECK_CARD_SUCCESS, payload: winners });
    emitWinners(winners);
    setBody(winners);
    notifyWinners(winners);
  };

  /**
   * Displays losers in a toast notification
   * @param winners
   */
  const notifyLosers = (losers: Player[]) => {
    for (let i = 0; i < losers.length; i++) {
      let name = losers[i].name;
      toast.warn(`${name} is not a winner`);
    }
  };

  /**
   * Card(s) not a winner
   * @param winner
   */
  const validateLosers = (losers: Player[]) => {
    dispatch({ type: CHECK_CARD_FAILURE });
    emitLosers(losers);
    notifyLosers(losers);
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
  const disableCheckCard = gamestate === 'validate' ? false : true;

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

    players.length < 1 ? apiDeleteRoom(gameId, room) : apiDeactivateRoom(room);
  };

  const disableDraws = gamestate === 'end' && true;

  return {
    disableDraws,
    disableCheckCard,
    gamestateToggle,
    toggleText,
    handleValidate,
    setDisabled,
    handleLeaveRoom,
  };
}
