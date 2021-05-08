import React from 'react';
import { letters } from '../../Constants';
import './style.css';

export interface LogoProps {
  home?: boolean;
  winner?: boolean;
}

export default function Logo({ home = false, winner }: LogoProps): JSX.Element {
  return (
    <div
      className={[
        'flex',
        home ? '-space-x-4 justify-center' : 'justify-around',
      ].join(' ')}
    >
      {letters.map((item, index) => {
        return (
          <div
            key={index}
            className={[
              'flex justify-center items-center rounded-full select-none text-white font-sans font-bold uppercase text-center',
              `logo-item logo-item-${index + 1}`,
              winner ? 'winner dark:text-white' : 'dark:text-black',
              home ? 'h-20 w-20 shadow-md text-4xl' : 'h-14 w-14 text-3xl',
            ].join(' ')}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
