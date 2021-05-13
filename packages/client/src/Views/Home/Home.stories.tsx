import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Home, { HomeProps } from './';
import { FeautresContext } from '../../Utils/contexts';
import features from '../../Config/features';
import Container from '../../Components/Container';

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
          <Container>
            <Story />
          </Container>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
    actions: {
      handles: ['click .play-button'],
    },
  },
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Base = Template.bind({});

export const PrivateRoomsOnly = Template.bind({});
PrivateRoomsOnly.decorators = [
  (Story) => {
    return (
      <FeautresContext.Provider
        value={{ ...features, allowSolo: false, publicRooms: false }}
      >
        <Story />
      </FeautresContext.Provider>
    );
  },
];
