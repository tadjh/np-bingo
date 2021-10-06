import React from 'react';
import { Story, Meta } from '@storybook/react';
import Ball, { BallProps } from '.';

export default {
  title: 'Display/Ball',
  component: Ball,
} as Meta;

const Template: Story<BallProps> = (args) => <Ball {...args} />;

export const Base = Template.bind({});

const Stack: Story<BallProps> = (args) => (
  <div className="flex gap-5">
    <Ball {...args} column="b" number={3} remainder={73} />
    <Ball {...args} column="i" number={24} remainder={74} />
    <Ball {...args} column="n" number={43} remainder={42} />
    <Ball {...args} column="g" number={50} remainder={22} />
    <Ball {...args} column="o" number={70} remainder={71} />
  </div>
);

export const Variants = Stack.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Progress = Template.bind({});
Progress.args = {
  inProgress: true,
  column: 'i',
  number: 24,
  remainder: 74,
  progress: 75,
};
