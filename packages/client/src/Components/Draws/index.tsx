import React from 'react';
import { letters } from '../../utils/bingo';
import { Pool } from '@np-bingo/types';
import generate from '../../utils/generate';

export interface DrawsProps {
  draws?: Pool;
  disabled?: boolean;
}

export default function Draws({
  draws = [[], [], [], [], []],
  disabled,
}: DrawsProps): JSX.Element {
  const blankColumn = generate(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    <DrawsItem />,
    'ball',
    '\xa0\xa0\xa0'
  );
  return (
    <div className="shadow-xl grid grid-cols-5 rounded-xl font-mono font-bold uppercase text-sm bg-gray-100 dark:bg-gray-800 border-gray-400 border-4 dark:border-gray-800">
      {draws.map((column, columnIndex) => (
        <DrawsColumn
          key={`column-${columnIndex + 1}`}
          columnIndex={columnIndex}
          disabled={disabled}
        >
          {blankColumn.map((item, itemIndex) => (
            <DrawsItem {...item.key}>
              {`${letters[columnIndex]}${column[itemIndex]}`}
            </DrawsItem>
          ))}
        </DrawsColumn>
      ))}
    </div>
  );
}

export interface DrawsColumnProps
  extends React.HTMLAttributes<HTMLUListElement> {
  columnIndex: number;
  disabled?: boolean;
}

function DrawsColumn({
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

function DrawsItem({
  children,
}: React.HTMLAttributes<HTMLLIElement>): JSX.Element {
  return (
    <li className="border-gray-300 dark:border-gray-500 border-b-2 px-1 last:border-0">
      {children}
    </li>
  );
}
