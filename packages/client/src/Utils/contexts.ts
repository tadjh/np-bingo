import React from 'react';
import { initialState } from '../Reducers/app.reducer';

export const GameContext = React.createContext({
  gamestate: initialState.gamestate,
  room: initialState.room,
  host: { ...initialState.host },
  mode: initialState.rules.mode,
});

export const BallContext = React.createContext({
  ball: { ...initialState.ball },
  loop: initialState.loop,
  progress: 0,
});
