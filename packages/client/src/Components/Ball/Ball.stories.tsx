import React from 'react';
import { Story, Meta } from '@storybook/react';
import Ball, { BallProps } from './Ball';

export default {
  title: 'Components/Ball',
  component: Ball,
} as Meta;

const Template: Story<BallProps> = (args) => <Ball {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  ball: { column: 'b', key: 0, number: 3, remainder: 73 },
};

export const Red = Template.bind({});
Red.args = {
  ball: { column: 'i', key: 1, number: 24, remainder: 74 },
};

export const Grey = Template.bind({});
Grey.args = {
  ball: { column: 'n', key: 2, number: 43, remainder: 54 },
};

export const Green = Template.bind({});
Green.args = {
  ball: { column: 'g', key: 3, number: 50, remainder: 74 },
};

export const Orange = Template.bind({});
Orange.args = {
  ball: { column: 'o', key: 4, number: 70, remainder: 71 },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  ball: { column: 'i', key: 1, number: 24, remainder: 74 },
};

export const Progress = Template.bind({});
Progress.args = {
  loop: true,
  ball: { column: 'i', key: 1, number: 24, remainder: 74 },
  progress: 75,
};

export const Empty = Template.bind({});
