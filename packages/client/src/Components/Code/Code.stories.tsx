import React from 'react';
import { Story, Meta } from '@storybook/react';
import Code, { CodeProps } from './Code';

export default {
  title: 'Components/Code',
  component: Code,
} as Meta;

const Template: Story<CodeProps> = (args) => <Code {...args} />;

export const Default = Template.bind({});
Default.args = {
  room: 'A1B2',
};

export const Blank = Template.bind({});
