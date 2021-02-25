import React from 'react';
import Cell from './Cell';
type Props = {
  board: (number | string)[];
  winner: boolean | undefined;
  crossmarks: { [key: string]: boolean };
  toggleCrossmark: (event: React.MouseEvent) => void;
};

function Board(props: Props) {
  let { board, winner, crossmarks, toggleCrossmark } = props;
  return (
    <div className="grid-container">
      <div className={`grid ${winner && 'winner'}`}>
        {board.map((value, index) => {
          if (index < 5) {
            return (
              <div className={`grid-header ${winner && 'winner'}`} key={index}>
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
    </div>
  );
}

export default Board;
