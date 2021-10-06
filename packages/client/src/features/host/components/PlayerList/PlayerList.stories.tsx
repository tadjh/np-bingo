import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PlayerList, PlayerListProps } from '.';
import { initialPlayer } from '../../../../context';

export default {
  title: 'Pages/Host/Player List',
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
      ...initialPlayer,
      uid: 2222,
      name: 'Jane Doe',
    },
  ],
};

export const SingleItemReady = Template.bind({});
SingleItemReady.args = {
  data: [
    {
      ...initialPlayer,
      name: 'Jane Doe',
      ready: true,
    },
  ],
};

export const ManyItems = Template.bind({});
ManyItems.args = {
  data: [
    {
      ...initialPlayer,
      name: 'Jane Doe',
      ready: true,
    },
    {
      ...initialPlayer,
      name: 'Jane Doa',
      ready: false,
    },
    {
      ...initialPlayer,
      name: 'Jane Do',
      ready: false,
    },
    {
      ...initialPlayer,
      name: 'Jane Doh',
      ready: false,
    },
  ],
};

export const Blank = Template.bind({});
