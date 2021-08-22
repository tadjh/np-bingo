import React from 'react';
import { Story, Meta } from '@storybook/react';
import Spinner, { SpinnerProps } from '.';

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Base = Template.bind({});
Base.args = {
  isLoading: true,
};

// TODO Spinner Modal
