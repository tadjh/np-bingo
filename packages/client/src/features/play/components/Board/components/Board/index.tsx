import React from 'react';
import clsx from 'clsx';
import { Card } from '@np-bingo/types';
import Cell from '../Cell';
import Logo from '../../../../../../components/Logo';
import { initialPlayState } from '../../../../../../reducers/play.reducer';

export interface BoardProps {
  card: Card;
  serial: string;
  crossmarks: { [key: string]: boolean };
  winner: boolean;
}

export function Board({
  card = [...initialPlayState.card],
  serial = '',
  crossmarks = {},
  winner = false,
}: BoardProps) {
  return (
    <div
      className={clsx(
        'space-y-2 border-8 rounded-xl shadow-md overflow-hidden',
        winner
          ? 'bg-green-600 border-green-600'
          : ' bg-gray-900 dark:bg-gray-800 border-gray-900 dark:border-gray-800'
      )}
    >
      <div
        className={clsx(
          'p-1 bg-gray-100',
          winner ? 'dark:bg-gray-700' : 'dark:bg-gray-800'
        )}
      >
        <Logo winner={winner} />
      </div>
      <div className="grid grid-cols-5">
        {card.map((value, index) => {
          let cellId = index + 1;
          let id = `cell-${cellId}`;
          return (
            <Cell
              index={cellId}
              winner={winner}
              key={id}
              override={winner ? crossmarks[id] || false : undefined}
            >
              {cellId !== 13 ? value : 'free'}
            </Cell>
          );
        })}
      </div>
      <div
        className={clsx(
          'h-3 text-white dark:text-opacity-90 text-[6.5px] text-center font-bold align-middle',
          winner ? 'bg-green-600' : 'bg-gray-900 dark:bg-gray-800'
        )}
      >
        {serial}
      </div>
    </div>
  );
}
