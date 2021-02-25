import React from 'react';
import { BallContext } from '../App';

type Props = {
  newBall?: () => void;
  host?: boolean;
};

function Ball(props: Props) {
  let { newBall, host } = props;
  return (
    <div className="ball-container">
      {host && newBall && <button onClick={newBall}>New Ball</button>}
      <BallContext.Consumer>
        {(value) => (
          <React.Fragment>
            <span className="ball">{value.name}</span>
            <p className="h5">{`Balls Remaining: ${value.remainder}`}</p>
          </React.Fragment>
        )}
      </BallContext.Consumer>
    </div>
  );
}

export default Ball;
