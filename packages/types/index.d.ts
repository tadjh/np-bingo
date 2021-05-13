export type Action = {
  type: string;
  payload?: any;
};
export type AppState = {
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
};
export type PlayerState = {
  card: Card;
  serial: string;
  crossmarks: { [key: string]: boolean };
};
export type Player = {
  _id?: string;
  uid?: number;
  name?: string;
  socket?: string;
  ready?: boolean;
};
export interface Host extends Player {
  socket: string;
}
export type Ball = {
  key: number;
  number: number;
  column: string;
  remainder: number;
};
export type PlayerCard = {
  card: Card;
  owner: Player;
};
export type Room = string;
export type Methods = string[];
export type Serial = string;
export type Card = number[];
export type Pool = number[][];
export type Theme = 'light' | 'dark';
export type Results = {
  [key: string]: number[];
};
export type Winner = {
  methods: Methods;
  results: Results;
  player: Player;
  card: Card;
};
export type Gamestate =
  | 'init'
  | 'ready'
  | 'standby'
  | 'start'
  | 'validate'
  | 'pause'
  | 'failure'
  | 'win'
  | 'end';
/**
 * Game Mode
 * Default  - First player to complete a column, row or diagonal wins.
 * Death    - Last player to complete a column, row or diagonal wins.
 * Blackout - First player to complete the entire card.
 *
 */
export type Gamemode = 'default' | 'solo' | 'death' | 'blackout';
/**
 * Speical Game Rules
 * Postage - Top right four squares (g1, g2, o1, o2) count as a valid bingo.
 * Corners - All four corners (b1, b5, o1, o5) count as a valid bingo.
 * Roving L - A 'L' shape (b1, b2, b3, b4, b5, i5, n5, g5, o5) or inverted 'L' (o1, o2, o3, o4, o5, g5, n5, i5, b5) count as a valid bingo.
 */
export type Special = 'postage' | 'corners' | 'roving l';
export type Rules = { mode: Gamemode; special?: Special[] };
