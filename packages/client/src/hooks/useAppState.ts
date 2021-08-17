import { Action, Ball, Gamemode, Gamestate, Host, Pool } from '@np-bingo/types';
import { useCallback, useReducer } from 'react';
import logger from 'use-reducer-logger';
import {
  INIT_GAME,
  READY_CHECK,
  STANDBY,
  START_GAME,
  VALIDATE,
  PAUSE,
  FAILURE,
  WIN_GAME,
  END_GAME,
  UPDATE_GAMEMODE,
  NEW_BALL,
  SET_ROOM,
  JOIN_ROOM,
} from '../config/constants';
import { AppState, initialState, reducer } from '../Reducers/app.reducer';

export function useAppState() {
  const [state, dispatch] = useReducer<
    (state: AppState, action: Action) => AppState
  >(
    process.env.NODE_ENV === 'development' ? logger(reducer) : reducer,
    initialState
  );

  /**
   * Manage game state
   * @param gamestate
   */
  const play = useCallback((gamestate: Gamestate) => {
    switch (gamestate) {
      case 'init':
        dispatch({ type: INIT_GAME });
        break;
      case 'ready':
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        dispatch({ type: STANDBY });
        break;
      case 'start':
        dispatch({ type: START_GAME });
        break;
      case 'validate':
        dispatch({ type: VALIDATE });
        break;
      case 'pause':
        dispatch({ type: PAUSE });
        break;
      case 'failure':
        dispatch({ type: FAILURE });
        break;
      case 'win':
        dispatch({ type: WIN_GAME });
        break;
      case 'end':
        dispatch({ type: END_GAME });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  }, []);

  /**
   * Update game mode
   * @param gamemode
   */
  const mode = useCallback((gamemode: Gamemode) => {
    switch (gamemode) {
      case 'default':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'default' });
        break;
      case 'solo':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'solo' });
        break;
      case 'death':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'death' });
        break;
      case 'blackout':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'blackout' });
        break;
      default:
        throw new Error('Invalid game mode.');
    }
  }, []);

  /**
   * Dispatch Create Room
   * @param room
   * @param host
   */
  const dispatchCreateRoom = (room: string, host: Host) => {
    dispatch({
      type: SET_ROOM,
      payload: { room: room, host: host },
    });
  };

  /**
   * Dispatch Join Room
   * @param room
   * @param host
   */
  const dispatchJoinRoom = (room: string, host: Host) => {
    dispatch({
      type: JOIN_ROOM,
      payload: { room: room, host: host },
    });
  };

  /**
   * Dispatch New Ball
   * @param ball
   * @param draws
   * @param pool
   */
  const dispatchNewBall = (ball: Ball, draws: Pool, pool: Pool) => {
    dispatch({
      type: NEW_BALL,
      payload: {
        ball,
        draws,
        pool,
      },
    });
  };
  return {
    state,
    dispatch,
    play,
    mode,
    dispatchCreateRoom,
    dispatchJoinRoom,
    dispatchNewBall,
  };
}
