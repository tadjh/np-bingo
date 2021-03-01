import React from 'react';
import { Winner } from '../../Constants/types';
import Cell from '../Cell';
import './style.css';

type Props = {
  board: (number | string)[];
  serial: string;
  winner: Winner;
  crossmarks: { [key: string]: boolean };
  toggleCrossmark: (event: React.MouseEvent) => void;
};

function Board(props: Props) {
  let { board, serial, winner, crossmarks, toggleCrossmark } = props;
  return (
    <div className="grid-container">
      <div className={`grid ${winner.methods.length > 0 && 'winner'}`}>
        {board.map((value, index) => {
          if (index < 5) {
            return (
              <div
                className={`grid-header grid-header-${index + 1} ${
                  winner.methods.length > 0 && 'winner'
                }`}
                key={index}
              >
                {value}
              </div>
            );
          }
          let id = `cell${index - 4}`;
          return (
            <Cell
              id={id}
              className={`grid-item-${index - 4}`}
              key={index}
              crossmark={crossmarks[id]}
              onClick={toggleCrossmark}
            >
              {index !== 12 + 5 ? value : 'free'}
            </Cell>
          );
        })}
      </div>
      <div className="serial">{serial}</div>
    </div>
  );
}

export default Board;
