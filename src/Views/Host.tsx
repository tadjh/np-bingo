import React from 'react';
import Ball from '../Components/Ball';
import { GameContext } from '../App';
import { Status } from '../Constants/types';
import StatusMessage from '../Components/Status';

type Props = {
  play: (action: Status) => void;
  checkCard: () => void;
  newBall: () => void;
};

function Host(props: Props) {
  let { play, checkCard, newBall } = props;
  return (
    <div className="Host">
      <h1>Host View</h1>
      <GameContext.Consumer>
        {(value) => (
          <React.Fragment>
            <div className="App-buttons">
              <button
                type="button"
                onClick={() => play(value === 'init' ? 'ready' : 'init')}
              >
                {value === 'init' ? 'New Game' : 'End Game'}
              </button>
              <button
                className={`${value !== 'validate' && 'disabled'}`}
                disabled={value !== 'validate' && true}
                onClick={checkCard}
              >
                Check Card
              </button>
            </div>
            <StatusMessage host={true} value={value} />
            <Ball
              disabled={
                value !== 'start' &&
                value !== 'standby' &&
                value !== 'failure' &&
                true
              }
              host={true}
              newBall={newBall}
            />
          </React.Fragment>
        )}
      </GameContext.Consumer>
    </div>
  );
}

export default Host;
