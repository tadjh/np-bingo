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
import { initalPlayer } from '../hooks';
import { BINGO } from '../utils/bingo';

export interface AppState {
  gamestate: Gamestate;
  room: string;
  host: Host;
  players: Player[];
  ball: Ball;
  pool: Pool;
  draws: Draws;
  playerCard: PlayerCard;
  winner: Winner;
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
  | { type: typeof CREATE_ROOM; payload: { room: Room; host: Partial<Host> } }
  | { type: typeof JOIN_ROOM; payload: { room: Room; host: Partial<Player> } }
  | { type: typeof PLAYER_JOIN; payload: Player }
  | { type: typeof PLAYER_LEAVE; payload: Player }
  | { type: typeof PLAYER_KICK; payload: Player }
  | { type: typeof PLAYER_READY; payload: Player }
  | { type: typeof GET_CARD; payload: { card: Card; owner: Player } }
  | { type: typeof CHECK_CARD_SUCCESS; payload: Winner }
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
  gamestate: 'init' as Gamestate,
  room: '',
  host: { ...initalPlayer },
  ball: { key: 0, number: 0, column: '', remainder: 75 },
  players: [],
  pool: BINGO,
  draws: [[], [], [], [], []],
  playerCard: {
    card: new Array(25),
    owner: { ...initalPlayer },
  },
  winner: {
    methods: [],
    results: {},
    player: { ...initalPlayer },
    card: new Array(25),
  },
  rules: { mode: 'default' as Gamemode, special: [] },
};

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case INIT:
      return initialAppState;
    case READY_CHECK:
      return {
        ...state,
        gamestate: 'ready' as Gamestate,
        ball: { ...initialAppState.ball },
        pool: [...initialAppState.pool],
        draws: [...initialAppState.draws],
        playerCard: { ...initialAppState.playerCard },
        winner: { ...initialAppState.winner },
      };
    case STANDBY:
      return { ...state, gamestate: 'standby' as Gamestate };
    case START:
      return { ...state, gamestate: 'start' as Gamestate };
    case CHECK_CARD:
      return { ...state, gamestate: 'validate' as Gamestate };
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
        winner: { ...initialAppState.winner },
        playerCard: { ...initialAppState.playerCard },
      };
    case PAUSE:
      return { ...state, gamestate: 'pause' as Gamestate };
    case GAME_OVER:
      return { ...state, gamestate: 'end' as Gamestate };
    case CREATE_ROOM:
      return {
        ...state,
        gamestate: 'ready' as Gamestate,
        room: action.payload.room,
        host: { ...state.host, ...action.payload.host },
      };
    case JOIN_ROOM: // TODO Might need to wipe all game state like READY_CHECK if INIT_GAME isn't called before joining a new room
      return {
        ...state,
        gamestate: 'ready' as Gamestate,
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
    case GET_CARD:
      return {
        ...state,
        playerCard: {
          ...state.playerCard,
          card: [...action.payload.card],
          owner: { ...action.payload.owner },
        },
      };
    case NEW_BALL: // TODO moved setting start here
      return {
        ...state,
        gamestate: 'start' as Gamestate,
        ball: { ...action.payload.ball },
        draws: action.payload.draws.map((item) => item.slice()),
        pool: action.payload.pool.map((item) => item.slice()),
      };
    case SET_BALL: // TODO DO we need this?
      return {
        ...state,
        gamestate: 'start' as Gamestate,
        ball: { ...action.payload },
      };
    case CHANGE_GAMEMODE: // TODO Might need to wipe all game state like READY_CHECK if INIT_GAME isn't called before switching gamemmodes
      return {
        ...state,
        gamestate: 'ready' as Gamestate,
        rules: { ...state.rules, mode: action.payload },
      };
    default:
      throw new Error('Invalid App Action');
  }
}
