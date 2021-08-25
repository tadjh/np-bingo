import React, { Dispatch } from 'react';
import { Card, Kicked, Serial } from '@np-bingo/types';
import { PlayActions } from '../reducers/play.reducer';

export interface PlayContextProps {
  card: Card;
  serial: Serial;
  crossmarks: { [key: string]: boolean };
  kicked: Kicked;
  isWinner: boolean;
  isNewGame: boolean;
  playDispatch: Dispatch<PlayActions>;
}

export const initialPlayContext: PlayContextProps = {
  card: [],
  serial: '',
  crossmarks: {},
  kicked: { status: false, reason: 'none' },
  isWinner: false,
  isNewGame: true,
  playDispatch: () => {},
};

export const PlayContext = React.createContext(initialPlayContext);
