import { Player } from '@np-bingo/types';
import {
  SOCKET_INIT,
  SOCKET_FAILURE,
  SOCKET_SUCCESS,
} from '../config/constants';

export interface UserState {
  user: Player;
  isSocketLoading: boolean;
  isSocketError: boolean;
}

export type UserActions =
  | { type: typeof SOCKET_INIT }
  | { type: typeof SOCKET_SUCCESS; payload: string }
  | { type: typeof SOCKET_FAILURE };

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, isSocketLoading: true, isSocketError: false };
    case SOCKET_SUCCESS:
      return {
        ...state,
        user: { ...state.user, socketId: action.payload },
        isSocketLoading: false,
        isSocketError: false,
      };
    case SOCKET_FAILURE:
      return {
        ...state,
        isSocketLoading: false,
        isSocketError: true,
      };
    default:
      throw new Error('Invalid User Action');
  }
}
