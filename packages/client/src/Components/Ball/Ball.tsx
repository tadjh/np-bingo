import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import './style.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';

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
    <div className="ball-container">
      <Badge
        color="primary"
        className="badge monospace"
        badgeContent={disabled ? 0 : remainder}
        overlap="circle"
      >
        <div
          className={['ball', 'shadow', column, disabled && 'disabled'].join(
            ' '
          )}
        >
          <div className="column monospace">{column}</div>
          <div className="number monospace">{number !== 0 && number}</div>
        </div>
      </Badge>
      {loop && (
        <CircularProgress
          className="progress"
          size={102}
          variant="determinate"
          value={progress}
        />
      )}
    </div>
  );
}
