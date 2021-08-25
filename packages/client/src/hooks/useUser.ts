import { Dispatch, useReducer } from 'react';
import { Player } from '@np-bingo/types';
import { NODE_ENV } from '../config';
import logger from 'use-reducer-logger';
import { UserActions, UserState, userReducer } from '../reducers/user.reducer';

// TODO Add unique string to end of player name #4140
export const initalPlayer: Player = {
  uid: -1,
  name: 'Player',
  socketId: null,
  ready: false,
  kicked: false,
  leave: false,
};

export function useUser(
  initialUser: Player = initalPlayer
): [Player, Dispatch<UserActions>] {
  const userInititalState: UserState = {
    user: initialUser,
    isLoading: false,
    isError: false,
  };
  const [{ user }, userDispatch] = useReducer<
    (state: UserState, action: UserActions) => UserState
  >(
    NODE_ENV === 'development' ? logger(userReducer) : userReducer,
    userInititalState
  );
  return [user, userDispatch];
}
