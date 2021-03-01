import React, { useReducer, useState } from 'react';
import './App.css';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD,
  NEW_BALL,
  UPDATE_POOL,
  BINGO,
  DEBUG,
  STANDBY,
  VALIDATE,
  GET_CARD,
  FAILURE,
} from './Constants';
import { getBall, removeBall, validateCard, getPoolSize } from './Utils/bingo';
import {
  Ball,
  Card,
  Pool,
  Results,
  Gamestate,
  Winner,
} from './Constants/types';
import Host from './Views/Host';
import Player from './Views/Player';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Panel from './Components/Panel';

type State = {
  gamestate: Gamestate;
  ball: Ball;
  pool: Pool;
  draws: Pool;
  card: Card;
  valid: boolean | undefined;
  winner: Winner;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  gamestate: Gamestate.INIT,
  ball: { key: 0, number: 0, column: '', remainder: 75 },
  pool: BINGO,
  draws: [[], [], [], [], []],
  card: new Array(25),
  valid: undefined,
  winner: { methods: [], data: {} },
  // rules: ['standard'];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    // Force it. Probably mutating draws state somewhere
    case INIT_GAME:
      return { ...initialState, draws: [[], [], [], [], []] };
    case READY_CHECK:
      return { ...state, gamestate: action.payload };
    case STANDBY:
      return { ...state, gamestate: action.payload };
    case START_GAME:
      return {
        ...state,
        gamestate: action.payload.gamestate,
        valid: action.payload.valid,
      };
    case VALIDATE:
      return { ...state, gamestate: action.payload };
    case FAILURE:
      return { ...state, gamestate: action.payload };
    case END_GAME:
      return { ...state, gamestate: action.payload };
    case GET_CARD:
      return { ...state, card: action.payload };
    case CHECK_CARD:
      return {
        ...state,
        gamestate: action.payload.gamestate,
        valid: action.payload.valid,
        winner: action.payload.winner,
      };
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

export const GameContext = React.createContext(Gamestate.INIT);
export const BallContext = React.createContext({
  key: 0,
  number: 0,
  column: '',
  remainder: 75,
} as Ball);

function App() {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );

  /**
   * Manages Bingo game states
   * @param gamestate
   */
  const play = (gamestate: Gamestate) => {
    switch (gamestate) {
      case Gamestate.INIT:
        dispatch({ type: INIT_GAME, payload: 'init' });
        break;
      case Gamestate.READY:
        dispatch({ type: READY_CHECK, payload: 'ready' });
        break;
      case Gamestate.STANDBY:
        dispatch({ type: STANDBY, payload: 'standby' });
        break;
      case Gamestate.START:
        dispatch({
          type: START_GAME,
          payload: { gamestate: 'start', valid: undefined },
        });
        checkPoolSize();
        break;
      case Gamestate.VALIDATE:
        dispatch({ type: VALIDATE, payload: 'validate' });
        break;
      case Gamestate.FAILURE:
        dispatch({ type: FAILURE, payload: 'failure' });
        break;
      case Gamestate.END:
        dispatch({ type: END_GAME, payload: 'end' });
        break;
      default:
        throw new Error('Invalid game state.');
    }
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
    let gamestate: Gamestate = state.gamestate;
    let pool: Pool = [...state.pool];
    let draws: Pool = [...state.draws];
    let ball = getBall(pool);

    if (ball.number !== 0) {
      pool = removeBall(pool, ball);

      draws[ball.key].push(ball.number);
    }

    // These probably belong somewhere else outside of this funciton
    if (gamestate === Gamestate.STANDBY || gamestate === Gamestate.FAILURE) {
      dispatch({
        type: START_GAME,
        payload: { gamestate: 'start', valid: undefined },
      });
    }

    dispatch({
      type: NEW_BALL,
      payload: {
        ball: ball,
        draws: draws,
        pool: pool,
      },
    });

    if (ball.remainder === 0) {
      dispatch({
        type: END_GAME,
        payload: 'end',
      });
    }
  };

  /**
   * Get card from player
   * @param card
   */
  const recieveCard = (card: Card) => {
    dispatch({ type: GET_CARD, payload: [...card] });
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
      dispatch({
        type: CHECK_CARD,
        payload: {
          valid: true,
          gamestate: 'end',
          winner: { methods: methods, data: data },
        },
      });
    } else {
      dispatch({
        type: CHECK_CARD,
        payload: {
          valid: false,
          gamestate: 'failure',
          winner: { methods: [], data: {} },
        },
      });
    }
  };

  let { gamestate, ball, draws, card, winner } = state;

  const [currentTab, setCurrentTabs] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTabs(newValue);
  };

  return (
    <GameContext.Provider value={gamestate}>
      <BallContext.Provider value={ball}>
        <div className="App">
          <Paper square>
            <Tabs
              value={currentTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="Host and Player Tabs"
            >
              <Tab label="Host" />
              <Tab label="Player" />
            </Tabs>
          </Paper>
          <Panel value={currentTab} index={0}>
            <Host
              play={play}
              checkCard={() => checkCard(card, draws)}
              newBall={newBall}
              draws={draws}
            ></Host>
          </Panel>
          <Panel value={currentTab} index={1}>
            <Player
              play={play}
              winner={winner}
              gamestate={gamestate}
              recieveCard={recieveCard}
            ></Player>
          </Panel>
        </div>
        <code className={`Debug ${!DEBUG && 'disabled'}`}>
          <h1>Debug</h1>
          <p>by Tadjh Brooks</p>
        </code>
      </BallContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
