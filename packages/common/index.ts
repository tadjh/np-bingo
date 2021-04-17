/**
 * Creates an id
 * @param length String length of id
 * @returns
 */
export function makeID(length: number) {
  let i;
  let result = '';
  // exclude: I, O, 0
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  for (i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const roomChar = '[A-HJ-NP-Z1-9]';
export const roomPattern = `${roomChar}{4}`;
export const roomRegex = new RegExp(roomPattern);
