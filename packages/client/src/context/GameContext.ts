import React, { Dispatch } from 'react';
import { AppActions, initialAppState } from '../reducers/app.reducer';
import { Gamemode, Gamestate, Winner } from '@np-bingo/types';

export interface GameContextProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
  dispatch: Dispatch<AppActions>;
  checkCard: () => Winner | null;
}

export const initialGameContext: GameContextProps = {
  gamestate: initialAppState.gamestate,
  gamemode: initialAppState.rules.mode,
  dispatch: () => {},
  // play: (gamestate: Gamestate) => {},
  // mode: (gamemode: Gamemode) => {},
  checkCard: () => null,
};

export const GameContext = React.createContext(initialGameContext);
