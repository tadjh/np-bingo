import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Join, { JoinProps } from './routes/Join';
import {
  FeaturesContext,
  initialPlayer,
  initialUserContext,
  UserContext,
} from '../../context';
import features from '../../config/features';
import Container from '../../components/Layout/Container';
import { Rooms } from './components/RoomList/RoomList.stories';
import Background from '../../components/Surfaces/Background';
import socketInit from '../../lib/socket.io';

const socket = socketInit();

export default {
  title: 'Pages/Join',
  component: Join,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <Router>
          <FeaturesContext.Provider
            value={{ ...features, allowPublic: args.allowPublic }}
          >
            <UserContext.Provider
              value={{ ...initialUserContext, user: initialPlayer, socket }}
            >
              <Container>
                <Background />
                <Story {...args} />
              </Container>
            </UserContext.Provider>
          </FeaturesContext.Provider>
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
PublicRooms.args = {
  allowPublic: true,
  publicRooms: Rooms.args && Rooms.args.rooms && [...Rooms.args.rooms],
};

export const NoSoloMode = Template.bind({});
NoSoloMode.args = {
  allowPublic: false,
};
