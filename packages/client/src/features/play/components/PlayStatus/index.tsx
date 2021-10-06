import { Gamemode, Gamestate } from '@np-bingo/types';
import Typography from '../../../../components/Display/Typography';
import { usePlayStatus } from './hooks';

export interface PlayStatusProps {
  gamestate: Gamestate;
  gamemode: Gamemode;
}

export default function PlayStatus({
  gamestate = 'init',
  gamemode = 'default',
  ...props
}: PlayStatusProps): JSX.Element {
  const [playStatus] = usePlayStatus(gamestate, gamemode);
  return <Typography {...props}>{playStatus()}</Typography>;
}
