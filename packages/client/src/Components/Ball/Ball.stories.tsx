import React from 'react';
import { Story, Meta } from '@storybook/react';
import Ball, { BallProps } from './';

export default {
  title: 'Components/Ball',
  component: Ball,
} as Meta;

const Template: Story<BallProps> = (args) => <Ball {...args} />;

export const Base = Template.bind({});

const Stack: Story<BallProps> = (args) => (
  <React.Fragment>
    <Ball {...args} column="b" number={3} remainder={73} />
    <Ball {...args} column="i" number={24} remainder={74} />
    <Ball {...args} column="n" number={43} remainder={54} />
    <Ball {...args} column="g" number={50} remainder={74} />
    <Ball {...args} column="o" number={70} remainder={71} />
  </React.Fragment>
);

export const Variants = Stack.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  column: 'i',
  number: 24,
  remainder: 74,
};

export const Progress = Template.bind({});
Progress.args = {
  loop: true,
  column: 'i',
  number: 24,
  remainder: 74,
  progress: 75,
};
