import { Player } from '@np-bingo/types';
import {
  SOCKET_INIT,
  SOCKET_FAILURE,
  SOCKET_SUCCESS,
} from '../config/constants';

export interface UserState {
  user: Player;
  isLoading: boolean;
  isError: boolean;
}

export type UserActions =
  | { type: typeof SOCKET_INIT }
  | { type: typeof SOCKET_SUCCESS; payload: string }
  | { type: typeof SOCKET_FAILURE };

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, isLoading: true, isError: false };
    case SOCKET_SUCCESS:
      return {
        ...state,
        user: { ...state.user, socketId: action.payload },
        isLoading: false,
        isError: false,
      };
    case SOCKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error('Invalid User Action');
  }
}
