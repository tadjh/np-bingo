import { useContext } from 'react';
import { GAME_OVER, READY_CHECK, STANDBY } from '../../../config/constants';
import { GameContext, RoomContext } from '../../../context';
import { apiDeleteRoom, apiSaveRoom } from '../api';
import { useHostEmitters } from './useHostEmitters';

export function useHostButtons() {
  const { room, winner } = useContext(RoomContext);
  const { gamestate, dispatch } = useContext(GameContext);
  const {
    emitLeaveRoom,
    emitHostStandby,
    emitHostReady,
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
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
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
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  };
}
