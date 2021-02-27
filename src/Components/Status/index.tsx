import React from 'react';
import { Gamestate } from '../../Constants/types';
import { statusText } from '../../Utils';

type Props = {
  gamestate: Gamestate;
  host?: boolean;
  winningText?: string;
};

function Status(props: Props) {
  let { gamestate, host } = props;
  let text = statusText(gamestate, host);
  return <p>{text}</p>;
}

export default Status;
