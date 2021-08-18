import React from 'react';
import { letters } from '../../utils/bingo';
import { useLogo } from './useLogo';

export interface LogoProps {
  home?: boolean;
  winner?: boolean;
}

export default function Logo({ home = false, winner }: LogoProps): JSX.Element {
  const [logoStyle, logoStyleInner] = useLogo();
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
              'relative flex justify-center items-center rounded-full select-none text-black text-opacity-90 font-sans font-bold uppercase text-center',
              !winner ? logoStyle(index) : logoStyle(-1),
              home
                ? 'h-[75px] w-[75px] shadow-md text-4xl animate-bounce'
                : 'h-[50px] w-[50px] text-3xl',
            ].join(' ')}
          >
            <div className="w-full h-full absolute overflow-hidden rounded-full">
              <div
                className={[
                  'rounded-full filter blur-[6px] bg-gradient-radial w-[97%] h-[97%]',
                  !winner ? logoStyleInner(index) : logoStyleInner(-1),
                ].join(' ')}
              ></div>
            </div>
            <div className="relative z-10">{item}</div>
          </div>
        );
      })}
    </div>
  );
}
