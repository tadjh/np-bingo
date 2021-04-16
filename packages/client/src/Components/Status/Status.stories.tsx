import React from 'react';
import { Story, Meta } from '@storybook/react';
import Status, { StatusProps } from './Status';

export default {
  title: 'Components/Status',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = (args) => <Status {...args} />;

export const Default = Template.bind({});
