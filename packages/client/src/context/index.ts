import React from 'react';
import { initialState } from '../reducers/app.reducer';
import features from '../config/features';
import { Gamemode, Gamestate, Player, Ball, Winner } from '@np-bingo/types';
import { Socket } from 'socket.io-client';

export const UserContext = React.createContext<{
  user: Player;
  setUserSocket: (socket: Socket) => void;
}>({
  user: {
    _id: '',
    uid: -1,
    name: 'Player',
    socket: {} as Socket,
    ready: false,
  },
  setUserSocket: () => {},
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
  checkCard: (): Winner | null => null,
});

export const BallContext = React.createContext<{
  ball: Ball;
  newBall: () => Ball;
}>({
  ball: { ...initialState.ball },
  newBall: () => initialState.ball,
});
