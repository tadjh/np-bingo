import { BINGO } from '../config/constants';
import {
  createCard,
  createColumn,
  serializeCard,
  getBall,
  getPoolSize,
  removeBall,
  validateCard,
  checkCard,
  checkRows,
  checkCellsInRow,
  checkColumns,
  checkCellsInColumn,
  checkDiagonals,
  checkFallingDiagonal,
  checkRisingDiagonal,
  winningMethods,
  winningCells,
  updateDraws,
} from './bingo';

const mockCard = [
  9, 24, 42, 55, 73, 5, 16, 35, 46, 70, 10, 29, 45, 54, 63, 6, 19, 43, 57, 62,
  7, 28, 41, 50, 72,
];

describe('create card', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('randomized card', () => {
    expect(createCard(BINGO)).toStrictEqual([
      15, 30, 45, 60, 75, 14, 29, 44, 59, 74, 13, 28, 43, 58, 73, 12, 27, 42,
      57, 72, 11, 26, 41, 56, 71,
    ]);
  });
});

describe('create column', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('creates column', () => {
    expect(
      createColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    ).toStrictEqual([15, 14, 13, 12, 11]);
  });
});

describe('serialize card', () => {
  it('turns card to string', () => {
    expect(serializeCard(mockCard)).toBe(
      'JwJgLGIKxQ7AzFAjANkWFsAMSsmFBvCksGIrCiLCABxhJRY1A==='
    );
  });
  it('handles empty card', () => {
    expect(serializeCard(new Array(25))).toBe('');
  });
});

describe('get random ball from pool', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  it('gets a ball', () => {
    expect(getBall([[1], [16], [31], [46], []])).toStrictEqual({
      column: 'b',
      key: 0,
      number: 1,
      remainder: 3,
    });
  });
  it('no ball returned', () => {
    expect(getBall([[], [], [], [], []])).toStrictEqual({
      column: '',
      key: 0,
      number: 0,
      remainder: 0,
    });
  });
});

describe('get pool size', () => {
  it('returns remainder and columns', () => {
    expect(getPoolSize([[1], [16], [31], [46], []])).toStrictEqual([
      4,
      [0, 1, 2, 3],
    ]);
  });
  it('returns empty', () => {
    expect(getPoolSize([[], [], [], [], []])).toStrictEqual([0, []]);
  });
});

describe('removes ball from pool', () => {
  it('removes ball', () => {
    expect(
      removeBall([[1], [16], [31], [46], [61]], {
        key: 0,
        number: 1,
        column: 'b',
        remainder: 5,
      })
    ).toStrictEqual([[], [16], [31], [46], [61]]);
  });
  it('no more balls', () => {
    expect(
      removeBall([[], [], [], [], []], {
        key: 0,
        number: 0,
        column: '',
        remainder: 0,
      })
    ).toStrictEqual([[], [], [], [], []]);
  });
});

describe('updates current draws', () => {
  it('adds ball', () => {
    expect(
      updateDraws([[1], [16], [31], [46], [61]], {
        key: 0,
        number: 2,
        column: 'b',
        remainder: 69,
      })
    ).toStrictEqual([[1, 2], [16], [31], [46], [61]]);
  });
});

describe('validate card', () => {
  it('winning card', () => {
    expect(validateCard(mockCard, [[9], [24], [42], [55], [73]])).toStrictEqual(
      [{ column: [], diagonal: [], row: [0, 1, 2, 3, 4] }, ['row']]
    );
  });
  it('losing card', () => {
    expect(validateCard(mockCard, [[], [], [], [], []])).toStrictEqual([
      { column: [], diagonal: [], row: [] },
      [],
    ]);
  });
});

describe('check card', () => {
  const results = { column: [], diagonal: [], row: [] };
  it('win by row', () => {
    expect(checkCard(mockCard, [[9], [24], [42], [55], [73]])).toStrictEqual({
      ...results,
      row: [0, 1, 2, 3, 4],
    });
  });
  it('win by column', () => {
    expect(
      checkCard(mockCard, [[9, 5, 10, 6, 7], [], [], [], []])
    ).toStrictEqual({
      ...results,
      column: [0, 5, 10, 15, 20],
    });
  });
  it('win by diagonal', () => {
    expect(checkCard(mockCard, [[9], [16], [45], [57], [72]])).toStrictEqual({
      ...results,
      diagonal: [0, 6, 12, 18, 24],
    });
  });
  it('is not a winner', () => {
    expect(checkCard(mockCard, [[], [], [], [], []])).toStrictEqual(results);
  });
});

describe('check rows', () => {
  it('winning draws for row 1', () => {
    expect(checkRows(mockCard, [[9], [24], [42], [55], [73]])).toStrictEqual([
      0, 1, 2, 3, 4,
    ]);
  });
  it('winning draws for row 3', () => {
    expect(checkRows(mockCard, [[10], [29], [], [54], [63]])).toStrictEqual([
      10, 11, 12, 13, 14,
    ]);
  });
  it('no winning rows', () => {
    expect(checkRows(mockCard, [[], [], [], [], []])).toStrictEqual([]);
  });
});

