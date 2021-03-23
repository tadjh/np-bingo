import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Code from '../Code';

type Props = {
  room: string;
  leaveRoom?: () => void;
};

function Footer(props: Props) {
  let { room, leaveRoom } = props;

  return (
    <footer>
      <Code room={room} />
      <Link onClick={leaveRoom} component={RouterLink} to="/">
        Leave Room
      </Link>
    </footer>
  );
}

export default Footer;
