import React from 'react';
import { Player, Winner, Room, Host } from '@np-bingo/types';
import { initialPlayer } from '.';

export interface RoomContextProps {
  room: Room;
  host: Host;
  winners: Winner[];
  players: Player[];
}

export const initialRoomContext: RoomContextProps = {
  room: '',
  host: { ...initialPlayer },
  winners: [],
  players: [],
};

export const RoomContext = React.createContext(initialRoomContext);
