import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './Play';
import { BallContext, GameContext, RoomContext } from '../../../context';
import { initialState as AppState } from '../../../reducers/app.reducer';
import Container from '../../../components/Layout/Container';
import { Ball, Card, Player, Results } from '@np-bingo/types';
import { useContext } from 'react';
import { useAppState } from '../../../hooks';
import Background from '../../../components/Surfaces/Background';

export default {
  title: 'Pages/Play',
  component: Play,
  decorators: [
    (Story) => {
      return (
        <RoomContext.Provider
          value={{
            room: 'A1B2',
            host: { ...AppState.host },
            winner: { ...AppState.winner },
            players: [],
          }}
        >
          <GameContext.Provider
            value={{
              gamestate: 'start',
              gamemode: AppState.rules.mode,
              play: () => {},
              mode: () => {},
              checkCard: () => null,
            }}
          >
            <BallContext.Provider
              value={{
                ball: {
                  key: 1,
                  number: 24,
                  column: 'i',
                  remainder: 74,
                },
                newBall: () => ball,
              }}
            >
              <Router>
                <Container>
                  <Background />
                  <Story />
                </Container>
              </Router>
            </BallContext.Provider>
          </GameContext.Provider>
        </RoomContext.Provider>
      );
    },
  ],
  parameters: {
    layout: 'none',
  },
} as Meta;

const Template: Story<PlayProps> = (args) => {
  const { playDispatchers } = useAppState();
  return <Play {...args} dispatchers={playDispatchers} />;
};

const ball = {
  key: 1,
  number: 24,
  column: 'i',
  remainder: 74,
} as Ball;

export const Base = Template.bind({});

export const Win = Template.bind({});
Win.args = {
  confettiOverride: true,
};
