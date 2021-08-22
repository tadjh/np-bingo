import React from 'react';

export interface DrawsColumnProps
  extends React.HTMLAttributes<HTMLUListElement> {
  columnIndex: number;
  disabled?: boolean;
}

export default function DrawsColumn({
  columnIndex,
  disabled = false,
  className = '',
  children,
}: DrawsColumnProps): JSX.Element {
  /**
   * Return style based on column number and disabled state (-1)
   * @param columnIndex
   * @returns
   */
  function columnStyle(columnIndex: number): string {
    switch (columnIndex) {
      case -1:
        return 'text-gray-400 dark:text-gray-300';
      case 0:
        return 'text-blue-bingo dark:text-blue-300';
      case 1:
        return 'text-red-bingo dark:text-red-300';
      case 2:
        return 'text-gray-400 dark:text-gray-300';
      case 3:
        return 'text-green-bingo dark:text-green-300';
      case 4:
        return 'text-orange-bingo dark:text-orange-300';
      default:
        throw new Error('Error in Draws column style');
    }
  }

  return (
    <ul
      className={`even:bg-gray-200 dark:even:bg-gray-700 border-gray-300 dark:border-gray-500 border-r-2 last:border-0 ${
        disabled ? columnStyle(-1) : columnStyle(columnIndex)
      } ${className}`}
    >
      {children}
    </ul>
  );
}
