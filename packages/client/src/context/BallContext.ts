import React from 'react';
import { Ball, CurrentBall } from '@np-bingo/types';
import { initialBall } from '../reducers/app.reducer';

export interface BallContextProps {
  ball: Ball;
  newBall: () => CurrentBall;
}

const ball = {} as CurrentBall;

export const initialBallContext: BallContextProps = {
  ball: { ...initialBall },
  newBall: () => ball,
};

export const BallContext = React.createContext(initialBallContext);
