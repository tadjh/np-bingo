import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Home, { HomeProps } from './routes/Home';
import Container from '../../components/Layout/Container';
import { initialPlayer, initialUserContext, UserContext } from '../../context';
import socketInit from '../../lib/socket.io';

const socket = socketInit();

export default {
  title: 'Pages/Home',
  component: Home,
  argTypes: {
    createRoom: { action: 'click' },
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story) => {
      return (
        <Router>
          <UserContext.Provider
            value={{ ...initialUserContext, user: initialPlayer, socket }}
          >
            <Container>
              <Story />
            </Container>
          </UserContext.Provider>
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
