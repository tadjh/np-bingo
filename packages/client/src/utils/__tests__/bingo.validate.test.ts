import {
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
} from '../bingo.validate';

const mockCard = [
  9,
  24,
  42,
  55,
  73,
  5,
  16,
  35,
  46,
  70,
  10,
  29,
  45,
  54,
  63,
  6,
  19,
  43,
  57,
  62,
  7,
  28,
  41,
  50,
  72,
];

describe('validate card', () => {
  it('winning card', () => {
    expect(
      validateCard(mockCard, [[9], [24], [42], [55], [73]])
    ).toStrictEqual([
      { column: [], diagonal: [], row: [0, 1, 2, 3, 4] },
      ['row'],
    ]);
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
      0,
      1,
      2,
      3,
      4,
    ]);
  });
  it('winning draws for row 3', () => {
    expect(checkRows(mockCard, [[10], [29], [], [54], [63]])).toStrictEqual([
      10,
      11,
      12,
      13,
      14,
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

// describe('winning cells', () => {
//   it('cells based on winning results', () => {
//     expect(
//       winningCells({ column: [], diagonal: [], row: [0, 1, 2, 3, 4] })
//     ).toStrictEqual({
//       cell1: true,
//       cell2: true,
//       cell3: true,
//       cell4: true,
//       cell5: true,
//     });
//   });
//   it('cells based on losing results', () => {
//     expect(winningCells({ column: [], diagonal: [], row: [] })).toStrictEqual(
//       {}
//     );
//   });
// });
