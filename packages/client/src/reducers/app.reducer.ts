import {
  Gamestate,
  Gamemode,
  Ball,
  Host,
  Player,
  PlayerCard,
  Pool,
  Rules,
  Winner,
  Room,
  Card,
  Draws,
} from '@np-bingo/types';
import {
  INIT,
  READY_CHECK,
  START,
  GAME_OVER,
  CHECK_CARD_SUCCESS,
  NEW_BALL,
  STANDBY,
  CHECK_CARD,
  GET_CARD,
  CREATE_ROOM,
  JOIN_ROOM,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  PLAYER_READY,
  SET_BALL,
  PAUSE,
  CHECK_CARD_FAILURE,
  CHANGE_GAMEMODE,
  PLAYER_KICK,
} from '../config/constants';
import { initialPlayer } from '../context';
import { BINGO } from '../utils/bingo';

export const initialBall: Ball = {
  key: 0,
  number: 0,
  column: '',
  remainder: 75,
};

export const initialWinner: Winner = {
  methods: [],
  results: { row: [], column: [], diagonal: [] },
  player: { ...initialPlayer },
  card: new Array(25),
};

export interface AppState {
  gamestate: Gamestate;
  gameId: string;
  room: string;
  host: Host;
  players: Player[];
  ball: Ball;
  pool: Pool;
  draws: Draws;
  playerCards: PlayerCard[];
  winners: Winner[];
  rules: Rules;
}

export type AppActions =
  | { type: typeof INIT }
  | { type: typeof READY_CHECK }
  | { type: typeof STANDBY }
  | { type: typeof START }
  | { type: typeof CHECK_CARD }
  | { type: typeof PAUSE }
  | { type: typeof GAME_OVER }
  | {
      type: typeof CREATE_ROOM;
      payload: { id: string; room: Room; host: Partial<Host> };
    }
  | { type: typeof JOIN_ROOM; payload: { room: Room; host: Partial<Player> } }
  | { type: typeof PLAYER_JOIN; payload: Player }
  | { type: typeof PLAYER_LEAVE; payload: Player }
  | { type: typeof PLAYER_KICK; payload: Player }
  | { type: typeof PLAYER_READY; payload: Player }
  | { type: typeof GET_CARD; payload: { card: Card; owner: Player } }
  | { type: typeof CHECK_CARD_SUCCESS; payload: Winner[] }
  | { type: typeof CHECK_CARD_FAILURE }
  | {
      type: typeof NEW_BALL;
      payload: {
        ball: Ball;
        draws: Draws;
        pool: Pool;
      };
    }
  | { type: typeof SET_BALL; payload: Ball }
  | { type: typeof CHANGE_GAMEMODE; payload: Gamemode };

export const initialAppState: AppState = {
  gamestate: 'init',
  gameId: '',
  room: '',
  host: { ...initialPlayer },
  ball: { ...initialBall },
  players: [],
  pool: BINGO,
  draws: [[], [], [], [], []],
  playerCards: [],
  winners: [],
  rules: { mode: 'default', special: [], split: false },
};

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case INIT:
      return initialAppState;
    case READY_CHECK:
      const unreadyPlayers = state.players.map((player) => {
        return { ...player, ready: false };
      });
      return {
        ...state,
        gamestate: 'ready',
        ball: { ...initialBall },
        pool: BINGO.map((array) => array.slice()),
        draws: initialAppState.draws.map((array) => array.slice()),
        playerCards: [],
        winners: [],
        players: [...unreadyPlayers],
      };
    case STANDBY:
      return { ...state, gamestate: 'standby' };
    case START:
      return { ...state, gamestate: 'start' };
    case CHECK_CARD:
      return { ...state, gamestate: 'validate' };
    case GET_CARD:
      return {
        ...state,
        gamestate: 'validate',
        playerCards: [...state.playerCards, { ...action.payload }],
      };
    case CHECK_CARD_SUCCESS:
      return {
        ...state,
        gamestate: 'win',
        winners: [...state.winners, ...action.payload],
      };
    case CHECK_CARD_FAILURE:
      return {
        ...state,
        gamestate: 'failure',
        playerCards: [],
      };
    case PAUSE:
      return { ...state, gamestate: 'pause' };
    case GAME_OVER:
      return { ...state, gamestate: 'end' };
    case CREATE_ROOM:
      return {
        ...state,
        gamestate: 'ready',
        gameId: action.payload.id,
        room: action.payload.room,
        host: { ...state.host, ...action.payload.host },
      };
    case JOIN_ROOM:
      return {
        ...state,
        gamestate: 'ready',
        room: action.payload.room,
        host: { ...state.host, ...action.payload.host },
      };
    case PLAYER_JOIN:
      return { ...state, players: [...state.players, action.payload] };
    case PLAYER_LEAVE:
      const leaveFiltered = state.players.map((element) => {
        if (element.socketId === action.payload.socketId) {
          return { ...element, leave: true };
        }
        return element;
      });
      return { ...state, players: [...leaveFiltered] };
    case PLAYER_KICK:
      const kickedFiltered = state.players.map((element) => {
        if (element.socketId === action.payload.socketId) {
          return { ...element, kicked: true };
        }
        return element;
      });
      return { ...state, players: [...kickedFiltered] };
    case PLAYER_READY:
      const readyFiltered = state.players.map((element) => {
        if (element.socketId === action.payload.socketId) {
          return { ...element, ready: true };
        }
        return element;
      });
      return { ...state, players: [...readyFiltered] };
    case NEW_BALL:
      return {
        ...state,
        gamestate: 'start',
        ball: { ...action.payload.ball },
        draws: action.payload.draws.map((item) => item.slice()),
        pool: action.payload.pool.map((item) => item.slice()),
      };
    case SET_BALL:
      return {
        ...state,
        gamestate: 'start',
        ball: { ...action.payload },
      };
    case CHANGE_GAMEMODE:
      return {
        ...state,
        gamestate: 'ready',
        rules: { ...state.rules, mode: action.payload },
      };
    default:
      throw new Error('Invalid App Action');
  }
}
