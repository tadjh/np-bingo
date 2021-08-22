import { BINGO } from '../bingo';
import {
  createCard,
  createColumn,
  serializeCard,
  getBall,
  getPoolSize,
  removeBall,
  updateDraws,
} from '../bingo';

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

describe('create card', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('randomized card', () => {
    expect(createCard(BINGO)).toStrictEqual([
      15,
      30,
      45,
      60,
      75,
      14,
      29,
      44,
      59,
      74,
      13,
      28,
      43,
      58,
      73,
      12,
      27,
      42,
      57,
      72,
      11,
      26,
      41,
      56,
      71,
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
