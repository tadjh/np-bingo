import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Home, { HomeProps } from '.';
import Container from '../../components/Layout/Container';

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
      handles: ['click #play-button'],
    },
  },
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Base = Template.bind({});
