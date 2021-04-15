import React from 'react';
import { Card, Winner } from '@np-bingo/types';
import Cell from '../Cell';
import Logo from '../Logo';
import './style.css';

type Props = {
  board: Card;
  serial: string;
  winner: Winner;
  crossmarks: { [key: string]: boolean };
  toggleCrossmark: (event: React.MouseEvent) => void;
};

function Board(props: Props) {
  let { board, serial, winner, crossmarks, toggleCrossmark } = props;
  return (
    <div className="grid-container">
      <div className={`grid shadow ${winner.methods.length > 0 && 'winner'}`}>
        <Logo winner={winner} />
        {board.map((value, index) => {
          let id = `cell${index + 1}`;
          return (
            <Cell
              id={id}
              className={`grid-item-${index + 1}`}
              key={index}
              crossmark={crossmarks[id]}
              onClick={toggleCrossmark}
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

export default Board;
