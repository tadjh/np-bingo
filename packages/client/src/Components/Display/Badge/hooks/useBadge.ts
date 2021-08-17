import { BadgeColors } from '..';

export function useBadge(color: BadgeColors, disabled: boolean) {
  const style = (disabled && 'disabled') || color;

  function backgroundColor(): string {
    switch (style) {
      case 'disabled':
        return 'bg-gray-500 dark:bg-gray-600';
      case 'blue':
        return 'bg-blue-bingo hover:bg-blue-900 active:bg-blue-800';
      case 'gray':
        return 'bg-gray-700 hover:bg-gray-800 active:bg-gray-600';
      default:
        throw new Error('Error in Badge background color');
    }
  }
  return [backgroundColor];
}
