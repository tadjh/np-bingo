import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './';
import { BallContext, GameContext } from '../../Utils/contexts';
import { initialState as AppState } from '../../Reducers/app.reducer';
// import { FeautresContext } from '../../Utils/contexts';
// import features from '../../Config/features';
import Container from '../../Components/Container';

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

export const Base = Template.bind({});
Base.decorators = [
  (Story) => {
    return (
      <GameContext.Provider
        value={{
          gamestate: 'start',
          room: 'A1B2',
          host: { ...AppState.host },
          mode: AppState.rules.mode,
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
            loop: true,
            progress: 75,
          }}
        >
          <Story />
        </BallContext.Provider>
      </GameContext.Provider>
    );
  },
];
Base.args = {
  gamestate: 'start',
};
