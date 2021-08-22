import { Meta } from '@storybook/react';
import List from '.';
import { Rooms } from '../../../features/join/components/RoomList/RoomList.stories';

export default {
  title: 'Display/List',
  component: List,
} as Meta;

export const Base = Rooms;
