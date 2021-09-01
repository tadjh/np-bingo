import { useReducer } from 'react';
import { NODE_ENV } from '../config';
import {
  AppState,
  appReducer,
  AppActions,
  initialAppState,
} from '../reducers/app.reducer';
import { ReducerLogger } from './useReducerLogger';

export function useAppState() {
  const [state, dispatch] = useReducer<
    (state: AppState, action: AppActions) => AppState
  >(
    NODE_ENV === 'development' ? ReducerLogger(appReducer) : appReducer,
    initialAppState
  );

  // /**
  //  * Manage game state
  //  * @param gamestate
  //  */
  // const play = useCallback((gamestate: Gamestate) => {
  //   switch (gamestate) {
  //     case 'init':
  //       dispatch({ type: INIT_GAME });
  //       break;
  //     case 'ready':
  //       dispatch({ type: READY_CHECK });
  //       break;
  //     case 'standby':
  //       dispatch({ type: STANDBY });
  //       break;
  //     case 'start':
  //       dispatch({ type: START_GAME });
  //       break;
  //     case 'validate':
  //       dispatch({ type: VALIDATE });
  //       break;
  //     case 'pause':
  //       dispatch({ type: PAUSE });
  //       break;
  //     case 'failure':
  //       dispatch({ type: FAILURE });
  //       break;
  //     case 'win':
  //       dispatch({ type: WIN_GAME });
  //       break;
  //     case 'end':
  //       dispatch({ type: END_GAME });
  //       break;
  //     default:
  //       throw new Error('Invalid game state.');
  //   }
  // }, []);

  // /**
  //  * Update game mode
  //  * @param gamemode
  //  */
  // const mode = useCallback((gamemode: Gamemode) => {
  //   switch (gamemode) {
  //     case 'default':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'default' });
  //       break;
  //     case 'solo':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'solo' });
  //       break;
  //     case 'death':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'death' });
  //       break;
  //     case 'blackout':
  //       dispatch({ type: UPDATE_GAMEMODE, payload: 'blackout' });
  //       break;
  //     default:
  //       throw new Error('Invalid game mode.');
  //   }
  // }, []);

  return {
    state,
    dispatch,
  };
}
