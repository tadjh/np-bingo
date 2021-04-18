import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import RoomList, { RoomListProps } from './RoomList';

export default {
  title: 'Components/RoomList',
  component: RoomList,
  argTypes: { action: { action: 'click' } },
  decorators: [
    (Story) => {
      return (
        <Router>
          <Story />
        </Router>
      );
    },
  ],
} as Meta;

const Template: Story<RoomListProps> = (args) => <RoomList {...args} />;

export const Rooms = Template.bind({});
Rooms.args = {
  data: [
    {
      _id: 'dadkjashdjshadka',
      room: 'NYPD',
      host: { id: 1100, name: 'Siz Fulker' },
      players: [1111, 1122, 1133, 1144, 1155, 1121, 1112, 1114],
    },
    {
      _id: 'dadkjashdjshadka',
      room: 'TEST',
      host: { id: 1100, name: 'Dean Watson' },
      players: [1111, 1122, 1133, 1144, 1155],
    },
    {
      _id: 'dadkjashdjshadka',
      room: 'ABCD',
      host: { id: 1100, name: 'Manny McDaniels' },
      players: [1111],
    },
  ],
};

export const Blank = Template.bind({});
