import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import CircularProgress from '../CircularProgress';
import Badge from '../Badge';

export interface BallProps extends Partial<BallType> {
  loop?: boolean;
  progress?: number;
  disabled?: boolean;
}

export default function Ball({
  number = 0,
  column = '',
  remainder = 75,
  loop = false,
  progress = 0,
  disabled = false,
}: BallProps) {
  function ballStyle(column: string): string {
    switch (column) {
      case '':
        return 'dark:from-gray-300 dark:via-gray-300 dark:to-gray-500';
      case 'b':
        return 'border-blue-bingo dark:from-blue-300 dark:via-blue-300 dark:to-blue-500';
      case 'i':
        return 'border-red-bingo dark:from-red-300 dark:via-red-300 dark:to-red-500';
      case 'n':
        return 'border-gray-400 dark:from-gray-300 dark:via-gray-300 dark:to-gray-500';
      case 'g':
        return 'border-green-bingo dark:from-green-300 dark:via-green-300 dark:to-green-500';
      case 'o':
        return 'border-orange-bingo dark:from-orange-300 dark:via-orange-300 dark:to-orange-500';
      case 'disabled':
        return 'opacity-50 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-400 shadow-none border-gray-400 bg-none';
      default:
        throw new Error('Error in Ball style');
    }
  }

  return (
    <div className="relative inline-flex">
      <div
        className={`relative z-10 font-mono font-bold text-black text-opacity-90 dark:text-opacity-90 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-300 dark:border-gray-800 w-20 h-20 flex justify-center items-center flex-col shadow-md text-center rounded-full border-4 ${
          !disabled ? ballStyle(column) : ballStyle('disabled')
        }`}
      >
        <Badge description="Balls Remaining" disabled={disabled}>
          {!disabled && remainder}
        </Badge>
        <div className="leading-4 uppercase">{column}</div>
        <div className="text-3xl leading-7">{number !== 0 && number}</div>
      </div>
      {loop && <CircularProgress className="absolute" progress={progress} />}
    </div>
  );
}
