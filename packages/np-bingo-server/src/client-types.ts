export type Player = {
  _id: string;
  uid: number;
  name: string;
  socket: string;
  ready?: boolean;
};
export interface Host extends Player {}
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
export type Card = number[];
export type Pool = number[][];
export type Results = {
  [key: string]: number[] | boolean;
};
export type Winner = {
  methods: Methods;
  data: Results;
  player: Player | { name: string };
  card: Card;
};
export enum Gamestate {
  INIT = 'init',
  READY = 'ready',
  STANDBY = 'standby',
  START = 'start',
  VALIDATE = 'validate',
  PAUSE = 'pause',
  FAILURE = 'failure',
  WIN = 'win',
  END = 'end',
}

/**
 * Game Type
 * Default  - First player to complete a column, row or diagonal wins.
 * Death    - Last player to complete a column, row or diagonal wins.
 * Blackout - First player to complete the entire card.
 *
 */
export enum Gametype {
  DEFAULT = 'default',
  DEATH = 'death',
  BLACKOUT = 'blackout',
}

/**
 * Speical Game Rules
 * Postage - Top right four squares (g1, g2, o1, o2) count as a valid bingo.
 * Corners - All four corners (b1, b5, o1, o5) count as a valid bingo.
 * Roving L - A 'L' shape (b1, b2, b3, b4, b5, i5, n5, g5, o5) or inverted 'L' (o1, o2, o3, o4, o5, g5, n5, i5, b5) count as a valid bingo.
 */
export enum Special {
  POSTAGE = 'postage',
  CORNERS = 'corners',
  ROVING_L = 'roving l',
}

export type Rules = { type: Gametype; special?: Special[] };
