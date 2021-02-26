import React from 'react';
import { BallContext } from '../App';

type Props = {
  newBall?: () => void;
  host?: boolean;
  disabled?: boolean;
};

function Ball(props: Props) {
  let { newBall, host, disabled } = props;
  return (
    <div className="ball-container">
      {host && newBall && (
        <button
          disabled={disabled}
          className={`${disabled && 'disabled'}`}
          onClick={newBall}
        >
          New Ball
        </button>
      )}
      <BallContext.Consumer>
        {(value) => (
          <React.Fragment>
            <span className={`ball ${disabled && 'disabled'}`}>
              {value.name}
            </span>
            <p
              className={`h5 ${disabled && 'hidden'}`}
            >{`Balls Remaining: ${value.remainder}`}</p>
          </React.Fragment>
        )}
      </BallContext.Consumer>
    </div>
  );
}

export default Ball;
