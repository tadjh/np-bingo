import React from 'react';
import { initialState } from '../Reducers/app.reducer';
import features from '../Config/features';
import { Gamestate, Player, Theme } from '@np-bingo/types';

export const GameContext = React.createContext({
  gamestate: initialState.gamestate,
  room: initialState.room,
  host: { ...initialState.host },
  mode: initialState.rules.mode,
  play: (gamestate: Gamestate) => {},
  user: {} as Player,
});

export const BallContext = React.createContext({ ...initialState.ball });

export const FeautresContext = React.createContext({ ...features });

export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});
