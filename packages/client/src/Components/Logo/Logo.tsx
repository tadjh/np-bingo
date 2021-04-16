import React from 'react';
import { letters } from '../../Constants';
import './style.css';

export interface LogoProps {
  home?: boolean;
  winner?: boolean;
}

export default function Logo({ home = false, winner }: LogoProps) {
  return (
    <div className={['grid-header', home && 'logo'].join(' ')}>
      {letters.map((value, index) => {
        return (
          <div
            key={index}
            className={[
              'grid-header-item',
              `grid-header-item-${index + 1}`,
              winner && 'winner',
            ].join(' ')}
          >
            <div className={`${home && 'shadow'}`}>{value}</div>
          </div>
        );
      })}
    </div>
  );
}
