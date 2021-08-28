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
import { Player, Winner } from '@np-bingo/types';

export function useHostButtons() {
  const { room, winner } = useContext(RoomContext);
  const { gamestate, playerCard, checkCard, dispatch } =
    useContext(GameContext);
  const {
    emitLeaveRoom,
    emitHostStandby,
    emitHostReady,
    emitWinner,
    emitNotWinner,
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
   * Card is a winner
   * @param winner
   */
  const validateWinner = (winner: Winner, owner: Player) => {
    dispatch({ type: CHECK_CARD_SUCCESS, payload: winner });
    emitWinner(owner);
  };

  /**
   * Card is not a winner
   * @param winner
   */
  const validateNotWinner = (owner: Player) => {
    dispatch({ type: CHECK_CARD_FAILURE });
    emitNotWinner(owner);
  };

  /**
   * Validates card
   * @returns void
   */
  const handleValidate = () => {
    if (playerCard === null) return;
    const { owner } = playerCard;
    const winner = checkCard();
    winner ? validateWinner(winner, owner) : validateNotWinner(owner);
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

  return {
    gamestateToggle,
    toggleText,
    handleValidate,
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  };
}
