import { findElementInArray } from '..';

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

describe('array comparison', () => {
  it('finds common element', () => {
    expect(findElementInArray(mockCard[0], [1, 7, 9])).toBe(true);
  });
  it('no common element', () => {
    expect(findElementInArray(mockCard[0], [2, 4, 6])).toBe(false);
  });
});
