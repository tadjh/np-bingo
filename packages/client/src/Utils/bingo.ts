import lz from 'lz-string';
import { Pool, Ball, Card, Results, Methods, Serial } from '@np-bingo/types';
import { letters } from '../Constants';
import { findElementInArray, randomIndex } from '.';

/**
 * Creates a new card and stores it in state
 * @param pool multidimensional array of all possible values
 * @returns {{card: Card, serial: string}}
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
  // Note: Remove 13th cell and replace with a free spot on display
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
 * Takes the entire set of remaining balls and returns a random ball
 * @param pool
 */

export function getBall(pool: Pool): Ball {
  const [remainder, columns] = getPoolSize(pool);
  // No balls remaining
  if (columns.length <= 0)
    return {
      key: 0,
      number: 0,
      column: '',
      remainder: 0,
    };
  const columnIndex = randomIndex(columns);
  const column = pool[columns[columnIndex]];
  const ballIndex = randomIndex(column);
  return {
    key: columns[columnIndex],
    number: column[ballIndex],
    column: letters[columns[columnIndex]],
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
  return pool.map(function (item: number[], index) {
    if (index === ball.key) {
      return item.filter(function (element: number) {
        return element !== ball.number;
      });
    }
    return item;
  });
}

/**
 * Check if card is a winner and return the winning methods
 * @param card
 * @param draws
 * @returns Tuple of Results, Methods
 */
export function validateCard(card: Card, draws: Pool): [Results, Methods] {
  const results = checkCard(card, draws);
  const methods = winningMethods(results);
  return [results, methods];
}

/**
 * Check if card is a winner based on current draw pool
 * @param card
 * @param draws
 * @returns Results object
 */
export function checkCard(card: Card, draws: Pool): Results {
  const row = checkRows(card, draws);
  const column = checkColumns(card, draws);
  const diagonal = checkDiagonals(card, draws);
  return { row, column, diagonal };
}

/**
 * Check all rows on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkRows(card: Card, draws: Pool) {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInRow(card, draws, { offset: i, flag: true });
    } else {
      result = checkCellsInRow(card, draws, { offset: i });
    }
    if (result.length > 0) break;
  }
  return result;
}
/**
 * Check each cell in each row on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param {{offset: number, flag: boolean}} args additional arguments
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkCellsInRow(
  card: Card,
  draws: Pool,
  { offset = 0, flag = false } = {}
): number[] {
  let result = [];
  for (let i = 0; i < 5; i++) {
    // Skip free spot
    if (flag && i === 2) {
      result.push(offset * 5 + i);
      continue;
    }
    let check = findElementInArray(card[offset * 5 + i], draws[i]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }
    result.push(offset * 5 + i);
  }
  return result;
}

/**
 * Check all columns on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 *  @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkColumns(card: Card, draws: Pool): number[] {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInColumn(card, draws, { offset: i, flag: true });
    } else {
      result = checkCellsInColumn(card, draws, { offset: i });
    }
    if (result.length > 0) break;
  }
  return result;
}

/**
 * Check each cell in each column (offset) on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param {{offset: number, flag: boolean}} args additional arguments
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkCellsInColumn(
  card: Card,
  draws: Pool,
  { offset = 0, flag = false } = {}
): number[] {
  let result = [];
  for (let i = 0; i < 5; i++) {
    // Skip free spot
    if (flag && i === 2) {
      result.push(i * 5 + offset);
      continue;
    }
    const check = findElementInArray(card[i * 5 + offset], draws[offset]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }
    result.push(i * 5 + offset);
  }
  return result;
}

/**
 * Check diagonals on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkDiagonals(card: Card, draws: Pool): number[] {
  const falling = checkFallingDiagonal(card, draws);
  const rising = checkRisingDiagonal(card, draws);
  return [...falling, ...rising];
}

/**
 * Check each cell on the falling diagonal on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkFallingDiagonal(card: Card, draws: Pool): number[] {
  let result = [];
  for (let i = 0; i < 5; i++) {
    // Skip free spot
    if (i === 2) {
      result.push(i * 6);
      continue;
    }
    const check = findElementInArray(card[i * 6], draws[i]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }
    result.push(i * 6);
  }
  return result;
}

/**
 * Check each cell on the rising diagonal on card for a win
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @returns Array of winning index positions on card or otherwise an empty array
 */
export function checkRisingDiagonal(card: Card, draws: Pool): number[] {
  let result = [];
  const offset = [4, 3, 2, 1, 0];
  for (let i = 0; i < 5; i++) {
    // Skip free spot
    if (i === 2) {
      result.push(offset[i] * 5 + i);
      continue;
    }
    const check = findElementInArray(card[offset[i] * 5 + i], draws[i]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }
    result.push(offset[i] * 5 + i);
  }
  return result;
}

/**
 * Checks results for winning methods
 * @param results
 * @returns Array of winning methods
 */
export function winningMethods(results: Results): string[] {
  return Object.keys(results).filter((method) => {
    if (results[method].length <= 0) return undefined;
    return results[method];
  });
}

/**
 * Sets Winning crossmarks after successful card validations
 * @param methods Array of current winning methods (row, column, diagonal)
 * @param results Results of validation check
 * @retuns Object of winning crossmarks
 */
export function winningCells(results: Results): { [key: string]: boolean } {
  const methods = winningMethods(results);
  let winningCrossmarks = {};
  for (let i = 0; i < methods.length; i++) {
    let marks = (results[methods[i]] as number[]).map(function (item) {
      let id = `cell${item + 1}`;
      return { [id]: true };
    });
    winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
  }
  return winningCrossmarks;
}
