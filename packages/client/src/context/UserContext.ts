import React, { Dispatch } from 'react';
import { Player } from '@np-bingo/types';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { UserActions } from '../reducers/user.reducer';

export interface UserContextProps {
  user: Player;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  isSocketLoading: boolean;
  userDispatch: Dispatch<UserActions>;
  connect: () => void;
}

export const initialPlayer: Player = {
  uid: -1,
  name: 'Player',
  socketId: null,
  ready: false,
  kicked: false,
  leave: false,
};

export const initialUserContext: UserContextProps = {
  user: initialPlayer,
  socket: {} as Socket,
  isSocketLoading: false,
  userDispatch: () => {},
  connect: () => {},
};

export const UserContext = React.createContext(initialUserContext);
