import React from 'react';
import { Status } from '../Constants/types';
import { buttonText } from '../Utils';

type Props = {
  play: (action: Status) => void;
  value: Status;
  host?: boolean;
};

function Next(props: Props) {
  let { value, play, host } = props;
  let { next, text } = buttonText(value, host);
  return (
    <button type="button" onClick={() => play(next)}>
      {text}
    </button>
  );
}

export default Next;
