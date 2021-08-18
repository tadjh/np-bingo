import { useState } from 'react';
import { Player } from '@np-bingo/types';
import { Socket } from 'socket.io-client';

export function useUser(
  initialValue = {
    name: 'Player',
    socket: {} as Socket,
  }
) {
  const [user, setUser] = useState<Player>(initialValue);

  /**
   * Set user socket id
   * @param socketId
   */
  const setUserSocket = (socket: Socket) => {
    setUser((prevUser) => ({ ...prevUser, socket: socket }));
  };
  return { user, setUserSocket };
}
