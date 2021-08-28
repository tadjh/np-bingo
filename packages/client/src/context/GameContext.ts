import React, { Dispatch } from 'react';
import { AppActions } from '../reducers/app.reducer';
import { Gamemode, Gamestate, PlayerCard, Winner } from '@np-bingo/types';

export interface GameContextProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
  playerCard: PlayerCard | null;
  dispatch: Dispatch<AppActions>;
  checkCard: () => Winner | null;
}

export const initialGameContext: GameContextProps = {
  gamestate: 'init',
  gamemode: 'default',
  playerCard: null,
  dispatch: () => {},
  checkCard: () => null,
};

export const GameContext = React.createContext(initialGameContext);
