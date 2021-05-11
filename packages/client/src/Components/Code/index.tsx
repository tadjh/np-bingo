import React from 'react';
import { Room } from '@np-bingo/types';
import Tooltip from '../Tooltip';

export interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
  room?: Room;
  isHovered?: boolean;
}

export default function Code({
  room = '',
  isHovered = false,
  children,
}: CodeProps): JSX.Element {
  function generate(array: string[], element: React.ReactElement) {
    return array.map((item, index) =>
      React.cloneElement(element, {
        key: index,
        children: item,
      })
    );
  }

  return (
    <div className="relative tooltip">
      <Tooltip isHovered={isHovered} direction="top">
        Room Code
      </Tooltip>
      <div className="flex font-mono text-3xl font-bold space-x-2 text-black dark:text-white text-opacity-60 hover:text-opacity-90 dark:text-opacity-60 dark:hover:text-opacity-90">
        {generate(
          room !== '' ? Object.assign([], room) : [' ', ' ', ' ', ' '],
          <div className="flex justify-center items-center bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner" />
        )}
      </div>
    </div>
  );
}
