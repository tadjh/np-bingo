import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Host, { HostProps } from './';
import Container from '@material-ui/core/Container';
import { BallContext, GameContext } from '../../Utils/contexts';
import { initialState as AppState } from '../../Reducers/app.reducer';
// import * as DrawStories from '../../Components/Draws/Draws.stories';

export default {
  title: 'Pages/Host',
  component: Host,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story) => {
      return (
        <Router>
          <Container className="App" fixed maxWidth="xs">
            <Story />
          </Container>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
  },
} as Meta;

const Template: Story<HostProps> = (args) => <Host {...args} />;

export const Base = Template.bind({});
Base.decorators = [
  (Story) => {
    return (
      <GameContext.Provider
        value={{
          gamestate: 'standby',
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
  draws: [[], [24], [], [], []],
};

export const Waiting = Template.bind({});
Waiting.decorators = [
  (Story) => {
    return (
      <GameContext.Provider
        value={{
          gamestate: 'ready',
          room: 'A1B2',
          host: { ...AppState.host },
          mode: AppState.rules.mode,
        }}
      >
        <Story />
      </GameContext.Provider>
    );
  },
];
Waiting.args = {
  draws: [[], [], [], [], []],
};

export const ReadyList = Template.bind({});
ReadyList.decorators = [...Waiting.decorators];
ReadyList.args = {
  players: [
    {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: true,
    },
    {
      _id: 'adsjfhskjdfh',
      uid: 2223,
      name: 'Jane Doa',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
    {
      _id: 'fasdiuywqqe',
      uid: 2224,
      name: 'Jane Do',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
    {
      _id: 'damnsbfndbvfw',
      uid: 2225,
      name: 'Jane Doh',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
  ],
};

export const GameOver = Template.bind({});
GameOver.decorators = [
  (Story) => {
    return (
      <GameContext.Provider
        value={{
          gamestate: 'end',
          room: 'A1B2',
          host: { ...AppState.host },
          mode: AppState.rules.mode,
        }}
      >
        <Story />
      </GameContext.Provider>
    );
  },
];
// GameOver.args = {
//   draws: [...DrawStories.Disabled.args.draws]
// }
