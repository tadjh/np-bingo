import { useContext } from 'react';
import { GameContext, RoomContext } from '../../../context';
import { apiDeleteRoom } from '../api';
import { useHostEmitters } from './useHostEmitters';

export function useHostButtons() {
  const { room } = useContext(RoomContext);
  const { gamestate, play } = useContext(GameContext);
  const { emitLeaveRoom, emitHostStandby, emitHostReady, emitHostGameOver } =
    useHostEmitters();
  /**
   * Three way toggle for host main button
   * @param gamestate Gamestate
   */
  const gamestateToggle = () => {
    switch (gamestate) {
      case 'ready':
        play('standby');
        emitHostStandby();
        break;
      case 'end':
        play('ready');
        emitHostReady();
        break;
      default:
        play('end');
        emitHostGameOver();
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
