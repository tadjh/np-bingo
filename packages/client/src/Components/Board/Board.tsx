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
  crossmarks = { ...initialState.crossmarks },
  winner = false,
  ...props
}: BoardProps) {
  return (
    <div className="grid-container">
      <div className={['grid', 'shadow', winner && 'winner'].join(' ')}>
        <Logo winner={winner} />
        {card.map((value, index) => {
          let id = `cell${index + 1}`;
          return (
            <Cell
              id={id}
              className={[winner && 'winner'].join('')}
              key={index}
              index={index + 1}
              checked={crossmarks[id]}
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
