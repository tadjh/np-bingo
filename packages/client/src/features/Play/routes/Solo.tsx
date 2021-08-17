import Play, { PlayProps } from './Play';
import { Card, Player } from '@np-bingo/types';

export interface SoloProps extends PlayProps {
  dispatchSendCard: (card: Card, user: Player) => void;
}

export function Solo({ ...props }: SoloProps) {
  return <Play gamemode={'solo'} {...props} />;
}
