import { Card, Kicked, Reason, Serial } from '@np-bingo/types';
import {
  CLEAR_CROSSMARKS,
  INIT,
  LOSE_GAME,
  NEW_CARD,
  PLAYER_KICK,
  WINNER_CROSSMARKS,
} from '../config/constants';

export interface PlayState {
  card: Card;
  serial: Serial;
  crossmarks: { [key: string]: boolean };
  kicked: Kicked;
  isWinner: boolean;
  isNewGame: boolean;
}

export const initialPlayState: PlayState = {
  card: new Array(25),
  serial: '',
  crossmarks: {},
  kicked: { status: false, reason: 'none' },
  isWinner: false,
  isNewGame: true,
};

export type PlayActions =
  | { type: typeof INIT }
  | { type: typeof NEW_CARD; payload: { card: Card; serial: Serial } }
  | { type: typeof CLEAR_CROSSMARKS }
  | {
      type: typeof WINNER_CROSSMARKS;
      payload: {
        [key: string]: boolean;
      };
    }
  | {
      type: typeof PLAYER_KICK;
      payload: Reason;
    }
  | { type: typeof LOSE_GAME };

export function playReducer(state: PlayState, action: PlayActions): PlayState {
  switch (action.type) {
    case INIT:
      return { ...initialPlayState };
    case NEW_CARD:
      return {
        ...state,
        card: action.payload.card,
        serial: action.payload.serial,
        crossmarks: {},
        isNewGame: false,
        isWinner: false,
      };
    case CLEAR_CROSSMARKS:
      return { ...state, crossmarks: {}, isNewGame: true };
    case WINNER_CROSSMARKS:
      return {
        ...state,
        crossmarks: { ...action.payload },
        isWinner: true,
      };
    case PLAYER_KICK:
      return {
        ...state,
        kicked: { ...state.kicked, status: true, reason: action.payload },
      };
    case LOSE_GAME:
      return {
        ...state,
        card: new Array(25),
        serial: '',
        crossmarks: {},
        isWinner: false,
      };
    default:
      throw new Error('Invalid Player Action');
  }
}
