import Button from '@material-ui/core/Button';
import React from 'react';
import { BallContext } from '../../App';
import './style.css';

type Props = {
  newBall?: () => void;
  host?: boolean;
  disabled?: boolean;
};

function Ball(props: Props) {
  let { newBall, host, disabled } = props;
  return (
    <BallContext.Consumer>
      {(value) => (
        <div className="ball-container-wrapper">
          {host && newBall && (
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              className={`${disabled && 'disabled'}`}
              onClick={newBall}
            >
              New Ball
            </Button>
          )}
          <div className="ball-container">
            <div className={`ball ${value.column} ${disabled && 'disabled'}`}>
              <div className="column text blue">{value.column}</div>
              <div className="number text blue">
                {value.number !== 0 && value.number}
              </div>
            </div>
            <p
              className={`remainder ${disabled && 'hidden'}`}
            >{`Balls Remaining: ${value.remainder}`}</p>
          </div>
        </div>
      )}
    </BallContext.Consumer>
  );
}

export default Ball;
