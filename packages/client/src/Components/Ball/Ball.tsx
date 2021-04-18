import React from 'react';
import { Ball as BallType } from '@np-bingo/types';
import { initialState } from '../../Reducers/app.reducer';
import './style.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';

export interface BallProps {
  ball: BallType;
  loop?: boolean;
  progress?: number;
  disabled?: boolean;
}

export default function Ball({
  ball = { ...initialState.ball },
  loop = false,
  progress = 0,
  disabled = false,
}: BallProps) {
  return (
    <div className="ball-container">
      <Badge
        color="primary"
        className="badge monospace"
        badgeContent={disabled ? 0 : ball.remainder}
        overlap="circle"
      >
        <div
          className={[
            'ball',
            'shadow',
            ball.column,
            disabled && 'disabled',
          ].join(' ')}
        >
          <div className="column monospace">{ball.column}</div>
          <div className="number monospace">
            {ball.number !== 0 && ball.number}
          </div>
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
