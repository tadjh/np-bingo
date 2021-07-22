import React from 'react';
import { letters } from '../../Constants';

export interface LogoProps {
  home?: boolean;
  winner?: boolean;
}

export default function Logo({ home = false, winner }: LogoProps): JSX.Element {
  /**
   * Returns ball color or win (-1) colors
   * @param index
   * @returns string
   */
  function logoStyle(index: number): string {
    switch (index) {
      case -1:
        return 'bg-green-700';
      case 0:
        return 'bg-blue-700';
      case 1:
        return 'bg-red-700 animation-delay-300';
      case 2:
        return 'bg-gray-500 animation-delay-900';
      case 3:
        return 'bg-green-700 animation-delay-1200';
      case 4:
        return 'bg-orange-600 animation-delay-600';
      default:
        throw new Error('Error in Logo style');
    }
  }

  function logoStyleInner(index: number): string {
    switch (index) {
      case -1:
        return 'from-green-100 via-green-400 to-green-700';
      case 0:
        return 'from-blue-100 via-blue-400 to-blue-700';
      case 1:
        return 'from-red-100 via-red-400 to-red-700';
      case 2:
        return 'from-gray-100 via-gray-200 to-gray-500';
      case 3:
        return 'from-green-100 via-green-400 to-green-700';
      case 4:
        return 'from-orange-100 via-orange-300 to-orange-600';
      default:
        throw new Error('Error in Logo inner style');
    }
  }

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
            className={`relative flex justify-center items-center rounded-full select-none text-black text-opacity-90 font-sans font-bold uppercase text-center ${
              !winner ? logoStyle(index) : logoStyle(-1)
            } ${
              home
                ? 'h-20 w-20 shadow-md text-4xl animate-bounce'
                : 'h-14 w-14 text-3xl'
            }`}
          >
            <div className="w-full h-full absolute overflow-hidden rounded-full">
              <div
                className={`rounded-full filter blur-[6px] bg-gradient-radial w-[97%] h-[97%] ${
                  !winner ? logoStyleInner(index) : logoStyleInner(-1)
                }`}
              ></div>
            </div>
            <div className="relative z-10">{item}</div>
          </div>
        );
      })}
    </div>
  );
}
