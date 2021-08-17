import { Column } from '@np-bingo/types';

export function useBall(column: Column, disabled: boolean) {
  const ballColumn = (disabled && 'disabled') || column;

  /**
   *
   * @param column
   * @returns string
   */
  function background(): string {
    switch (ballColumn) {
      case '':
        return 'bg-gray-500';
      case 'b':
        return 'bg-blue-700';
      case 'i':
        return 'bg-red-700';
      case 'n':
        return 'bg-gray-500';
      case 'g':
        return 'bg-green-700';
      case 'o':
        return 'bg-orange-600';
      case 'disabled':
        return 'opacity-50 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-400 shadow-none border-gray-400 bg-none';
      default:
        throw new Error('Error in Ball style');
    }
  }

  /**
   * Inner ball styles
   * @param column
   * @returns string
   */
  function gradient(): string {
    switch (ballColumn) {
      case '':
        return 'from-gray-100 via-gray-200 dark:to-gray-500';
      case 'b':
        return 'from-blue-100 via-blue-400 to-blue-700';
      case 'i':
        return 'from-red-100 via-red-400 to-red-700';
      case 'n':
        return 'from-gray-100 via-gray-200 to-gray-500';
      case 'g':
        return 'from-green-100 via-green-400 to-green-700';
      case 'o':
        return 'from-orange-100 via-orange-300 to-orange-600';
      case 'disabled':
        return 'opacity-0 bg-none';
      default:
        throw new Error('Error in Ball inner style');
    }
  }

  return [background, gradient];
}
