import React from 'react';
import Ball from '../../Components/Ball';
import { GameContext } from '../../App';
import { Gamestate } from '../../Constants/types';
import StatusMessage from '../../Components/Status';

type Props = {
  play: (action: Gamestate) => void;
  checkCard: () => void;
  newBall: () => void;
};

function Host(props: Props) {
  let { play, checkCard, newBall } = props;
  let { INIT, READY, STANDBY, START, VALIDATE, FAILURE } = Gamestate;
  return (
    <div className="Host">
      <h1>Host View</h1>
      <GameContext.Consumer>
        {(value) => (
          <React.Fragment>
            <div className="App-buttons">
              <button
                type="button"
                onClick={() => play(value === INIT ? READY : INIT)}
              >
                {value === INIT ? 'New Game' : 'End Game'}
              </button>
              <button
                className={`${value !== VALIDATE && 'disabled'}`}
                disabled={value !== VALIDATE && true}
                onClick={checkCard}
              >
                Check Card
              </button>
            </div>
            <StatusMessage host={true} gamestate={value} />
            <Ball
              disabled={
                value !== START &&
                value !== STANDBY &&
                value !== FAILURE &&
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
