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
} from '../Constants';
import {
  Ball,
  Pool,
  Gamestate,
  Gametype,
  Rules,
  Winner,
  Player,
  PlayerCard,
} from '../types';

export type State = {
  gamestate: Gamestate;
  room: string;
  host: Player;
  players: Player[];
  ball: Ball;
  pool: Pool;
  draws: Pool;
  playerCard: PlayerCard;
  winner: Winner;
  kicked: boolean;
  rules: Rules;
};

export type Action = {
  type: string;
  payload?: any;
};

export const initialState: State = {
  gamestate: Gamestate.INIT,
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
    data: {},
    player: { _id: '', uid: 0, name: '', socket: '' },
    card: new Array(25),
  },
  kicked: false,
  rules: { type: Gametype.DEFAULT, special: [] },
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    // Force it. Probably mutating draws state somewhere
    case INIT_GAME:
      return { ...initialState, draws: [[], [], [], [], []] };
    case READY_CHECK:
      return {
        ...state,
        gamestate: action.payload,
        ball: { key: 0, number: 0, column: '', remainder: 75 },
        pool: BINGO,
        draws: [[], [], [], [], []],
        playerCard: {
          card: new Array(25),
          owner: { _id: '', uid: 0, name: '', socket: '' },
        },
        winner: {
          methods: [],
          data: {},
          player: { _id: '', uid: 0, name: '', socket: '' },
          card: new Array(25),
        },
      };
    case STANDBY:
      return { ...state, gamestate: action.payload };
    case START_GAME:
      return {
        ...state,
        gamestate: action.payload,
      };
    case VALIDATE:
      return { ...state, gamestate: action.payload };
    case PAUSE:
      return { ...state, gamestate: action.payload };
    case FAILURE:
      return { ...state, gamestate: action.payload };
    case WIN_GAME:
      return { ...state, gamestate: action.payload };
    case END_GAME:
      return {
        ...state,
        gamestate: action.payload,
      };
    case SET_ROOM:
      return { ...state, room: action.payload.room, host: action.payload.host };
    case JOIN_ROOM:
      return { ...state, room: action.payload.room, host: action.payload.host };
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
          card: [...action.payload.card],
          owner: action.payload.owner,
        },
      };
    case CHECK_CARD_SUCCESS:
      return {
        ...state,
        gamestate: action.payload.gamestate,
        valid: action.payload.valid,
        winner: action.payload.winner,
      };
    case CHECK_CARD_FAILURE:
      return {
        ...state,
        gamestate: action.payload,
        winner: {
          methods: [],
          data: {},
          card: new Array(25),
          player: { _id: '', uid: 0, name: '', socket: '' },
        },
        playerCard: {
          card: new Array(25),
          owner: { _id: '', uid: 0, name: '', socket: '' },
        },
      };
    case NEW_BALL:
      return {
        ...state,
        ball: action.payload.ball,
        draws: action.payload.draws,
        pool: action.payload.pool,
      };
    case SET_BALL:
      return { ...state, ball: action.payload };
    case UPDATE_POOL:
      return { ...state, ball: { ...state.ball, remainder: action.payload } };
    default:
      throw new Error('Invalid dispatch type.');
  }
}
