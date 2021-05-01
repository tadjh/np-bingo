import React from 'react';
import { Card } from '@np-bingo/types';
import Cell from '../Cell';
import Logo from '../Logo';
import './style.css';
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
    <div className="grid-container">
      <div className={['grid', 'shadow', winner && 'winner'].join(' ')}>
        <div className="grid-header">
          <Logo winner={winner} />
        </div>
        {card.map((value, index) => {
          let id = `cell${index + 1}`;
          return (
            <Cell
              id={id}
              className={[winner && 'winner'].join('')}
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
        <div className="serial">{serial}</div>
      </div>
    </div>
  );
}
