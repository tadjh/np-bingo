// import { create } from 'domain';
import React, { useReducer, useState } from 'react';
import './App.css';
import Cell from './Components/Cell';
import {
  createCard,
  BINGO,
  letters,
  getBall,
  Ball,
  Card,
  Pool,
  removeBall,
  validateCard,
  Results,
  randomIndex,
} from './bingo';

type State = {
  card: Card;
  ball: Ball | undefined;
  pool: Pool;
  draws: Pool;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState = {
  card: createCard(BINGO),
  ball: undefined,
  pool: BINGO,
  draws: [[], [], [], [], []],
  winner: undefined,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'NEW GAME':
      return action.payload;
    case 'NEW CARD':
      return { ...state, card: action.payload, winner: undefined };
    case 'NEW BALL':
      return { ...state, ...action.payload };
    case 'CHECK CARD':
      return { ...state, winner: action.payload };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [crossmarks, setCrossmarks] = useState<{ [key: string]: boolean }>({});

  /**
   * Resets Bingo game
   */
  const newGame = () => {
    let data = {
      ...initialState,
      card: createCard(BINGO),
      draws: [[], [], [], [], []],
    };
    dispatch({ type: 'NEW GAME', payload: data });
    resetCrossmarks();
  };

  /**
   * Creates a new card and stores it in state
   * @param pool Pool of all possible values
   */
  const newCard = (pool: Pool) => {
    let data = createCard(pool);
    dispatch({ type: 'NEW CARD', payload: data });
    resetCrossmarks();
  };

  /**
   * Retrieves a new Bingo ball from the remaining pool of balls
   */
  const newBall = () => {
    let pool = state.pool;
    let draws = state.draws;
    let ball = getBall(pool);

    if (ball) {
      pool = removeBall(pool, ball);

      if (!draws) {
        draws = [[], [], [], [], []];
      }

      draws[ball.key].push(ball.value);
    }

    let data = {
      ball,
      draws,
      pool,
    };

    dispatch({ type: 'NEW BALL', payload: data });
  };

  /**
   * Checks if input card is a winner
   * @param card Input card to be checked
   * @param draws Pool of bingo balls that have already been drawn
   */
  const checkCard = (card: Card, draws: Pool) => {
    let data: Results = validateCard(card, draws);
    const methods = Object.keys(data).filter(function (items) {
      return data[items];
    });

    if (methods.length > 0) {
      setWinningCrossmarks(methods, data);
      dispatch({ type: 'CHECK CARD', payload: true });
    } else {
      dispatch({ type: 'CHECK CARD', payload: false });
    }
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
    console.log(winningCrossmarks);

    setCrossmarks({ ...crossmarks, ...winningCrossmarks });
  };

  /**
   * Text to be displayed based on value of state.winner
   * @param state
   */
  const winningText = (state: boolean | undefined) => {
    let attemptText = [
      'Not quite...',
      'Keep trying!',
      'You got this.',
      'Hang in there',
      'Hi Dean',
    ];

    switch (state) {
      case undefined:
        return ' ';
      case true:
        return 'Winner!';
      case false:
        return attemptText[randomIndex(attemptText)];
    }
  };

  /**
   * Toggle current target's crossmark visibility
   * @param event Click event
   */
  const toggleCrossmark = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    setCrossmarks({ ...crossmarks, [target.id]: !crossmarks[target.id] });
  };

  /**
   * Resets all crossmarks
   */
  const resetCrossmarks = () => {
    setCrossmarks({});
  };

  const board = [...letters, ...state.card];

  return (
    <div className="App">
      <div className="App-buttons">
        <button onClick={() => newGame()}>New Game</button>
        <button onClick={() => newCard(BINGO)}>New Card</button>
        <button onClick={() => checkCard(state.card, state.draws)}>
          Check Card
        </button>
        <div className="current-draw">
          <button onClick={() => newBall()}>New Ball</button>
          <span className="ball">
            {state.ball && letters[state.ball.key] + state.ball.value}
          </span>
        </div>
      </div>

      <div>Click a cell to mark it</div>
      <h2>{winningText(state.winner)}</h2>

      <div className="grid-container">
        <div className={`grid ${state.winner && 'winner'}`}>
          {board.map((value, index) => {
            if (index < 5) {
              return (
                <div
                  className={`grid-header ${state.winner && 'winner'}`}
                  key={index}
                >
                  {value}
                </div>
              );
            }
            let id = `cell${index - 4}`;
            return (
              <Cell
                id={id}
                className={`grid-item-${index - 4}`}
                key={index}
                crossmark={crossmarks[id]}
                onClick={toggleCrossmark}
              >
                {index !== 12 + 5 ? value : 'free'}
              </Cell>
            );
          })}
        </div>
      </div>

      <pre>
        <h1>Debug</h1>
        <h3>Current Draws</h3>
        <p>{state.draws ? JSON.stringify(state.draws) : 'None'}</p>
        <p>by Tadjh Brooks</p>
      </pre>
    </div>
  );
}

export default App;
