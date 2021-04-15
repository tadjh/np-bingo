import React from 'react';
import { letters } from '../../Constants';
import { Winner } from '@np-bingo/types';
import './style.css';

type Props = {
  home?: boolean;
  winner?: Winner;
};

function Logo(props: Props) {
  let { home, winner } = props;
  return (
    <div className={`grid-header ${home && 'logo'}`}>
      {letters.map((value, index) => {
        return (
          <div
            className={`grid-header-item grid-header-item-${index + 1} ${
              winner && winner.methods.length > 0 && 'winner'
            }`}
            key={index}
          >
            <div className={`${home && 'shadow'}`}>{value}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Logo;
