export const DEBUG = true;

// Standard Bingo Number Distribution (USA)
const _B = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const _I = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const _N = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const _G = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const _O = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
export const BINGO = [_B, _I, _N, _G, _O];

export const letters = ['b', 'i', 'n', 'g', 'o'];

export const INIT_GAME = 'INIT GAME';
export const READY_CHECK = 'READY CHECK';
export const START_ROUND = 'START GAME';
export const END_ROUND = 'END GAME';

export const NEW_CARD = 'NEW CARD';
export const CHECK_CARD = 'CHECK CARD';

export const NEW_BALL = 'NEW BALL';
export const UPDATE_POOL = 'UPDATE POOL';
export const FLUSH_DRAWS = 'FLUSH DRAWS';
