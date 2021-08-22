import React from 'react';
import { Pool } from '@np-bingo/types';
import { letters } from '../../../../../../utils/bingo';
import generate from '../../../../../../utils/generate';
import DrawsColumn from '../DrawsColumn';
import DrawsItem from '../DrawsItem';

export interface DrawsProps {
  draws?: Pool;
  disabled?: boolean;
}

export function Draws({
  draws = [[], [], [], [], []],
  disabled,
}: DrawsProps): JSX.Element {
  const blankColumn = generate(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    <DrawsItem />
  );
  return (
    <div className="shadow-xl grid grid-cols-5 rounded-xl font-mono font-bold uppercase text-sm bg-gray-100 dark:bg-gray-800 border-gray-400 border-4 dark:border-gray-800">
      {draws.map((column, columnIndex) => (
        <DrawsColumn
          key={`column-${columnIndex + 1}`}
          columnIndex={columnIndex}
          disabled={disabled}
        >
          {blankColumn.map((item, itemIndex) => {
            let ballNumber = itemIndex + 1 + itemIndex * 4 + columnIndex;
            return column[itemIndex] ? (
              <DrawsItem key={`ball-${ballNumber}`}>
                {`${letters[columnIndex]}${column[itemIndex]}`}
              </DrawsItem>
            ) : (
              <DrawsItem key={`ball-${ballNumber}`}>{'\xa0\xa0\xa0'}</DrawsItem>
            );
          })}
        </DrawsColumn>
      ))}
    </div>
  );
}
