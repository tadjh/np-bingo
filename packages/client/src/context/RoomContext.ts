import React from 'react';
import { Player, Winner, Room, Host } from '@np-bingo/types';
import { initialPlayer } from '.';

export interface RoomContextProps {
  room: Room;
  gameId: string;
  host: Host;
  winners: Winner[];
  players: Player[];
}

export const initialRoomContext: RoomContextProps = {
  room: '',
  gameId: '',
  host: { ...initialPlayer },
  winners: [],
  players: [],
};

export const RoomContext = React.createContext(initialRoomContext);
