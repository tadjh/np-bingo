import { useState } from 'react';
import { Player } from '@np-bingo/types';

export function useUser(
  initialValue = {
    name: 'Player',
  }
) {
  const [user, setUser] = useState<Player>(initialValue);
  return { user, setUser };
}
