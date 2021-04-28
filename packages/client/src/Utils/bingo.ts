import lz from 'lz-string';
import { Pool, Ball, Card, Results } from '@np-bingo/types';
import { letters } from '../Constants';
import { randomIndex } from '.';

/**
 * Creates an array with 25 randomized values ordered left to right, top to bottom from a pool of values
 * @param pool multidimensional array of all possible values
 */

export function createCard(pool: Pool) {
  let card = [];
  let i: number;
  for (i = 0; i < 5; i++) {
    let column = createColumn(pool[i]);

    let x: number;
    for (x = 0; x < 5; x++) {
      let offset = 5 * x + i;
      card[offset] = column[x];
    }
  }

  // Note: Remove 13th card and replace with a free spot on display
  // card[12] = 'free';
  return card;
}
/**
 * Create a randomized column array from an array of integers
 * @param array integer array
 */
function createColumn(array: number[]) {
  let column = [];

  // Store values into new array so that we can remove used values and prevent duplication
  let values = array;

  let i: number;
  for (i = 0; i < 5; i++) {
    let index = randomIndex(values);
    let value = values[index];
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
 */
export function serializeCard(card: Card): string {
  // Remove free space from serial
  card.splice(12, 1);
  let serial = card.join('');
  let compressedSerial = compressSerial(serial);
  return compressedSerial;
}

/**
 * Compress serial
 * @param serial string
 */
function compressSerial(serial: string) {
  return lz.compressToBase64(serial);
}

/**
 * Decompress serial
 * @param serial string
 */
export function decompressSerial(serial: string) {
  return lz.decompressFromBase64(serial);
}

/**
 * Takes the entire set of remaining balls and returns a random ball
 * @param pool
 */

export function getBall(pool: Pool): Ball {
  let { columns, remainder } = getPoolSize(pool);

  // No more balls remaining
  if (columns.length <= 0) {
    return {
      key: 0,
      number: 0,
      column: '',
      remainder: 0,
    };
  }

  let columnIndex = randomIndex(columns);
  let values = pool[columns[columnIndex]];
  let valueIndex = randomIndex(values);

  return {
    key: columns[columnIndex],
    number: values[valueIndex],
    column: letters[columns[columnIndex]],
    remainder: remainder - 1,
  };
}
/**
 * Removes a single ball from the remaining set of balls and returns the updated array
 * @param pool Remaining set of all possible balls
 * @param value The ball to be removed
 */

export function removeBall(pool: Pool, ball: Ball) {
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
 * Takes a pool of numbers and return the size of the pool and an index of valid remaining columns
 * @param pool Set of all balls in pool
 */

export function getPoolSize(pool: Pool) {
  let remainder = 0;
  let columns = [];

  let i;
  for (i = 0; i < pool.length; i++) {
    if (pool[i].length > 0) {
      remainder += pool[i].length;
      columns.push(i);
    }
  }

  return { remainder, columns };
}
/**
 * Check if card is a winner based on current draw pool
 * @param card
 * @param draws
 * @returns
 */
export function validateCard(card: Card, draws: Pool) {
  let results: Results = { row: false, column: false, diagonal: false };
  let rowResults = checkRows(card, draws);
  let columnResults = checkColumns(card, draws);
  let diagonalResults = checkDiagonals(card, draws);

  if (rowResults) {
    results = { ...results, row: rowResults };
  }
  if (columnResults) {
    results = { ...results, column: columnResults };
  }
  if (diagonalResults) {
    results = { ...results, diagonal: diagonalResults };
  }
  return results;
}
/**
 * Check all rows on card for a win
 * Returns true if winning row is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkRows(card: Card, draws: Pool) {
  let result: number[] | boolean = false;
  let i;
  for (i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInRow(card, draws, i, true);
    } else {
      result = checkCellsInRow(card, draws, i);
    }
    if (result) {
      break;
    }
  }
  return result;
}
/**
 * Check each cell in each row on card for a win
 * Returns true if a row contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param offset Row offset
 * @param flag Flag for free spot
 */
function checkCellsInRow(
  card: Card,
  draws: Pool,
  offset?: number,
  flag?: boolean
) {
  if (!offset) {
    offset = 0;
  }
  let result: number[] = [];
  let i;
  for (i = 0; i < 5; i++) {
    // Skip comparison for free spot
    if (flag && i === 2) {
      result.push(offset * 5 + i);
      continue;
    }

    let check = findCommonElements([card[offset * 5 + i]], draws[i]);

    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }

    result.push(offset * 5 + i);
    continue;
  }

  return falseOrResult(result);
}
/**
 * Check all columns on card for a win
 * Returns true if winning column is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkColumns(card: Card, draws: Pool) {
  let result: number[] | boolean = false;
  let i;
  for (i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInColumn(card, draws, i, true);
    } else {
      result = checkCellsInColumn(card, draws, i);
    }
    if (result) {
      break;
    }
  }
  return result;
}
/**
 * Check each cell in each column on card for a win
 * Returns true if a column contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param offset Row offset
 * @param flag Flag for free spot
 */
function checkCellsInColumn(
  card: Card,
  draws: Pool,
  offset?: number,
  flag?: boolean
) {
  if (!offset) {
    offset = 0;
  }
  let result: number[] = [];
  let i;
  for (i = 0; i < 5; i++) {
    // Skip comparison for free spot
    if (flag && i === 2) {
      result.push(i * 5 + offset);
      continue;
    }

    let check = findCommonElements([card[i * 5 + offset]], draws[offset]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }

    result.push(i * 5 + offset);
    continue;
  }

  return falseOrResult(result);
}
/**
 * Check all diagonals on card for a win
 * Returns true if winning diagonal is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkDiagonals(card: Card, draws: Pool) {
  let result: number[] | boolean = false;
  let i;
  for (i = 0; i < 2; i++) {
    if (i === 0) {
      result = checkFallingDiagonal(card, draws, true);
    }
    if (i === 1) {
      result = checkRisingDiagonal(card, draws, true);
    }
    if (result) {
      break;
    }
  }
  return result;
}
/**
 * Check each cell on the falling diagonal on card for a win
 * Returns true if the falling diagonal contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param flag Flag for free spot
 */
function checkFallingDiagonal(card: Card, draws: Pool, flag?: boolean) {
  let result: number[] = [];
  let i;
  for (i = 0; i < 5; i++) {
    // Skip comparison for free spot
    if (flag && i === 2) {
      result.push(i * 6);
      continue;
    }

    let check = findCommonElements([card[i * 6]], draws[i]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }

    result.push(i * 6);
    continue;
  }

  return falseOrResult(result);
}
/**
 * Check each cell on the rising diagonal on card for a win
 * Returns true if the rising diagonal contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param flag Flag for free spot
 */
function checkRisingDiagonal(card: Card, draws: Pool, flag?: boolean) {
  let result: number[] = [];
  let i;
  // Too tired to figure out an algorithim for this one
  // card[5 * 4 + 0 ] draw[0]
  // card[5 * 3 + 1 ] draw[1]
  // card[5 * 2 + 2 ] draw[2]
  // card[5 * 1 + 3 ] draw[3]
  // card[5 * 0 + 4 ] draw[4]
  const offset = [4, 3, 2, 1, 0];

  for (i = 0; i < 5; i++) {
    // Skip comparison for free spot
    if (flag && i === 2) {
      result.push(offset[i] * 5 + i);
      continue;
    }
    let check = findCommonElements([card[offset[i] * 5 + i]], draws[i]);
    // If comparison fails reset result array
    if (!check) {
      result = [];
      break;
    }

    result.push(offset[i] * 5 + i);
    continue;
  }

  return falseOrResult(result);
}

function falseOrResult(result: number[]) {
  if (result.length === 0) {
    return false;
  }

  return result;
}

/**
 * Find if current value exists in the search pool
 * @param value Array of number to be checked
 * @param search Array of search pool
 */
function findCommonElements(value: number[], search: number[]) {
  return search.some((item) => value.includes(item));
}
