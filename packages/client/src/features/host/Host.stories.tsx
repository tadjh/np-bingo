import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Host, { HostProps } from './routes/Host';
import { BallContext, GameContext, RoomContext } from '../../context';
import { initialAppState as AppState } from '../../reducers/app.reducer';
import Container from '../../components/Layout/Container';
import { Ball, CurrentBall } from '@np-bingo/types';
import Background from '../../components/Surfaces/Background';

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
          <Container>
            <Background />
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

const ball = {} as CurrentBall;

export const Base = Template.bind({});
Base.decorators = [
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
            gamestate: 'standby',
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
            <Story />
          </BallContext.Provider>
        </GameContext.Provider>{' '}
      </RoomContext.Provider>
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
            gamestate: 'ready',
            gamemode: AppState.rules.mode,
            dispatch: () => {},
            checkCard: () => null,
          }}
        >
          <Story />
        </GameContext.Provider>
      </RoomContext.Provider>
    );
  },
];
Waiting.args = {
  draws: [[], [], [], [], []],
};

export const ReadyList = Template.bind({});
ReadyList.decorators = [
  (Story) => {
    return (
      <RoomContext.Provider
        value={{
          room: 'A1B2',
          host: { ...AppState.host },
          winner: { ...AppState.winner },
          players: [
            {
              _id: 'adaskdjsahkd',
              uid: 2222,
              name: 'Jane Doe',
              socketId: '',
              ready: true,
              kicked: false,
              leave: false,
            },
            {
              _id: 'adsjfhskjdfh',
              uid: 2223,
              name: 'Jane Doa',
              socketId: '',
              ready: false,
              kicked: false,
              leave: false,
            },
            {
              _id: 'fasdiuywqqe',
              uid: 2224,
              name: 'Jane Do',
              socketId: '',
              ready: false,
              kicked: false,
              leave: false,
            },
            {
              _id: 'damnsbfndbvfw',
              uid: 2225,
              name: 'Jane Doh',
              socketId: '',
              ready: false,
              kicked: false,
              leave: false,
            },
          ],
        }}
      >
        <GameContext.Provider
          value={{
            gamestate: 'ready',
            gamemode: AppState.rules.mode,
            dispatch: () => {},
            checkCard: () => null,
          }}
        >
          <Story />
        </GameContext.Provider>
      </RoomContext.Provider>
    );
  },
];

export const GameOver = Template.bind({});
GameOver.decorators = [
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
            gamestate: 'end',
            gamemode: AppState.rules.mode,
            dispatch: () => {},
            checkCard: () => null,
          }}
        >
          <Story />
        </GameContext.Provider>
      </RoomContext.Provider>
    );
  },
];
// GameOver.args = {
//   draws: [...DrawStories.Disabled.args.draws]
// }
