import lz from 'lz-string';
import { Pool, Ball, Card, Serial, Column, Draws } from '@np-bingo/types';
import { randomIndex } from '.';

// Standard Bingo Number Distribution (USA)
const _B = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const _I = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const _N = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const _G = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const _O = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
export const BINGO: Pool = [_B, _I, _N, _G, _O];

export const letters: Column[] = ['b', 'i', 'n', 'g', 'o'];

/**
 * Creates a new card and stores it in state
 * @param pool multidimensional array of all possible values
 * @returns [ Card, Serial ]
 */
export function newCard(pool: Pool): [Card, Serial] {
  const card = createCard(pool);
  const serial = serializeCard(card);
  return [card, serial];
}

/**
 * Creates an array with 25 randomized values ordered left to right, top to bottom from a pool of values
 * @param pool multidimensional array of all possible values
 * @returns
 */
export function createCard(pool: Pool): Card {
  let card = [];
  for (let i = 0; i < 5; i++) {
    const column = createColumn(pool[i]);
    for (let j = 0; j < 5; j++) {
      const offset = 5 * j + i;
      card[offset] = column[j];
    }
  }
  // Note: On display output, remove 13th cell and replace with a free spot
  // cell[12] = 'free';
  return card;
}

/**
 * Create a randomized column array from an array of integers
 * @param array integer array
 * @returns array
 */
export function createColumn(array: number[]): number[] {
  let column = [];
  let values = [...array];
  for (let i = 0; i < 5; i++) {
    let value = values[randomIndex(values)];
    column[i] = value;
    // Remove value from values array for loop interations 0 thru 3
    if (i !== 4) {
      values = values.filter(function (item: number) {
        return item !== value;
      });
    }
  }
  return column;
}

/**
 * Serialized card to a unique string
 * @param card
 * @returns string
 */
export function serializeCard(card: Card): Serial {
  const newCard = [...card];
  // Remove free space from serial
  newCard.splice(12, 1);
  const serial = newCard.join('');
  if (serial === '') return '';
  return compressSerial(serial);
}

/**
 * Compress serial
 * @param string string
 * @returns string
 */
function compressSerial(string: string): Serial {
  return lz.compressToBase64(string);
}

/**
 * Decompress serial
 * @param serial string
 * @returns string
 */
export function decompressSerial(serial: Serial) {
  return lz.decompressFromBase64(serial);
}

/**
 * Takes the entire set of remaining balls and returns a random ball with remainder
 * @param pool
 * @returns Ball
 */
export function getBall(pool: Pool): Ball {
  const [remainder, remainingColumns] = getPoolSize(pool);

  // No balls remaining
  if (remainder === 0)
    return {
      key: 0,
      number: 0,
      column: '',
      remainder: 0,
    };

  const randomColumn = randomIndex(remainingColumns);
  const columnIndex = remainingColumns[randomColumn];
  const column = pool[columnIndex];
  const ballIndex = randomIndex(column);

  // New Ball
  return {
    key: columnIndex,
    number: column[ballIndex],
    column: letters[columnIndex],
    remainder: remainder - 1,
  };
}

/**
 * Updates the remaining size of the given pool
 * @param pool Set of all balls in pool
 * @returns Size of the pool and an index of valid remaining columns
 */
export function getPoolSize(pool: Pool): [number, number[]] {
  let remainder = 0;
  let columns = [];
  for (let i = 0; i < pool.length; i++) {
    if (pool[i].length > 0) {
      remainder += pool[i].length;
      columns.push(i);
    }
  }
  return [remainder, columns];
}

/**
 * Removes a single ball from the remaining set of balls
 * @param pool Remaining set of all possible balls
 * @param value The ball to be removed
 * @returns Updated pool of balls
 */
export function removeBall(pool: Pool, ball: Ball): Pool {
  return pool.map((item: number[], index) => {
    if (index === ball.key) {
      return item.filter((element: number) => {
        return element !== ball.number;
      });
    }
    return [...item];
  });
}

/**
 * Pushes new ball into draws
 * @param draws
 * @param ball
 * @returns draws Pool
 */
export function updateDraws(draws: Draws, ball: Ball): Pool {
  return draws.map((item: number[], index) => {
    if (index === ball.key) {
      return [...item, ball.number];
    }
    return [...item];
  });
}
