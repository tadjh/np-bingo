import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './routes/Play';
import { BallContext, GameContext, RoomContext } from '../../context';
import { initialAppState as AppState } from '../../reducers/app.reducer';
import Container from '../../components/Layout/Container';
import { CurrentBall } from '@np-bingo/types';
import Background from '../../components/Surfaces/Background';

export default {
  title: 'Pages/Play',
  component: Play,
  decorators: [
    (Story) => {
      const ball = {} as CurrentBall;
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
              dispatch: () => {},
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

const Template: Story<PlayProps> = (args) => <Play {...args} />;

export const Base = Template.bind({});

export const Win = Template.bind({});
Win.args = {
  confettiOverride: true,
};
