import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Host, { HostProps } from './routes/Host';
import {
  BallContext,
  GameContext,
  initialBallContext,
  initialGameContext,
  initialRoomContext,
  initialUserContext,
  RoomContext,
  UserContext,
} from '../../context';
import Container from '../../components/Layout/Container';
import Background from '../../components/Surfaces/Background';
import socketInit from '../../lib/socket.io';

export default {
  title: 'Pages/Host',
  component: Host,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story) => {
      const socket = socketInit();
      return (
        <Router>
          <UserContext.Provider value={{ ...initialUserContext, socket }}>
            <Container>
              <Background />
              <Story />
            </Container>
          </UserContext.Provider>
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
      <RoomContext.Provider value={{ ...initialRoomContext, room: 'A1B2' }}>
        <GameContext.Provider
          value={{ ...initialGameContext, gamestate: 'standby' }}
        >
          <BallContext.Provider
            value={{
              ...initialBallContext,
              ball: {
                key: 1,
                number: 24,
                column: 'i',
                remainder: 74,
              },
            }}
          >
            <Story />
          </BallContext.Provider>
        </GameContext.Provider>
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
      <RoomContext.Provider value={{ ...initialRoomContext, room: 'A1B2' }}>
        <GameContext.Provider
          value={{ ...initialGameContext, gamestate: 'ready' }}
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
          ...initialRoomContext,
          room: 'A1B2',
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
          value={{ ...initialGameContext, gamestate: 'ready' }}
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
      <RoomContext.Provider value={{ ...initialRoomContext, room: 'A1B2' }}>
        <GameContext.Provider
          value={{ ...initialGameContext, gamestate: 'end' }}
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
