import React from 'react';
import { Story, Meta } from '@storybook/react';
import CircularProgress, { CircularProgressProps } from '.';

export default {
  title: 'Feedback/Circular Progress',
  component: CircularProgress,
  decorators: [
    (Story) => (
      <div className="relative w-96 h-96 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<CircularProgressProps> = (args) => (
  <CircularProgress {...args} />
);

export const Base = Template.bind({});
Base.args = {
  progress: 75,
};
