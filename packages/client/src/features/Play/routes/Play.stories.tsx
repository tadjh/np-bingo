import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './Play';
import { BallContext, GameContext } from '../../../context';
import { initialState as AppState } from '../../../Reducers/app.reducer';
import Container from '../../../components/Layout/Container';
import { Ball } from '@np-bingo/types';

export default {
  title: 'Pages/Play',
  component: Play,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story) => {
      return (
        <Router>
          <Container>
            <Story />
          </Container>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
    argTypes: {
      init: { action: 'click' },
    },
  },
} as Meta;

const Template: Story<PlayProps> = (args) => <Play {...args} />;

const ball = {
  key: 1,
  number: 24,
  column: 'i',
  remainder: 74,
} as Ball;

export const Base = Template.bind({});
Base.decorators = [
  (Story) => {
    return (
      <GameContext.Provider
        value={{
          gamestate: 'start',
          gamemode: AppState.rules.mode,
          room: 'A1B2',
          host: { ...AppState.host },
          winner: { ...AppState.winner },
          play: () => {},
          mode: () => {},
          checkCard: () => false as boolean,
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
          <Story />
        </BallContext.Provider>
      </GameContext.Provider>
    );
  },
];
