import React from 'react';
import { Room } from '@np-bingo/types';

export interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
  room?: Room;
}

export default function Code({ room = '', children }: CodeProps): JSX.Element {
  function generate(array: string[], element: React.ReactElement) {
    return array.map((item, index) =>
      React.cloneElement(element, {
        key: index,
        children: item,
      })
    );
  }

  return (
    <React.Fragment>
      <div className="text-xs text-center dark:text-white dark:text-opacity-60">
        Room Code:
      </div>
      <div className="flex font-mono text-3xl font-bold space-x-2 text-gray-900 dark:text-white dark:text-opacity-90">
        {generate(
          room !== '' ? Object.assign([], room) : [' ', ' ', ' ', ' '],
          <div className="flex justify-center items-center bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner" />
        )}
      </div>
    </React.Fragment>
  );
}
