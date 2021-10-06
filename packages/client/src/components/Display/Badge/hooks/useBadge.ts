import { BadgeColors } from '..';

export function useBadge(
  color: BadgeColors,
  currentOffset: number,
  disabled: boolean
) {
  const style = (disabled && 'disabled') || color;

  function backgroundColor(): string {
    switch (style) {
      case 'disabled':
        return 'bg-gray-500 dark:bg-gray-600 text-white';
      case 'blue':
        return 'bg-blue-bingo hover:bg-blue-900 active:bg-blue-800 text-white';
      case 'gray':
        return 'bg-gray-700 hover:bg-gray-800 active:bg-gray-600 text-white';
      case 'gradient':
        return 'bg-gradient-linear bg-oversized text-white';
      case 'stepped':
        if (offset < 42)
          return 'bg-green-600 hover:bg-green-700 active:bg-green-500 text-white';
        if (offset < 69)
          return 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-500 text-black';
        return 'bg-red-600 hover:bg-red-700 active:bg-red-500 text-white';
      default:
        throw new Error('Error in Badge background color');
    }
  }

  const offset = (disabled && -1) || currentOffset;

  const alert = () => {
    if (offset <= 0) return '';
    if (offset < 42)
      return 'bg-green-500 hover:bg-green-600 active:bg-green-400 text-white';
    if (offset < 69)
      return 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-400 text-black';
    return 'bg-red-500 hover:bg-red-600 active:bg-red-400 text-white';
  };

  return [backgroundColor, alert];
}
