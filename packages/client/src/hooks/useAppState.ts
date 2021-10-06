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

  return {
    state,
    dispatch,
  };
}
