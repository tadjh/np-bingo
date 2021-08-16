import React from 'react';
import { Story, Meta } from '@storybook/react';
import PlayerList, { PlayerListProps } from './PlayerList';

export default {
  title: 'Components/Player List',
  component: PlayerList,
  argTypes: { onRemove: { action: 'click' } },
  parameters: {
    actions: {
      handles: ['click .delete-button'],
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
} as Meta;

const Template: Story<PlayerListProps> = (args) => <PlayerList {...args} />;

export const SingleItem = Template.bind({});
SingleItem.args = {
  data: [
    {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
  ],
};

export const SingleItemReady = Template.bind({});
SingleItemReady.args = {
  data: [
    {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: true,
    },
  ],
};

export const ManyItems = Template.bind({});
ManyItems.args = {
  data: [
    {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: true,
    },
    {
      _id: 'adsjfhskjdfh',
      uid: 2223,
      name: 'Jane Doa',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
    {
      _id: 'fasdiuywqqe',
      uid: 2224,
      name: 'Jane Do',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
    {
      _id: 'damnsbfndbvfw',
      uid: 2225,
      name: 'Jane Doh',
      socket: 'rKsFIdQn_fEDAFjiAAAH',
      ready: false,
    },
  ],
};

export const Blank = Template.bind({});
