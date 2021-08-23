import { useState } from 'react';
import { Player } from '@np-bingo/types';

export function useUser(
  initialValue: Player = {
    name: 'Player',
    socketId: '',
  }
) {
  const [user, setUser] = useState(initialValue);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  return { user, isUpdatingUser, setUser, setIsUpdatingUser };
}
