import React, { Dispatch, SetStateAction } from 'react';
import { initialState } from '../Reducers/app.reducer';
import features from '../config/features';
import { Gamemode, Gamestate, Player, Ball } from '@np-bingo/types';

export const UserContext = React.createContext<{
  user: Player;
  setUser: Dispatch<SetStateAction<Player>>;
}>({
  user: {
    _id: '',
    uid: -1,
    name: 'Player',
    socket: '',
    ready: false,
  },
  setUser: () => {},
});

export const FeautresContext = React.createContext({ ...features });

export const ThemeContext = React.createContext({
  theme: features.theme,
  toggleTheme: () => {},
});

export const SoundContext = React.createContext({
  volume: features.defaultVolume,
  sounds: features.sounds,
  toggleSounds: () => {},
});

export const GameContext = React.createContext({
  gamestate: initialState.gamestate,
  gamemode: initialState.rules.mode,
  room: initialState.room,
  host: { ...initialState.host },
  winner: { ...initialState.winner },
  play: (gamestate: Gamestate) => {},
  mode: (gamemode: Gamemode) => {},
  checkCard: () => false as boolean,
});

export const BallContext = React.createContext<{
  ball: Ball;
  newBall: () => Ball;
}>({
  ball: { ...initialState.ball },
  newBall: () => initialState.ball,
});
