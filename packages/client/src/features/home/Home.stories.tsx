import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Home, { HomeProps } from './routes/Home';
import {
  initialPlayer,
  initialUserContext,
  ThemeContext,
  UserContext,
} from '../../context';
import { Socket } from 'socket.io-client';
import { Wrapper } from '../../components/Layout/Container/Wrapper';
import { Theme } from '@np-bingo/types';

export default {
  title: 'Pages/Home',
  component: Home,
  argTypes: {
    createRoom: { action: 'click' },
    joinRoom: { action: 'submit' },
  },
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
                socket: {} as Socket,
              }}
            >
              <Wrapper theme={theme}>
                <Story />
              </Wrapper>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
    actions: {
      handles: ['click #play-button'],
    },
  },
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Base = Template.bind({});
