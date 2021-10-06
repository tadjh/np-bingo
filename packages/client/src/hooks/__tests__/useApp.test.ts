import { renderHook, act } from '@testing-library/react-hooks';
import { initialPlayer } from '../../context';
import { BINGO } from '../../utils/bingo';
import { useApp } from '../useApp';

describe('new ball', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should return new ball', () => {
    const mockPool = [[1], [16], [31], [46], []];
    const mockDraws = [
      [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    ];

    const { result } = renderHook(() => useApp(mockPool, mockDraws));

    act(() => {
      result.current.newBall();
    });

    expect(result.current.newBall().ball).toStrictEqual({
      column: 'b',
      key: 0,
      number: 1,
      remainder: 3,
    });
    expect(result.current.newBall().draws[0]).toContain(1);
    expect(result.current.newBall().pool).toStrictEqual([
      [],
      [16],
      [31],
      [46],
      [],
    ]);
  });

  it('should return no more balls', () => {
    const mockPool = [[], [], [], [], []];
    const mockDraws = BINGO;
    const { result } = renderHook(() => useApp(mockPool, mockDraws));

    act(() => {
      result.current.newBall();
    });

    expect(result.current.newBall().ball).toStrictEqual({
      column: '',
      key: 0,
      number: 0,
      remainder: 0,
    });
    expect(result.current.newBall().draws).toStrictEqual([]);
    expect(result.current.newBall().pool).toStrictEqual([]);
  });
});

describe('check card', () => {
  const mockCard = [
    9, 24, 42, 55, 73, 5, 16, 35, 46, 70, 10, 29, 45, 54, 63, 6, 19, 43, 57, 62,
    7, 28, 41, 50, 72,
  ];

  it('check card success', () => {
    const playerCard = { card: mockCard, owner: initialPlayer };
    const mockPool = [[], [], [], [], []];
    const mockDraws = BINGO;
    const { result } = renderHook(() => useApp(mockPool, mockDraws));

    act(() => {
      result.current.checkCard(playerCard);
    });

    expect(result.current.checkCard(playerCard)).not.toBe(null);
    expect(result.current.checkCard(playerCard)?.methods).toStrictEqual([
      'row',
      'column',
      'diagonal',
    ]);
    expect(result.current.checkCard(playerCard)?.results).toStrictEqual({
      column: [0, 5, 10, 15, 20],
      diagonal: [0, 6, 12, 18, 24, 20, 16, 12, 8, 4],
      row: [0, 1, 2, 3, 4],
    });
    expect(result.current.checkCard(playerCard)?.player).toStrictEqual(
      playerCard.owner
    );
    expect(result.current.checkCard(playerCard)?.card).toStrictEqual(mockCard);
  });

  it('check card failure', () => {
    const playerCard = { card: mockCard, owner: initialPlayer };
    const mockPool = BINGO;
    const mockDraws = [[], [], [], [], []];

    const { result } = renderHook(() => useApp(mockPool, mockDraws));

    act(() => {
      result.current.checkCard(playerCard);
    });

    expect(result.current.checkCard(playerCard)).toBeNull();
  });
});
