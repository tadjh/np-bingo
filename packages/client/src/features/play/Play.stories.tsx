import React, { useState } from 'react';
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
  ThemeContext,
  UserContext,
} from '../../context';
import { Theme } from '@np-bingo/types';
import { Wrapper } from '../../components/Layout/Wrapper';

export default {
  title: 'Pages/Play',
  component: Play,
  decorators: [
    (Story) => {
      const [theme, setTheme] = useState<Theme>('dark');
      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      };
      return (
        <Router>
          <ThemeContext.Provider
            value={{
              theme: theme,
              toggleTheme: toggleTheme,
            }}
          >
            <UserContext.Provider
              value={{
                ...initialUserContext,
                user: initialPlayer,
                socket: { on: () => {}, emit: () => {} } as any,
              }}
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
                    <Wrapper theme={theme}>
                      <Story />
                    </Wrapper>
                  </BallContext.Provider>
                </GameContext.Provider>
              </RoomContext.Provider>
            </UserContext.Provider>
          </ThemeContext.Provider>
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
