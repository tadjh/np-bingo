import React from 'react';
import { initialAppState } from '../reducers/app.reducer';
import { Ball, CurrentBall } from '@np-bingo/types';

export interface BallContextProps {
  ball: Ball;
  newBall: () => CurrentBall;
}

const ball = {} as CurrentBall;

export const initialBallContext: BallContextProps = {
  ball: { ...initialAppState.ball },
  newBall: () => ball,
};

export const BallContext = React.createContext(initialBallContext);
