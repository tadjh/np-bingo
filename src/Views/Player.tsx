import React from 'react';
import { GameContext } from '../App';
import { Status } from '../Constants/types';
import Ball from '../Components/Ball';
import Board from '../Components/Board';
import StatusMessage from '../Components/Status';

type Props = {
  play: (action: Status) => void;
  newCard: () => void;
  board: (number | string)[];
  toggleCrossmark: (event: React.MouseEvent) => void;
  crossmarks: { [key: string]: boolean };
  winningText: string;
  winner: undefined | boolean;
};

function Player(props: Props) {
  let { play, newCard, board, toggleCrossmark, crossmarks, winner } = props;

  return (
    <div className="Player">
      <h1>Player View</h1>
      {/* <h2>{winningText}</h2> */}
      <GameContext.Consumer>
        {(value) => (
          <div className="App-buttons">
            <button
              className={`${value !== 'ready' && 'disabled'}`}
              disabled={value !== 'ready' && true}
              onClick={newCard}
            >
              New Card
            </button>
            <button
              className={`${value !== 'ready' && 'disabled'}`}
              disabled={value !== 'ready' && true}
              onClick={() => play('start')}
            >
              Ready
            </button>
          </div>
        )}
      </GameContext.Consumer>
      <GameContext.Consumer>
        {(value) => <StatusMessage value={value} />}
      </GameContext.Consumer>
      <Board
        board={board}
        winner={winner}
        crossmarks={crossmarks}
        toggleCrossmark={toggleCrossmark}
      />
      <GameContext.Consumer>
        {(value) => value === 'start' && <Ball />}
      </GameContext.Consumer>
    </div>
  );
}

export default Player;
