import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import './style.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '../Badge';

export interface BallProps {
  number: BallType['number'];
  column: BallType['column'];
  remainder: BallType['remainder'];
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
  return (
    <div className="relative inline-flex">
      <div
        className={`relative z-10 text-black dark:text-opacity-90 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-300 dark:from-gray-300 dark:via-gray-300 dark:to-gray-500 w-20 h-20 flex justify-center items-center flex-col shadow-md text-center rounded-full border-4 ball ${column} ${
          disabled ? 'disabled' : ''
        }`}
        {...disabled}
      >
        <Badge description="Balls Remaining">{!disabled && remainder}</Badge>
        <div className="leading-4 uppercase font-mono font-bold">{column}</div>
        <div className="text-3xl leading-7 font-mono font-bold">
          {number !== 0 && number}
        </div>
      </div>
      {loop && (
        <CircularProgress
          className="absolute -top-1.5 -left-1.5 transition-transform text-gray-700 dark:text-gray-600"
          size={93}
          variant="determinate"
          value={progress}
        />
      )}
    </div>
  );
}
