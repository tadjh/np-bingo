import React from 'react';
import { letters } from '../../Constants';
import { Pool } from '@np-bingo/types';
import './style.css';

export interface DrawsProps {
  draws?: Pool;
  disabled?: boolean;
}

export default function Draws({
  draws = [[], [], [], [], []],
  disabled,
}: DrawsProps): JSX.Element {
  let table = [];
  function generate(array: number[], element: React.ReactElement) {
    return array.map((item, index) =>
      React.cloneElement(element, {
        key: `ball${index + 1}`,
      })
    );
  }

  const itemsInit = generate(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    <li className="border-gray-300 dark:border-gray-500 border-b-2 px-1 last:border-0">
      &nbsp;&nbsp;&nbsp;
    </li>
  );

  for (let i = 0; i < draws.length; i++) {
    const letter = letters[i];
    const items = [...itemsInit];
    for (let j = 0; j < draws[i].length; j++) {
      items[j] = (
        <li
          className="border-gray-300 dark:border-gray-500 border-b-2 px-1 last:border-0"
          key={`ball${j + 1}`}
        >{`${letter}${draws[i][j]}`}</li>
      );
    }
    table[i] = (
      <ul
        key={`column${i + 1}`}
        className={[
          'even:bg-gray-200 dark:even:bg-gray-700 border-gray-300 dark:border-gray-500 border-r-2 last:border-0',
          `draws-column draws-column-${i + 1}`,
          disabled && 'disabled',
        ].join(' ')}
      >
        {items}
      </ul>
    );
  }
  return (
    <div className="shadow-xl grid grid-cols-5 rounded-xl font-mono font-bold uppercase text-sm bg-gray-100 dark:bg-gray-800 border-gray-400 border-4 dark:border-gray-800">
      {table}
    </div>
  );
}
