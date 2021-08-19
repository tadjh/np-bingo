import { Gamestate } from '@np-bingo/types';
import Status from '../../../../components/Display/Status';
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
  return <Status>{hostStatus()}</Status>;
}
