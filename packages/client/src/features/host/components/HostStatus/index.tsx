import { Gamestate } from '@np-bingo/types';
import Typography from '../../../../components/Display/Typography';
import { useHostStatus } from './hooks';

export interface HostStatusProps {
  gamestate: Gamestate;
  count: number;
}

export default function HostStatus({
  gamestate = 'init',
  count = -1,
}: HostStatusProps): JSX.Element {
  const [hostStatus] = useHostStatus(gamestate, count);
  return <Typography>{hostStatus()}</Typography>;
}
