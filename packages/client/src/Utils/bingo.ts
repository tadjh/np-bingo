import lz from 'lz-string';
import { Pool, Ball, Card, Results, Methods } from '@np-bingo/types';
import { letters } from '../Constants';
import { randomIndex } from '.';

/**
 * Creates an array with 25 randomized values ordered left to right, top to bottom from a pool of values
 * @param pool multidimensional array of all possible values
 */

export function createCard(pool: Pool) {
  let card = [];
  for (let i = 0; i < 5; i++) {
    let column = createColumn(pool[i]);

    for (let x = 0; x < 5; x++) {
      let offset = 5 * x + i;
      card[offset] = column[x];
    }
  }

  // Note: Remove 13th cell and replace with a free spot on display
  // cell[12] = 'free';
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

  for (let i = 0; i < 5; i++) {
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
 * Check if card is a winner and return the winning methods
 * @param card
 * @param draws
 * @returns Tuple of Results, Methods
 */
export function validateCard(card: Card, draws: Pool) {
  const results = checkCard(card, draws);
  const methods = winningMethods(results);
  return [results, methods] as [Results, Methods];
}

/**
 * Check if card is a winner based on current draw pool
 * @param card
 * @param draws
 * @returns Results object
 */
function checkCard(card: Card, draws: Pool): Results {
  const row = checkRows(card, draws);
  const column = checkColumns(card, draws);
  const diagonal = checkDiagonals(card, draws);
  return { row, column, diagonal };
}

/**
 * Checks results for winning methods
 * @param results
 * @returns Array of winning methods
 */
function winningMethods(results: Results): string[] {
  return Object.keys(results).filter((method) => {
    if (results[method].length <= 0) return undefined;
    return results[method];
  });
}

/**
 * Sets Winning crossmarks after successful card validations
 * @param methods Array of current winning methods (row, column, diagonal)
 * @param results Results of validation check
 */
export function winningCells(results: Results) {
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

/**
 * Check all rows on card for a win
 * Returns early if winning row is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkRows(card: Card, draws: Pool) {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInRow(card, draws, i, true);
    } else {
      result = checkCellsInRow(card, draws, i);
    }
    if (result.length > 0) break;
  }
  return result;
}
/**
 * Check each cell in each row on card for a win
 * Returns if a row contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param offset Row offset
 * @param flag Flag for free spot
 */
function checkCellsInRow(
  card: Card,
  draws: Pool,
  offset: number,
  flag?: boolean
) {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
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

  return result;
}
/**
 * Check all columns on card for a win
 * Returns early if winning column is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkColumns(card: Card, draws: Pool) {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      result = checkCellsInColumn(card, draws, i, true);
    } else {
      result = checkCellsInColumn(card, draws, i);
    }
    if (result.length > 0) break;
  }
  return result;
}
/**
 * Check each cell in each column on card for a win
 * Returns if a column contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param offset Row offset
 * @param flag Flag for free spot
 */
function checkCellsInColumn(
  card: Card,
  draws: Pool,
  offset: number,
  flag?: boolean
) {
  let result: number[] = [];
  for (let i = 0; i < 5; i++) {
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

  return result;
}
/**
 * Check all diagonals on card for a win
 * Returns if winning diagonal is found
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 */
function checkDiagonals(card: Card, draws: Pool) {
  let result: number[] = [];
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      result = checkFallingDiagonal(card, draws, true);
    }
    if (i === 1) {
      result = checkRisingDiagonal(card, draws, true);
    }
    if (result.length > 0) break;
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
  for (let i = 0; i < 5; i++) {
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

  return result;
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
  const offset = [4, 3, 2, 1, 0];

  for (let i = 0; i < 5; i++) {
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

  return result;
}

/**
 * Find if current value exists in the search pool
 * @param value Array of number to be checked
 * @param search Array of search pool
 * @returns
 */
function findCommonElements(value: number[], search: number[]) {
  return search.some((item) => value.includes(item));
}
