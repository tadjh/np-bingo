import React from 'react';
import { Card } from '@np-bingo/types';
import Cell from '../Cell';
import Logo from '../Logo';
import { initialState } from '../../Reducers/play.reducer';

export interface BoardProps {
  card: Card;
  serial: string;
  crossmarks: { [key: string]: boolean };
  winner: boolean;
  onClick: (event: React.MouseEvent) => void;
}

export default function Board({
  card = [...initialState.card],
  serial = '',
  crossmarks = {},
  winner = false,
  ...props
}: BoardProps) {
  return (
    <div
      className={[
        'space-y-2 border-8 rounded-xl shadow-md overflow-hidden',
        winner
          ? 'bg-green-600 border-green-600'
          : ' bg-gray-900 dark:bg-gray-800 border-gray-900 dark:border-gray-800',
      ].join(' ')}
    >
      <div
        className={[
          'py-2 px-1 bg-gray-100',
          winner ? 'dark:bg-gray-700' : 'dark:bg-gray-800',
        ].join(' ')}
      >
        <Logo winner={winner} />
      </div>
      <div className="grid grid-cols-5">
        {card.map((value, index) => {
          let id = `cell${index + 1}`;
          return (
            <Cell
              id={id}
              winner={winner}
              key={id}
              index={index + 1}
              checked={winner ? crossmarks[id] || false : undefined}
              {...props}
              disabled={winner}
            >
              {index !== 12 ? value : 'free'}
            </Cell>
          );
        })}
      </div>
      <div
        className={[
          'h-3 text-white dark:text-opacity-90 text-xxs text-center font-bold align-middle',
          winner ? 'bg-green-600' : 'bg-gray-900 dark:bg-gray-800',
        ].join(' ')}
      >
        {serial}
      </div>
    </div>
  );
}
