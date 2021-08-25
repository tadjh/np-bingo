import { Player } from '@np-bingo/types';
import {
  SOCKET_INIT,
  SOCKET_FAILURE,
  SOCKET_SUCCESS,
} from '../config/constants';

export interface UserState {
  user: Player;
  isUpdatingUser: boolean;
  isError: boolean;
}

export type UserActions =
  | { type: typeof SOCKET_INIT }
  | { type: typeof SOCKET_SUCCESS; payload: string }
  | { type: typeof SOCKET_FAILURE };

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, isUpdatingUser: true };
    case SOCKET_SUCCESS:
      return {
        ...state,
        user: { ...state.user, socketId: action.payload },
        isUpdatingUser: false,
      };
    case SOCKET_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
        isError: true,
      };
    default:
      throw new Error('Invalid User Action');
  }
}
