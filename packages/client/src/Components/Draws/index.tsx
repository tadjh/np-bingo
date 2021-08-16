import React from 'react';
import { letters } from '../../utils/bingo';
import { Pool } from '@np-bingo/types';

export interface DrawsProps {
  draws?: Pool;
  disabled?: boolean;
}

function DrawsListItem({
  children,
}: React.HTMLAttributes<HTMLLIElement>): JSX.Element {
  return (
    <li className="border-gray-300 dark:border-gray-500 border-b-2 px-1 last:border-0">
      {children}
    </li>
  );
}

function DrawsList({
  className = '',
  children,
}: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
  return (
    <ul
      className={`even:bg-gray-200 dark:even:bg-gray-700 border-gray-300 dark:border-gray-500 border-r-2 last:border-0 ${className}`}
    >
      {children}
    </ul>
  );
}

export default function Draws({
  draws = [[], [], [], [], []],
  disabled,
}: DrawsProps): JSX.Element {
  /**
   * Generates an array of react elements
   * @param array
   * @param element
   * @returns React Element Array
   */
  function generate(
    array: number[],
    element: React.ReactElement
  ): React.ReactElement[] {
    return array.map((item, index) =>
      React.cloneElement(element, {
        key: `ball${index + 1}`,
        children: '\xa0\xa0\xa0',
      })
    );
  }

  const initColumn = generate(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    <DrawsListItem />
  );

  function makeTable(): JSX.Element[] {
    let table = [];
    for (let i = 0; i < draws.length; i++) {
      const emptyColumn = [...initColumn];
      const fullColumn = populateColumn(emptyColumn, i);
      table[i] = populateTable(fullColumn, i);
    }
    return table;
  }

  /**
   * Fills empty column Array with data from Draws
   * @param columnArray
   * @param column
   * @returns
   */
  function populateColumn(
    columnArray: React.ReactElement[],
    column: number
  ): React.ReactElement[] {
    for (let j = 0; j < draws[column].length; j++) {
      columnArray[j] = (
        <DrawsListItem
          key={`ball${j + 1}`}
        >{`${letters[column]}${draws[column][j]}`}</DrawsListItem>
      );
    }
    return columnArray;
  }

  /**
   * Wraps list elements array with a Ul element
   * @param columnArray
   * @param column
   * @returns
   */
  function populateTable(
    columnArray: React.ReactElement[],
    column: number
  ): JSX.Element {
    return (
      <DrawsList
        key={`column${column + 1}`}
        className={disabled ? columnStyle(-1) : columnStyle(column)}
      >
        {columnArray}
      </DrawsList>
    );
  }

  /**
   * Return style based on column number and disabled state (-1)
   * @param column
   * @returns
   */
  function columnStyle(column: number): string {
    switch (column) {
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

  const table = makeTable();

  return (
    <div className="shadow-xl grid grid-cols-5 rounded-xl font-mono font-bold uppercase text-sm bg-gray-100 dark:bg-gray-800 border-gray-400 border-4 dark:border-gray-800">
      {table}
    </div>
  );
}
