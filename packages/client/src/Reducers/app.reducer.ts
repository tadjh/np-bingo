import {
  Action,
  Gamestate,
  Gamemode,
  Ball,
  Host,
  Player,
  PlayerCard,
  Pool,
  Rules,
  Winner,
} from '@np-bingo/types';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD_SUCCESS,
  NEW_BALL,
  UPDATE_POOL,
  BINGO,
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
  PLAYER_KICKED,
  PLAYER_UNREADY,
  PAUSE,
  CHECK_CARD_FAILURE,
  WIN_GAME,
  UPDATE_GAMEMODE,
} from '../Constants';

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
  kicked: boolean;
  rules: Rules;
}

export const initialState: AppState = {
  gamestate: 'init' as Gamestate,
  room: '',
  host: { _id: '', uid: 0, name: '', socket: '' },
  ball: { key: 0, number: 0, column: '', remainder: 75 },
  players: [],
  pool: BINGO,
  draws: [[], [], [], [], []],
  playerCard: {
    card: new Array(25),
    owner: { _id: '', uid: 0, name: '', socket: '' },
  },
  winner: {
    methods: [],
    results: {},
    player: { _id: '', uid: 0, name: '', socket: '' },
    card: new Array(25),
  },
  kicked: false,
  rules: { mode: 'default' as Gamemode, special: [] },
};

export function reducer(state: AppState, action: Action) {
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
      return { ...state, gamestate: 'failure' as Gamestate }; // TODO This is unsued
    case WIN_GAME:
      return { ...state, gamestate: 'win' as Gamestate }; // TODO This is unsued
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
        host: { ...action.payload.host },
      };
    case PLAYER_JOINED:
      return { ...state, players: [...state.players, action.payload] };
    case PLAYER_LEFT:
      const leaveFiltered = state.players.filter((element) => {
        return element.socket !== action.payload.socket;
      });
      return { ...state, players: [...leaveFiltered] };
    case PLAYER_KICKED:
      return { ...state, kicked: true };
    case PLAYER_READY:
      const readyFiltered = state.players.map((element) => {
        if (element.socket === action.payload.socket) {
          return { ...element, ready: true };
        }
        return element;
      });
      return { ...state, players: [...readyFiltered] };
    case PLAYER_UNREADY:
      const unreadyFiltered = state.players.map((element) => {
        return { ...element, ready: false };
      });
      return { ...state, players: [...unreadyFiltered] };
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
        draws: [...action.payload.draws],
        pool: [...action.payload.pool],
      };
    case SET_BALL:
      return { ...state, ball: { ...action.payload } };
    case UPDATE_POOL:
      return { ...state, ball: { ...state.ball, remainder: action.payload } };
    case UPDATE_GAMEMODE:
      return { ...state, rules: { ...state.rules, mode: action.payload } };
    default:
      throw new Error('Invalid dispatch type.');
  }
}
