import React from 'react';
import { Story, Meta } from '@storybook/react';
import Share, { ShareProps } from './Share';

export default {
  title: 'Components/Share',
  component: Share,
} as Meta;

const Template: Story<ShareProps> = (args) => <Share {...args} />;

export const Default = Template.bind({});
Default.args = {
  room: 'A1B2',
};

export const Blank = Template.bind({});
