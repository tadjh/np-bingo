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
} from '@np-bingo/types';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD_SUCCESS,
  NEW_BALL,
  // UPDATE_POOL,
  STANDBY,
  VALIDATE,
  GET_CARD,
  FAILURE,
  SET_ROOM,
  JOIN_ROOM,
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_READY,
  SET_BALL,
  PAUSE,
  CHECK_CARD_FAILURE,
  WIN_GAME,
  UPDATE_GAMEMODE,
  PLAYER_KICKED,
} from '../config/constants';
import { BINGO } from '../utils/bingo';

export interface AppState {
  gamestate: Gamestate;
  room: string;
  host: Host;
  players: Player[];
  ball: Ball;
  pool: Pool;
  draws: Pool;
  playerCard: PlayerCard;
  winner: Winner;
  rules: Rules;
}

export const initialState: AppState = {
  gamestate: 'init' as Gamestate,
  room: '',
  host: { _id: '', uid: 0, name: '', socketId: '' },
  ball: { key: 0, number: 0, column: '', remainder: 75 },
  players: [],
  pool: BINGO,
  draws: [[], [], [], [], []],
  playerCard: {
    card: new Array(25),
    owner: { _id: '', uid: 0, name: '', socketId: '' },
  },
  winner: {
    methods: [],
    results: {},
    player: { _id: '', uid: 0, name: '', socketId: '' },
    card: new Array(25),
  },
  rules: { mode: 'default' as Gamemode, special: [] },
};

export type AppActions =
  | { type: typeof INIT_GAME }
  | { type: typeof READY_CHECK }
  | { type: typeof STANDBY }
  | { type: typeof START_GAME }
  | { type: typeof VALIDATE }
  | { type: typeof PAUSE }
  | { type: typeof FAILURE }
  | { type: typeof WIN_GAME }
  | { type: typeof END_GAME }
  | { type: typeof SET_ROOM; payload: { room: Room; host: Host } }
  | { type: typeof JOIN_ROOM; payload: { room: Room; player: Player } }
  | { type: typeof PLAYER_JOINED; payload: Player }
  | { type: typeof PLAYER_LEFT; payload: Player }
  | { type: typeof PLAYER_KICKED; payload: Player }
  | { type: typeof PLAYER_READY; payload: Player }
  | { type: typeof GET_CARD; payload: { card: Card; owner: Player } }
  | { type: typeof CHECK_CARD_SUCCESS; payload: Winner }
  | { type: typeof CHECK_CARD_FAILURE }
  | {
      type: typeof NEW_BALL;
      payload: {
        ball: Ball;
        draws: Pool;
        pool: Pool;
      };
    }
  | { type: typeof SET_BALL; payload: Ball }
  | { type: typeof UPDATE_GAMEMODE; payload: Gamemode };

export function reducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case INIT_GAME:
      return initialState;
    case READY_CHECK:
      return {
        ...state,
        gamestate: 'ready' as Gamestate,
        ball: { ...initialState.ball },
        pool: [...initialState.pool],
        draws: [...initialState.draws],
        playerCard: { ...initialState.playerCard },
        winner: { ...initialState.winner },
      };
    case STANDBY:
      return { ...state, gamestate: 'standby' as Gamestate };
    case START_GAME:
      return { ...state, gamestate: 'start' as Gamestate };
    case VALIDATE:
      return { ...state, gamestate: 'validate' as Gamestate };
    case PAUSE:
      return { ...state, gamestate: 'pause' as Gamestate };
    case FAILURE:
      return { ...state, gamestate: 'failure' as Gamestate };
    case WIN_GAME:
      return { ...state, gamestate: 'win' as Gamestate };
    case END_GAME:
      return { ...state, gamestate: 'end' as Gamestate };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload.room,
        host: { ...action.payload.host },
      };
    case JOIN_ROOM:
      return {
        ...state,
        room: action.payload.room,
        host: { ...action.payload.player },
      };
    case PLAYER_JOINED:
      return { ...state, players: [...state.players, action.payload] };
    case PLAYER_LEFT:
      const leaveFiltered = state.players.map((element) => {
        if (element.socketId === action.payload.socketId) {
          return { ...element, leave: true };
        }
        return element;
      });
      return { ...state, players: [...leaveFiltered] };
    case PLAYER_KICKED:
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
    // case PLAYER_UNREADY:
    //   const unreadyFiltered = state.players.map((element) => {
    //     return { ...element, ready: false };
    //   });
    //   return { ...state, players: [...unreadyFiltered] };
    case GET_CARD:
      return {
        ...state,
        playerCard: {
          ...state.playerCard,
          card: [...action.payload.card],
          owner: { ...action.payload.owner },
        },
      };
    case CHECK_CARD_SUCCESS:
      return {
        ...state,
        gamestate: 'win' as Gamestate,
        winner: { ...action.payload },
      };
    case CHECK_CARD_FAILURE:
      return {
        ...state,
        gamestate: 'failure' as Gamestate,
        winner: { ...initialState.winner },
        playerCard: { ...initialState.playerCard },
      };
    case NEW_BALL:
      return {
        ...state,
        ball: { ...action.payload.ball },
        draws: action.payload.draws.map((item) => item.slice()),
        pool: action.payload.pool.map((item) => item.slice()),
      };
    case SET_BALL:
      return { ...state, ball: { ...action.payload } };
    // case UPDATE_POOL:
    //   return { ...state, ball: { ...state.ball, remainder: action.payload } };
    case UPDATE_GAMEMODE:
      return { ...state, rules: { ...state.rules, mode: action.payload } };
    default:
      throw new Error('Invalid dispatch type.');
  }
}
