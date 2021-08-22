import React from 'react';
import { Story, Meta } from '@storybook/react';
import Share, { ShareProps } from '.';

export default {
  title: 'Elements/Share',
  component: Share,
  parameters: {
    actions: {
      handles: ['click .share-button', 'click .copy-button'],
    },
  },
} as Meta;

const Template: Story<ShareProps> = (args) => <Share {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpenDefault: true,
  room: 'A1B2',
};

export const Blank = Template.bind({});
