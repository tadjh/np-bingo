import { useCallback } from 'react';
import { BINGO, newCard, winningCells } from '../../../utils/bingo';
import {
  initialState,
  PlayerState,
  reducer,
} from '../../../Reducers/play.reducer';
import { useReducer } from 'react';
import { Action, Winner } from '@np-bingo/types';
import {
  INIT_CROSSMARKS,
  INIT_GAME,
  NEW_CARD,
  UPDATE_CROSSMARKS,
  WINNER_CROSSMARKS,
} from '../../../config/constants';

export function usePlayState() {
  const [{ card, serial, crossmarks }, playDispatch] = useReducer<
    (state: PlayerState, action: Action) => PlayerState
  >(reducer, initialState);

  const initPlay = () => {
    playDispatch({ type: INIT_GAME });
  };

  /**
   * Creates a new card and stores it in state
   */
  const setCard = useCallback(() => {
    const [card, serial] = newCard(BINGO);
    playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
    clearCrossmarks();
  }, []);

  /**
   * Resets all crossmarks
   */
  const clearCrossmarks = () => {
    playDispatch({ type: INIT_CROSSMARKS, payload: {} });
  };

  const updateCrossmarks = (crossmark: { [x: string]: boolean }) => {
    playDispatch({ type: UPDATE_CROSSMARKS, payload: crossmark });
  };

  // TODO IS THIS NECESSARY???
  /**
   * Toggle current target's crossmark visibility
   * @param event Click event
   */
  const toggleCrossmark = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    let value = crossmarks[target.id];
    let crossmark = { [target.id]: !value };
    updateCrossmarks(crossmark);
  };

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = ({ results }: Winner) => {
    const winningCrossmarks = winningCells(results);
    playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  };

  return {
    card,
    serial,
    crossmarks,
    initPlay,
    setCard,
    toggleCrossmark,
    setWinningCrossmarks,
  };
}
