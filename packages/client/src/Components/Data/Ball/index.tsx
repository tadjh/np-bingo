import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import CircularProgress from '../../Feedback/CircularProgress';
import Badge from '../Badge';
import { useBall } from './hooks';

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
  const [background, gradient] = useBall(column, disabled);
  return (
    <div className="relative inline-flex">
      <div
        className={[
          'relative z-10 w-20 h-20 flex justify-center items-center flex-col shadow-lg text-center rounded-full font-mono font-bold text-black text-opacity-90 dark:text-opacity-90',
          background,
        ].join(' ')}
      >
        <div className="w-full h-full absolute overflow-hidden rounded-full">
          <div
            className={[
              'rounded-full filter blur-[6px] bg-gradient-radial w-[97%] h-[97%]',
              gradient,
            ].join(' ')}
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
