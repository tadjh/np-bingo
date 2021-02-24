export type Ball = { key: number; value: number };
export type Card = number[];
export type Pool = number[][];
export type Results = {
  [key: string]: number[] | boolean;
};

const _B = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const _I = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const _N = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const _G = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const _O = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
export const BINGO: Pool = [_B, _I, _N, _G, _O];
export const letters = ['b', 'i', 'n', 'g', 'o'];

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

  // Remove 13th value and replace with a free spot
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
 * Takes the entire set of remaining balls and returns a random ball
 * @param pool
 */
export function getBall(pool: Pool): Ball | undefined {
  // Array of remaining columns
  let columns = [];

  let i;
  for (i = 0; i < 5; i++) {
    if (pool[i].length > 0) {
      columns.push(i);
    }
  }

  if (columns.length > 0) {
    let columnIndex = randomIndex(columns);
    let values = pool[columns[columnIndex]];
    let valueIndex = randomIndex(values);

    return { key: columns[columnIndex], value: values[valueIndex] };
  }
  return undefined;
}

/**
 * Takes an array and returns a random index position
 * @param array integer array
 */
export function randomIndex(array: (number | string)[]) {
  return Math.floor(Math.random() * array.length);
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
        return element !== ball.value;
      });
    }
    return item;
  });
}

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

  console.log(results);

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
  if (result) {
    return result;
  } else {
    return false;
  }
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
  let result: number[] | boolean = [];
  let i;
  for (i = 0; i < 5; i++) {
    if (flag && i === 2) {
      result.push(offset * 5 + i);
      continue;
    }
    let check = findCommonElements([card[offset * 5 + i]], draws[i]);

    // if comparison fails reset result array, otherwise push successful index
    if (!check) {
      result = [];
      break;
    } else {
      result.push(offset * 5 + i);
    }
    continue;
  }
  if (result.length === 0) {
    result = false;
  }
  return result;
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
  if (result) {
    return result;
  } else {
    return false;
  }
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
  let result: number[] | boolean = [];
  let i;
  for (i = 0; i < 5; i++) {
    if (flag && i === 2) {
      result.push(i * 5 + offset);
      continue;
    }
    let check = findCommonElements([card[i * 5 + offset]], draws[offset]);

    // if comparison fails reset result array, otherwise push successful index
    if (!check) {
      result = [];
      break;
    } else {
      result.push(i * 5 + offset);
    }
    continue;
  }
  if (result.length === 0) {
    result = false;
  }
  return result;
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
  if (result) {
    return result;
  } else {
    return false;
  }
}

/**
 * Check each cell on the falling diagonal on card for a win
 * Returns true if the falling diagonal contains only winning cells
 * @param card Current card to be checked
 * @param draws Pool of currently drawn Bingo balls
 * @param flag Flag for free spot
 */
function checkFallingDiagonal(card: Card, draws: Pool, flag?: boolean) {
  let result: number[] | boolean = [];
  let i;
  for (i = 0; i < 5; i++) {
    if (flag && i === 2) {
      result.push(i * 6);
      continue;
    }
    let check = findCommonElements([card[i * 6]], draws[i]);

    // if comparison fails reset result array, otherwise push successful index
    if (!check) {
      result = [];
      break;
    } else {
      result.push(i * 6);
    }
    continue;
  }
  if (result.length === 0) {
    result = false;
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
  let result: number[] | boolean = [];
  let i;
  // Too tired to figure out an algorithim for this one
  // card[5 * 4 + 0 ] draw[0]
  // card[5 * 3 + 1 ] draw[1]
  // card[5 * 2 + 2 ] draw[2]
  // card[5 * 1 + 3 ] draw[3]
  // card[5 * 0 + 4 ] draw[4]

  const offset = [4, 3, 2, 1, 0];

  for (i = 0; i < 5; i++) {
    if (flag && i === 2) {
      result.push(offset[i] * 5 + i);
      continue;
    }
    let check = findCommonElements([card[offset[i] * 5 + i]], draws[i]);
    // if comparison fails reset result array, otherwise push successful index
    if (!check) {
      result = [];
      break;
    } else {
      result.push(offset[i] * 5 + i);
    }
    continue;
  }
  if (result.length === 0) {
    result = false;
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
