import { Card, Results, Draws, Method } from '@np-bingo/types';
import { findElementInArray } from '.';

/**
 * Check if card is a winner and return the winning methods
 * @param card
 * @param draws
 * @returns Tuple of Results, Method[]
 */
export function validateCard(card: Card, draws: Draws): [Results, Method[]] {
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
export function checkCard(card: Card, draws: Draws): Results {
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
export function checkRows(card: Card, draws: Draws): number[] {
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
  draws: Draws,
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
export function checkColumns(card: Card, draws: Draws): number[] {
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
  draws: Draws,
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
export function checkDiagonals(card: Card, draws: Draws): number[] {
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
export function checkFallingDiagonal(card: Card, draws: Draws): number[] {
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
export function checkRisingDiagonal(card: Card, draws: Draws): number[] {
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
export function winningMethods(results: Results): Method[] {
  const keys = Object.keys(results) as Method[];
  return keys.filter((method) => {
    if (results[method].length <= 0) return undefined;
    return results[method];
  });
}

/**
 * Sets Winning crossmarks after successful card validations
 * @param results Results of validation check
 * @retuns Object of winning crossmarks
 */
export function winningCells(results: Results): { [key: string]: boolean } {
  const methods = winningMethods(results);
  let winningCrossmarks = {};
  for (let i = 0; i < methods.length; i++) {
    let marks = (results[methods[i]] as number[]).map(function (item) {
      let id = `cell-${item + 1}`;
      return { [id]: true };
    });
    winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
  }
  return winningCrossmarks;
}
