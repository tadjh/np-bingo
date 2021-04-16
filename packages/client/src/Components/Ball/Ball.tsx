import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Ball as BallType } from '@np-bingo/types';
import { initialState } from '../../Reducers/app.reducer';
import './style.css';

export interface BallProps {
  ball: BallType;
  loop?: boolean;
  progress?: number;
  disabled?: boolean;
}

export default function Ball({
  ball = { ...initialState.ball },
  loop = initialState.loop,
  progress = 0,
  disabled = false,
}: BallProps) {
  // TODO Lineaer progress needs work
  return (
    <div className="ball-container">
      <div className={`ball shadow ${ball.column} ${disabled && 'disabled'}`}>
        <div className="column">{ball.column}</div>
        <div className="number">{ball.number !== 0 && ball.number}</div>
      </div>
      <p
        className={`remainder ${disabled && 'disabled'}`}
      >{`Balls Remaining: ${ball.remainder}`}</p>
      {loop && <LinearProgress variant="determinate" value={progress} />}
    </div>
  );
}
