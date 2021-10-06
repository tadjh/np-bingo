import React, { Dispatch } from 'react';
import { AppActions } from '../reducers/app.reducer';
import { Gamemode, Gamestate, PlayerCard, Winner } from '@np-bingo/types';

export interface GameContextProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
  playerCards: PlayerCard[];
  split: boolean;
  dispatch: Dispatch<AppActions>;
  checkCard: (playerCard: PlayerCard) => Winner | null;
}

export const initialGameContext: GameContextProps = {
  gamestate: 'init',
  gamemode: 'default',
  playerCards: [],
  split: false,
  dispatch: () => {},
  checkCard: () => null,
};

export const GameContext = React.createContext(initialGameContext);
