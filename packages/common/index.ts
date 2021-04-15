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

export const roomPattern = '[A-Z1-9][^IO0]+?';
export const roomRegex = new RegExp(roomPattern, 'g');
