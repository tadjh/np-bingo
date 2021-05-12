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
        return 'bg-green-700 dark:bg-green-600 dark:text-white';
      case 0:
        return 'bg-blue-bingo dark:bg-blue-300 dark:text-black';
      case 1:
        return 'bg-red-bingo dark:bg-red-300 dark:text-black';
      case 2:
        return 'bg-gray-400 dark:bg-gray-300 dark:text-black';
      case 3:
        return 'bg-green-bingo dark:bg-green-300 dark:text-black';
      case 4:
        return 'bg-orange-bingo dark:bg-orange-300 dark:text-black';
      default:
        throw new Error('Error in Logo style');
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
            className={`flex justify-center items-center rounded-full select-none text-white font-sans font-bold uppercase text-center ${
              !winner ? logoStyle(index) : logoStyle(-1)
            } ${home ? 'h-20 w-20 shadow-md text-4xl' : 'h-14 w-14 text-3xl'}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
