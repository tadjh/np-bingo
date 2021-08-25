import React from 'react';
import { initialAppState } from '../reducers/app.reducer';
import { Player, Winner, Room, Host } from '@np-bingo/types';

export interface RoomContextProps {
  room: Room;
  host: Host;
  winner: Winner;
  players: Player[];
}

export const initialRoomContext: RoomContextProps = {
  room: initialAppState.room,
  host: { ...initialAppState.host },
  winner: { ...initialAppState.winner },
  players: [] as Player[],
};

export const RoomContext = React.createContext(initialRoomContext);
