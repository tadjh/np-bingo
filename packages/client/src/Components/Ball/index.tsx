import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import CircularProgress from '../Feedback/CircularProgress';
import Badge from '../Data/Badge';

export interface BallProps extends Partial<BallType> {
  inProgress?: boolean;
  progress?: number;
  disabled?: boolean;
}

export default function Ball({
  number = 0,
  column = '',
  remainder = 75,
  inProgress = false,
  progress = 0,
  disabled = false,
}: BallProps) {
  function ballStyle(column: string): string {
    switch (column) {
      case '':
        return 'bg-gray-500';
      case 'b':
        return 'bg-blue-700';
      case 'i':
        return 'bg-red-700';
      case 'n':
        return 'bg-gray-500';
      case 'g':
        return 'bg-green-700';
      case 'o':
        return 'bg-orange-600';
      case 'disabled':
        return 'opacity-50 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-400 shadow-none border-gray-400 bg-none';
      default:
        throw new Error('Error in Ball style');
    }
  }

  function ballStyleInner(column: string): string {
    switch (column) {
      case '':
        return 'from-gray-100 via-gray-200 dark:to-gray-500';
      case 'b':
        return 'from-blue-100 via-blue-400 to-blue-700';
      case 'i':
        return 'from-red-100 via-red-400 to-red-700';
      case 'n':
        return 'from-gray-100 via-gray-200 to-gray-500';
      case 'g':
        return 'from-green-100 via-green-400 to-green-700';
      case 'o':
        return 'from-orange-100 via-orange-300 to-orange-600';
      case 'disabled':
        return 'opacity-0 bg-none';
      default:
        throw new Error('Error in Ball inner style');
    }
  }

  return (
    <div className="relative inline-flex">
      <div
        className={`relative z-10 font-mono font-bold text-black text-opacity-90 dark:text-opacity-90 w-20 h-20 flex justify-center items-center flex-col shadow-lg text-center rounded-full ${
          !disabled ? ballStyle(column) : ballStyle('disabled')
        }`}
      >
        <div className="w-full h-full absolute overflow-hidden rounded-full">
          <div
            className={`rounded-full filter blur-[6px] bg-gradient-radial w-[97%] h-[97%] ${
              !disabled ? ballStyleInner(column) : ballStyleInner('disabled')
            }`}
          ></div>
        </div>
        <Badge description="Balls Remaining" disabled={disabled}>
          {remainder}
        </Badge>
        <div className="leading-4 uppercase relative z-20">{column}</div>
        <div className="text-3xl leading-7 relative z-20">
          {number !== 0 && number}
        </div>
      </div>
      {inProgress && (
        <CircularProgress className="absolute" progress={progress} />
      )}
    </div>
  );
}
