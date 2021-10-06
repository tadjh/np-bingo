import React from 'react';
import { Story, Meta } from '@storybook/react';
import Code, { CodeProps } from '.';

export default {
  title: 'Elements/Code',
  component: Code,
} as Meta;

const Template: Story<CodeProps> = (args) => <Code {...args} />;

export const Base = Template.bind({});
Base.args = {
  room: 'A1B2',
};

export const Hovered = Template.bind({});
Hovered.args = {
  ...Base.args,
  isHovered: true,
};

export const Blank = Template.bind({});
