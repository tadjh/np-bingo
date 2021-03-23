export function makeID(length: number) {
  let i;
  let result = '';
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  for (i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
