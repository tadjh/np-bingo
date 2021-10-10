// Gamestates
export const INIT = 'INIT';
export const READY_CHECK = 'READY CHECK';
export const STANDBY = 'STANDBY';
export const START = 'START';
export const CHECK_CARD = 'CHECK CARD';
export const CHECK_CARD_SUCCESS = 'CHECK CARD SUCCESS';
export const CHECK_CARD_FAILURE = 'CHECK CARD FAILURE';
export const PAUSE = 'PAUSE';
export const FAILURE = 'FAILURE';
export const WIN_GAME = 'WIN GAME';
export const LOSE_GAME = 'LOSE GAME';
export const GAME_OVER = 'GAME OVER';
export const NEW_GAME = 'NEW GAME';

// Host & Player events
export const CREATE_ROOM = 'CREATE ROOM';
export const JOIN_ROOM = 'JOIN ROOM';
export const PLAYER_READY = 'PLAYER READY';
export const PLAYER_JOIN = 'PLAYER JOIN';
export const PLAYER_LEAVE = 'PLAYER LEAVE';
export const PLAYER_KICK = 'PLAYER KICK';

// Game events
export const CHANGE_GAMEMODE = 'CHANGE GAMEMODE';
export const NEW_CARD = 'NEW CARD';
export const GET_CARD = 'GET CARD';
export const SET_BALL = 'SET BALL';
export const NEW_BALL = 'NEW BALL';
export const WINNER_CROSSMARKS = 'WINNER CROSSMARKS';
export const CLEAR_CROSSMARKS = 'CLEAR CROSSMARKS';

// Fetch
export const FETCH_INIT = 'FETCH INIT';
export const FETCH_SUCCESS = 'FETCH SUCCESS';
export const FETCH_FAILURE = 'FETCH FAILURE';

// User
export const SOCKET_INIT = 'SOCKET INIT';
export const SOCKET_SUCCESS = 'SOCKET SUCCESS';
export const SOCKET_FAILURE = 'SOCKET FAILURE';
