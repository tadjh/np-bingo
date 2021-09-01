export type Player = {
  _id?: string;
  uid?: number;
  name: string;
  socketId: string | null;
  ready: boolean;
  kicked: boolean;
  leave: boolean;
};
export type Host = Player;
export type Ball = {
  key: number;
  number: number;
  column: Column;
  remainder: number;
};
export type Column = '' | 'b' | 'i' | 'n' | 'g' | 'o';
// TODO consider Pick<Player, "_id" | "socketId">;
export type PlayerCard = {
  card: Card;
  owner: Player;
};
export type Room = string;
export type Method = 'row' | 'column' | 'diagonal';
export type Serial = string;
export type Card = number[];
export type Draws = Pool;
export type Pool = number[][];
export type Theme = 'light' | 'dark';
export type Results = {
  [key in Method]: number[];
};
export type Winner = {
  methods: Method[];
  results: Results;
  player: Player;
  card: Card;
};
export type CurrentBall = { ball: Ball; draws: Draws; pool: Pool };
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
export type Rules = { mode: Gamemode; special?: Special[]; split: boolean };
export type Kicked = {
  status: boolean;
  reason: Reason;
};
export type Reason = 'none' | 'banned' | 'abandoned';
export type PlayerEvent = 'join-room' | 'leave-room' | 'ready-up' | 'send-card';
export type HostEvent =
  | 'create-room'
  | 'leave-room'
  | 'kick-player'
  | RoomEvent;
export type RoomEvent =
  | 'sync-gamestate'
  | 'dispense-ball'
  | 'send-card'
  | 'winning-cards'
  | 'losing-cards';

export interface CreateRoom {
  room: Room;
  host: Host;
  message: string;
}

export interface JoinRoom {
  room: Room;
  host: Host;
  message: string;
}
