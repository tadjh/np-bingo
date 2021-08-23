import React, { Dispatch, SetStateAction } from 'react';
import { initialState } from '../reducers/app.reducer';
import features from '../config/features';
import {
  Gamemode,
  Gamestate,
  Player,
  Ball,
  Winner,
  Room,
  Theme,
  Host,
} from '@np-bingo/types';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export interface UserContextProps {
  user: Player;
  isUpdatingUser: boolean;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setUser: Dispatch<SetStateAction<Player>>;
  setIsUpdatingUser: Dispatch<SetStateAction<boolean>>;
  connect: () => void;
}

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface SoundContextProps {
  volume: number;
  sounds: boolean;
  toggleSounds: () => void;
}

export interface RoomContextProps {
  room: Room;
  host: Host;
  winner: Winner;
  players: Player[];
}

export interface GameContextProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
  play: (gamestate: Gamestate) => void;
  mode: (gamemode: Gamemode) => void;
  checkCard: () => Winner | null;
}

export interface BallContextProps {
  ball: Ball;
  newBall: () => Ball;
}

export const initialUserContext: UserContextProps = {
  user: {
    _id: '',
    uid: -1,
    name: 'Player',
    socketId: '',
    ready: false,
  },
  isUpdatingUser: false,
  socket: {} as Socket,
  setUser: () => {},
  connect: () => {},
  setIsUpdatingUser: () => {},
};

export const inititalThemeContext: ThemeContextProps = {
  theme: features.theme,
  toggleTheme: () => {},
};

export const initialSoundContext: SoundContextProps = {
  volume: features.defaultVolume,
  sounds: features.sounds,
  toggleSounds: () => {},
};

export const initialRoomContext: RoomContextProps = {
  room: initialState.room,
  host: { ...initialState.host },
  winner: { ...initialState.winner },
  players: [] as Player[],
};

export const initialGameContext: GameContextProps = {
  gamestate: initialState.gamestate,
  gamemode: initialState.rules.mode,
  play: (gamestate: Gamestate) => {},
  mode: (gamemode: Gamemode) => {},
  checkCard: () => null,
};

export const initialBallContext: BallContextProps = {
  ball: { ...initialState.ball },
  newBall: () => initialState.ball,
};

export const UserContext = React.createContext(initialUserContext);

export const FeaturesContext = React.createContext(features);

export const ThemeContext = React.createContext(inititalThemeContext);

export const SoundContext = React.createContext(initialSoundContext);

export const RoomContext = React.createContext(initialRoomContext);

export const GameContext = React.createContext(initialGameContext);

export const BallContext = React.createContext(initialBallContext);
