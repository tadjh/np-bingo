import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './routes/Play';
import {
  BallContext,
  GameContext,
  initialBallContext,
  initialGameContext,
  initialPlayer,
  initialRoomContext,
  initialUserContext,
  RoomContext,
  UserContext,
} from '../../context';
import Container from '../../components/Layout/Container';
import Background from '../../components/Surfaces/Background';
import socketInit from '../../lib/socket.io';
const socket = socketInit();

export default {
  title: 'Pages/Play',
  component: Play,
  decorators: [
    (Story) => {
      return (
        <Router>
          <UserContext.Provider
            value={{ ...initialUserContext, user: initialPlayer, socket }}
          >
            <RoomContext.Provider
              value={{ ...initialRoomContext, room: 'A1B2' }}
            >
              <GameContext.Provider
                value={{ ...initialGameContext, gamestate: 'start' }}
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
                  <Container>
                    <Background />
                    <Story />
                  </Container>
                </BallContext.Provider>
              </GameContext.Provider>
            </RoomContext.Provider>
          </UserContext.Provider>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
  },
} as Meta;

const Template: Story<PlayProps> = (args) => <Play {...args} />;

export const Base = Template.bind({});
Base.args = {
  staticCard: [
    2, 26, 41, 47, 66, 5, 19, 37, 59, 74, 10, 25, 42, 55, 62, 13, 29, 33, 53,
    72, 1, 20, 43, 51, 71,
  ],
  staticSerial: 'CwZgDCIKxgbATI+0oE5YHZYEZbE8KvGMGFLHtlPLCKlNhvEA',
};

export const Win = Template.bind({});
Win.args = {
  ...Base.args,
  winOverride: true,
};