describe('check cells in row', () => {
  it('winning draws', () => {
    expect(
      checkCellsInRow(mockCard, [[9], [24], [42], [55], [73]])
    ).toStrictEqual([0, 1, 2, 3, 4]);
  });
  it('losing draws', () => {
    expect(
      checkCellsInRow(mockCard, [[9], [24], [42], [55], [75]])
    ).toStrictEqual([]);
  });
  it('handles offset', () => {
    expect(
      checkCellsInRow(mockCard, [[5], [16], [35], [46], [70]], {
        offset: 1,
      })
    ).toStrictEqual([5, 6, 7, 8, 9]);
  });
  it('handles offset while ignoring free spot', () => {
    expect(
      checkCellsInRow(mockCard, [[10], [29], [], [54], [63]], {
        offset: 2,
        flag: true,
      })
    ).toStrictEqual([10, 11, 12, 13, 14]);
  });
});

describe('check columns', () => {
  it('winning draws for column "B"', () => {
    expect(
      checkColumns(mockCard, [[9, 5, 10, 6, 7], [], [], [], []])
    ).toStrictEqual([0, 5, 10, 15, 20]);
  });
  it('winning draws for column "N"', () => {
    expect(
      checkColumns(mockCard, [[], [], [42, 35, 43, 41], [], []])
    ).toStrictEqual([2, 7, 12, 17, 22]);
  });
  it('no winning columns', () => {
    expect(checkColumns(mockCard, [[], [], [], [], []])).toStrictEqual([]);
  });
});

describe('check cells in column', () => {
  it('winning draws', () => {
    expect(
      checkCellsInColumn(mockCard, [[9, 5, 10, 6, 7], [], [], [], []])
    ).toStrictEqual([0, 5, 10, 15, 20]);
  });
  it('losing draws', () => {
    expect(
      checkCellsInColumn(mockCard, [[9, 5, 10, 6, 8], [], [], [], []])
    ).toStrictEqual([]);
  });
  it('handles offset', () => {
    expect(
      checkCellsInColumn(mockCard, [[], [24, 16, 29, 19, 28], [], [], []], {
        offset: 1,
      })
    ).toStrictEqual([1, 6, 11, 16, 21]);
  });
  it('handles offset while ignoring free spot', () => {
    expect(
      checkCellsInColumn(mockCard, [[], [], [42, 35, 43, 41], [], []], {
        offset: 2,
        flag: true,
      })
    ).toStrictEqual([2, 7, 12, 17, 22]);
  });
});

describe('check both diagonals', () => {
  it('winning falling diagonal', () => {
    expect(
      checkDiagonals(mockCard, [[9], [16], [45], [57], [72]])
    ).toStrictEqual([0, 6, 12, 18, 24]);
  });
  it('winning rising diagonal', () => {
    expect(
      checkRisingDiagonal(mockCard, [[7], [19], [45], [46], [73]])
    ).toStrictEqual([20, 16, 12, 8, 4]);
  });
  it('no winning diagonals', () => {
    expect(
      checkFallingDiagonal(mockCard, [[9], [16], [45], [57], [75]])
    ).toStrictEqual([]);
  });
});

describe('check falling diagonal', () => {
  it('winning draws', () => {
    expect(
      checkFallingDiagonal(mockCard, [[9], [16], [45], [57], [72]])
    ).toStrictEqual([0, 6, 12, 18, 24]);
  });
  it('losing draws', () => {
    expect(
      checkFallingDiagonal(mockCard, [[9], [16], [45], [57], [75]])
    ).toStrictEqual([]);
  });
  it('ignores free spot', () => {
    expect(
      checkFallingDiagonal(mockCard, [[9], [16], [], [57], [72]])
    ).toStrictEqual([0, 6, 12, 18, 24]);
  });
});

describe('check rising diagonal', () => {
  it('winning draws', () => {
    expect(
      checkRisingDiagonal(mockCard, [[7], [19], [45], [46], [73]])
    ).toStrictEqual([20, 16, 12, 8, 4]);
  });
  it('losing draws', () => {
    expect(
      checkRisingDiagonal(mockCard, [[7], [19], [45], [46], [75]])
    ).toStrictEqual([]);
  });
  it('ignores free spot', () => {
    expect(
      checkRisingDiagonal(mockCard, [[7], [19], [], [46], [73]])
    ).toStrictEqual([20, 16, 12, 8, 4]);
  });
});

describe('winning methods', () => {
  it('win by row', () => {
    expect(
      winningMethods({ column: [], diagonal: [], row: [0, 1, 2, 3, 4] })
    ).toStrictEqual(['row']);
  });
  it('win by column', () => {
    expect(
      winningMethods({ column: [0, 5, 10, 15, 20], diagonal: [], row: [] })
    ).toStrictEqual(['column']);
  });
  it('win by diagonal', () => {
    expect(
      winningMethods({ column: [], diagonal: [0, 6, 12, 18, 24], row: [] })
    ).toStrictEqual(['diagonal']);
  });
  it('win by multiple', () => {
    expect(
      winningMethods({
        row: [0, 1, 2, 3, 4],
        column: [0, 5, 10, 15, 20],
        diagonal: [0, 6, 12, 18, 24],
      })
    ).toStrictEqual(['row', 'column', 'diagonal']);
  });
  it('no winning methods', () => {
    expect(winningMethods({ column: [], diagonal: [], row: [] })).toStrictEqual(
      []
    );
  });
});

describe('winning cells', () => {
  it('cells based on winning results', () => {
    expect(
      winningCells({ column: [], diagonal: [], row: [0, 1, 2, 3, 4] })
    ).toStrictEqual({
      cell1: true,
      cell2: true,
      cell3: true,
      cell4: true,
      cell5: true,
    });
  });
  it('cells based on losing results', () => {
    expect(winningCells({ column: [], diagonal: [], row: [] })).toStrictEqual(
      {}
    );
  });
});
