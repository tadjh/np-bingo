import { Action, Card } from '@np-bingo/types';
import {
  INIT_CROSSMARKS,
  INIT_GAME,
  NEW_CARD,
  UPDATE_CROSSMARKS,
  WINNER_CROSSMARKS,
} from '../Constants';

export interface PlayerState {
  card: Card;
  serial: string;
  crossmarks: { [key: string]: boolean };
}

export const initialState: PlayerState = {
  card: new Array(25),
  serial: '',
  crossmarks: {},
};

export function reducer(state: PlayerState, action: Action) {
  switch (action.type) {
    case INIT_GAME:
      return { ...initialState };
    case NEW_CARD:
      return {
        ...state,
        card: action.payload.card,
        serial: action.payload.serial,
      };
    case INIT_CROSSMARKS:
      return { ...state, crossmarks: action.payload };
    case UPDATE_CROSSMARKS:
      return {
        ...state,
        crossmarks: { ...state.crossmarks, ...action.payload },
      };
    case WINNER_CROSSMARKS:
      return {
        ...state,
        crossmarks: { ...action.payload },
      };
    default:
      throw new Error('Invalid Player dispatch type.');
  }
}
