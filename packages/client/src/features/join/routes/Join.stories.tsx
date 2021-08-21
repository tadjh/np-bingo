import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Join, { JoinProps } from './Join';
import { FeautresContext } from '../../../context';
import features from '../../../config/features';
import Container from '../../../components/Layout/Container';
import { Rooms } from '../components/RoomList/RoomList.stories';
import Background from '../../../components/Surfaces/Background';

export default {
  title: 'Pages/Join',
  component: Join,
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
    actions: {
      handles: [
        'click .nav-button',
        'click .solo-button',
        'click .join-button',
      ],
    },
  },
} as Meta;

const Template: Story<JoinProps> = (args) => <Join {...args} />;

export const Base = Template.bind({});

export const PublicRooms = Template.bind({});
PublicRooms.decorators = [
  (Story) => {
    return (
      <FeautresContext.Provider value={{ ...features, allowPublic: true }}>
        <Story />
      </FeautresContext.Provider>
    );
  },
];
PublicRooms.args = {
  publicRooms: Rooms.args && Rooms.args.rooms && [...Rooms.args.rooms],
};

export const NoSoloMode = Template.bind({});
NoSoloMode.decorators = [
  (Story) => {
    return (
      <FeautresContext.Provider value={{ ...features, allowSolo: false }}>
        <Story />
      </FeautresContext.Provider>
    );
  },
];
