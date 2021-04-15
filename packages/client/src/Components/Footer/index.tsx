import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Code from '../Code';
import { Gamemode } from '@np-bingo/types';
type Props = {
  room: string;
  leaveRoom?: () => void;
  mode?: Gamemode;
};

function Footer(props: Props) {
  let { room, leaveRoom, mode } = props;

  return (
    <footer>
      {mode !== 'solo' && <Code room={room} />}
      <Link onClick={leaveRoom} component={RouterLink} to="/">
        Leave Room
      </Link>
    </footer>
  );
}

export default Footer;
