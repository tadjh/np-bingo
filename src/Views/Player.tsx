import React, { useEffect, useReducer } from 'react';
import { GameContext } from '../App';
import { Card, Results, Status, Winner } from '../Constants/types';
import Ball from '../Components/Ball';
import Board from '../Components/Board';
import StatusMessage from '../Components/Status';
import {
  BINGO,
  INIT_CROSSMARKS,
  INIT_GAME,
  letters,
  NEW_CARD,
  UPDATE_CROSSMARKS,
} from '../Constants';
import { createCard, serializeCard } from '../Utils/bingo';

type Props = {
  status: string;
  play: (action: Status) => void;
  winner: Winner;
  recieveCard: (card: Card) => void;
  valid?: boolean;
};

type State = {
  card: Card;
  serial: string;
  crossmarks: { [key: string]: boolean };
  valid: boolean | undefined;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  card: new Array(25),
  serial: '',
  crossmarks: {},
  valid: undefined,
};

function playerReducer(state: State, action: Action) {
  switch (action.type) {
    case INIT_GAME:
      return { ...initialState };
    case NEW_CARD:
      return {
        ...state,
        card: action.payload.card,
        serial: action.payload.serial,
      };
    case INIT_CROSSMARKS:
      return { ...state, crossmarks: action.payload };
    case UPDATE_CROSSMARKS:
      return {
        ...state,
        crossmarks: { ...action.payload },
      };
    default:
      throw new Error('Invalid Player dispatch type.');
  }
}

function Player(props: Props) {
  let { status, play, winner, recieveCard } = props;

  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    playerReducer,
    initialState
  );

  useEffect(() => {
    if (status === 'init') {
      init();
    }

    if (status === 'ready') {
      newCard();
    }

    if (winner.methods.length > 0) {
      setWinningCrossmarks(winner.methods, winner.data);
    }
  }, [status]);

  /**
   * Resets Game
   */
  const init = () => {
    dispatch({ type: INIT_GAME });
  };

  /**
   * Creates a new card and stores it in state
   */
  const newCard = () => {
    let card: Card = createCard(BINGO);
    let serialCard = [...card];
    let serial = serializeCard(serialCard);
    dispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
    clearCrossmarks();
  };

  /**
   * Toggle current target's crossmark visibility
   * @param event Click event
   */
  const toggleCrossmark = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    let value = state.crossmarks[target.id];
    let crossmark = { [target.id]: !value };

    dispatch({ type: UPDATE_CROSSMARKS, payload: crossmark });
  };

  /**
   * Resets all crossmarks
   */
  const clearCrossmarks = () => {
    dispatch({ type: INIT_CROSSMARKS, payload: {} });
  };

  /**
   * Sets Winning crossmarks after successful card validations
   * @param methods Array of current winning methods (row, column, diagonal)
   * @param data Results of validation check
   */
  const setWinningCrossmarks = (methods: string[], data: Results) => {
    let winningCrossmarks = {};
    let i;
    for (i = 0; i < methods.length; i++) {
      let marks = (data[methods[i]] as number[]).map(function (item) {
        let id = `cell${item + 1}`;
        return { [id]: true };
      });
      winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
    }

    dispatch({ type: UPDATE_CROSSMARKS, payload: winningCrossmarks });
  };

  const bingo = () => {
    play('validate');
    recieveCard(state.card);
  };

  let { card, serial, crossmarks } = state;
  const board = [...letters, ...card];
  return (
    <div className="Player">
      <h1>Player View</h1>
      {/* <h2>{winningText}</h2> */}
      <GameContext.Consumer>
        {(value) => (
          <React.Fragment>
            <div className="App-buttons">
              <button
                className={`${
                  value !== 'start' && value !== 'failure' && 'disabled'
                }`}
                disabled={value !== 'start' && value !== 'failure' && true}
                onClick={() => bingo()}
              >
                Bingo
              </button>
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
                onClick={() => play('standby')}
              >
                Ready
              </button>
            </div>
            <StatusMessage value={value} />
            <Ball disabled={value !== 'start' && value !== 'failure' && true} />
          </React.Fragment>
        )}
      </GameContext.Consumer>
      <Board
        board={board}
        serial={serial}
        winner={winner}
        crossmarks={crossmarks}
        toggleCrossmark={toggleCrossmark}
      />
    </div>
  );
}

export default Player;
