import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Join, { JoinProps } from './';
import { FeautresContext } from '../../Utils/contexts';
import features from '../../Config/features';
import Container from '../../Components/Container';
import * as RoomListStories from '../../Components/RoomList/RoomList.stories';

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
      <FeautresContext.Provider value={{ ...features, publicRooms: true }}>
        <Story />
      </FeautresContext.Provider>
    );
  },
];
PublicRooms.args = {
  ...RoomListStories.Rooms.args,
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
