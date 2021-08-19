import { Gamemode, Gamestate } from '@np-bingo/types';
import Status from '../../../../components/Display/Status';
import { usePlayStatus } from './hooks';

export interface PlayStatusProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
}

export default function PlayStatus({
  gamestate = 'init',
  gamemode = 'default',
}: PlayStatusProps): JSX.Element {
  const [playStatus] = usePlayStatus(gamestate, gamemode);
  return <Status>{playStatus()}</Status>;
}
