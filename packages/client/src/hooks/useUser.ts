import { useState } from 'react';
import { Player } from '@np-bingo/types';

export function useUser(
  initialValue = {
    name: 'Player',
    socket: '',
  }
): [Player, React.Dispatch<React.SetStateAction<Player>>] {
  const [user, setUser] = useState<Player>(initialValue);
  return [user, setUser];
}
