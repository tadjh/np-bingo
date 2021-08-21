import { useCallback } from 'react';
import { BINGO, newCard } from '../../../utils/bingo';
import {
  initialState,
  PlayerState,
  reducer,
} from '../../../reducers/play.reducer';
import { useReducer } from 'react';
import { Action, Results, Winner } from '@np-bingo/types';
import {
  INIT_CROSSMARKS,
  INIT_GAME,
  NEW_CARD,
  PLAYER_KICKED,
  UPDATE_CROSSMARKS,
  WINNER_CROSSMARKS,
} from '../../../config/constants';
import { winningMethods } from '../../../utils/bingo.validate';
import { NODE_ENV } from '../../../config';
import logger from 'use-reducer-logger';

export function usePlayState() {
  const [{ card, serial, crossmarks, kicked }, playDispatch] = useReducer<
    (state: PlayerState, action: Action) => PlayerState
  >(NODE_ENV === 'development' ? logger(reducer) : reducer, initialState);

  const initPlay = () => {
    playDispatch({ type: INIT_GAME });
  };

  /**
   * Creates a new card and stores it in state
   */
  const setCard = useCallback(() => {
    const [card, serial] = newCard(BINGO);
    playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
    // clearCrossmarks();
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
    return;
    // let target = event.target as HTMLDivElement;
    // let value = crossmarks[target.id];
    // let crossmark = { [target.id]: !value };
    // updateCrossmarks(crossmark);
  };

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = useCallback((results: Results) => {
    const winningCrossmarks = winningCells(results);
    playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  }, []);

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   * @retuns Object of winning crossmarks
   */
  function winningCells(results: Results): { [key: string]: boolean } {
    const methods = winningMethods(results);
    let winningCrossmarks = {};
    for (let i = 0; i < methods.length; i++) {
      let marks = (results[methods[i]] as number[]).map(function (item) {
        let id = `cell-${item + 1}`;
        return { [id]: true };
      });
      winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
    }
    return winningCrossmarks;
  }

  /**
   * Dispatch room abandoned
   */
  const dispatchRoomAbandoned = () => {
    playDispatch({ type: PLAYER_KICKED, payload: 'abandoned' });
  };

  /**
   * Dispatch player kicked
   */
  const dispatchPlayerKicked = () => {
    playDispatch({ type: PLAYER_KICKED, payload: 'banned' });
  };

  return {
    card,
    serial,
    crossmarks,
    kicked,
    initPlay,
    setCard,
    toggleCrossmark,
    setWinningCrossmarks,
    dispatchRoomAbandoned,
    dispatchPlayerKicked,
  };
}
