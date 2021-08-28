import React from 'react';
import { initialWinner } from '../reducers/app.reducer';
import { Player, Winner, Room, Host } from '@np-bingo/types';
import { initialPlayer } from '../hooks';

export interface RoomContextProps {
  room: Room;
  host: Host;
  winner: Winner;
  players: Player[];
}

export const initialRoomContext: RoomContextProps = {
  room: '',
  host: { ...initialPlayer },
  winner: { ...initialWinner },
  players: [] as Player[],
};

export const RoomContext = React.createContext(initialRoomContext);
