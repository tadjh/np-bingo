import React from 'react';
import { Status as Gamestate } from '../Constants/types';
import { statusText } from '../Utils';

type Props = {
  value: Gamestate;
  host?: boolean;
  winningText?: string;
};

function Status(props: Props) {
  let { value, host } = props;
  let text = statusText(value, host);
  return <p>{text}</p>;
}

export default Status;
