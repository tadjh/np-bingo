// import { create } from 'domain';
import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import {
  INIT_GAME,
  READY_CHECK,
  START_ROUND,
  END_ROUND,
  NEW_CARD,
  CHECK_CARD,
  NEW_BALL,
  UPDATE_POOL,
  BINGO,
  letters,
  DEBUG,
  FLUSH_DRAWS,
} from './Constants';
import {
  createCard,
  getBall,
  removeBall,
  validateCard,
  getPoolSize,
} from './Utils/bingo';
import { validationText } from './Utils';
import { Ball, Card, Pool, Results, Status } from './Constants/types';
import Host from './Views/Host';
import Player from './Views/Player';

type State = {
  card: Card;
  ball: Ball;
  pool: Pool;
  draws: Pool;
  valid: boolean | undefined;
  status: Status;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  card: new Array(25),
  ball: { key: 0, value: 0, name: '', remainder: 0 },
  pool: BINGO,
  draws: [[], [], [], [], []],
  valid: undefined,
  status: 'init',
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case INIT_GAME:
      // Forcing it. Must be mutated somewhere.
      return { ...initialState, draws: [[], [], [], [], []] };
    case READY_CHECK:
      return { ...state, status: action.payload };
    case START_ROUND:
      return { ...state, status: action.payload };
    case END_ROUND:
      return { ...state, status: action.payload };
    case NEW_CARD:
      return { ...state, card: action.payload };
    case CHECK_CARD:
      return { ...state, valid: action.payload };
    case NEW_BALL:
      return {
        ...state,
        ball: action.payload.ball,
        draws: action.payload.draws,
        pool: action.payload.pool,
      };
    case UPDATE_POOL:
      return { ...state, ball: { ...state.ball, remainder: action.payload } };
    default:
      throw new Error('Invalid dispatch type.');
  }
}

export const GameContext = React.createContext('init' as Status);
export const BallContext = React.createContext({
  key: 0,
  value: 0,
  name: '',
  remainder: 0,
} as Ball);

function App() {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );
  const [crossmarks, setCrossmarks] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    DEBUG && console.log(state);
    // console.log(state);
  });

  /**
   * Manages Bingo game states
   * @param status
   */
  const play = (status: Status) => {
    switch (status) {
      case 'init':
        dispatch({ type: INIT_GAME, payload: 'init' });
        break;
      case 'ready':
        dispatch({ type: READY_CHECK, payload: 'ready' });
        newCard();
        break;
      case 'start':
        dispatch({ type: START_ROUND, payload: 'start' });
        checkPoolSize();
        break;
      case 'end':
        resetCrossmarks();
        dispatch({ type: INIT_GAME });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  };

  /**
   * Creates a new card and stores it in state
   */
  const newCard = () => {
    let data: Card = createCard(BINGO);
    dispatch({ type: NEW_CARD, payload: data });
    resetCrossmarks();
  };

  const checkPoolSize = () => {
    let pool: Pool = state.pool;
    let { remainder: data } = getPoolSize(pool);
    dispatch({ type: UPDATE_POOL, payload: data });
  };

  /**
   * Retrieves a new Bingo ball from the remaining pool of balls.
   * Returns undefined if pool is empty.
   */
  const newBall = () => {
    let pool: Pool = state.pool;
    let draws: Pool = state.draws;
    let ball = getBall(pool);

    if (ball.value !== 0) {
      pool = removeBall(pool, ball);

      // if (!draws) {
      //   draws = [[], [], [], [], []];
      // }

      draws[ball.key].push(ball.value);
    }

    let data = {
      ball,
      draws,
      pool,
    };

    dispatch({ type: NEW_BALL, payload: data });
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
      dispatch({ type: CHECK_CARD, payload: true });
    } else {
      dispatch({ type: CHECK_CARD, payload: false });
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
    <GameContext.Provider value={state.status}>
      <BallContext.Provider value={state.ball}>
        <div className="App">
          <Host
            play={play}
            checkCard={() => checkCard(state.card, state.draws)}
            winningText={validationText(state.valid)}
            newBall={newBall}
          ></Host>
          <Player
            play={play}
            newCard={newCard}
            board={board}
            toggleCrossmark={toggleCrossmark}
            crossmarks={crossmarks}
            winningText={validationText(state.valid)}
            winner={state.valid}
          ></Player>
        </div>
        <code className={`Debug ${!DEBUG && 'disabled'}`}>
          <h1>Debug</h1>
          <h3>Current Draws</h3>
          <p>{state.draws ? JSON.stringify(state.draws) : 'None'}</p>
          <p>by Tadjh Brooks</p>
        </code>
      </BallContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
