import React from 'react';
import { initialState } from '../Reducers/app.reducer';
import features from '../config/features';
import { Gamestate, Player } from '@np-bingo/types';

export const GameContext = React.createContext({
  gamestate: initialState.gamestate,
  gamemode: initialState.rules.mode,
  room: initialState.room,
  host: { ...initialState.host },
  user: {} as Player,
  winner: { ...initialState.winner },
  play: (gamestate: Gamestate) => {},
});

export const BallContext = React.createContext({ ...initialState.ball });

export const FeautresContext = React.createContext({ ...features });

export const ThemeContext = React.createContext({
  theme: features.theme,
  toggleTheme: () => {},
});

export const SoundContext = React.createContext({
  sounds: features.sounds,
  toggleSounds: () => {},
});