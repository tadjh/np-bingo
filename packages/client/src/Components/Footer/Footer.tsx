import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Code from '../Code';
import { Gamemode } from '@np-bingo/types';
import './style.css';
import Typography from '@material-ui/core/Typography';
export interface FooterProps {
  home?: boolean;
  room?: string;
  mode?: Gamemode;
  onClick?: () => void;
}

function Footer({ home, room = '', mode = 'default', onClick }: FooterProps) {
  return (
    <footer>
      {home ? (
        <React.Fragment>
          <Typography align="center">Made by Tadjh Brooks</Typography>
          <Link href="https://github.com/TadjhBrooks/np-bingo/" color="primary">
            https://github.com/TadjhBrooks/np-bingo
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {mode !== 'solo' && <Code room={room} />}
          <Link onClick={onClick} component={RouterLink} to="/">
            Leave Room
          </Link>
        </React.Fragment>
      )}
    </footer>
  );
}

export default Footer;
