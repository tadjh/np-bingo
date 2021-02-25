import React from 'react';
import Ball from '../Components/Ball';
import Next from '../Components/Next';
import { GameContext } from '../App';
import { Status } from '../Constants/types';
import StatusMessage from '../Components/Status';

type Props = {
  play: (action: Status) => void;
  checkCard: () => void;
  newBall: () => void;
  winningText: string;
};

function Host(props: Props) {
  let { play, checkCard, newBall } = props;
  return (
    <div className="Host">
      <h1>Host View</h1>
      <GameContext.Consumer>
        {(value) => (
          <div className="App-buttons">
            <Next host={true} value={value} play={play} />
            <button
              className={`${value !== 'start' && 'disabled'}`}
              disabled={value !== 'start' && true}
              onClick={checkCard}
            >
              Check Card
            </button>
          </div>
        )}
      </GameContext.Consumer>
      <GameContext.Consumer>
        {(value) => <StatusMessage host={true} value={value} />}
      </GameContext.Consumer>
      <GameContext.Consumer>
        {(value) => value === 'start' && <Ball host={true} newBall={newBall} />}
      </GameContext.Consumer>
    </div>
  );
}

export default Host;
