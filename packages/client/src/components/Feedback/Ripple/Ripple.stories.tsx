import React from 'react';
import { Story, Meta } from '@storybook/react';
import Ripple from '.';
import Button from '../../Inputs/Button';

export default {
  title: 'Feedback/Ripple',
  component: Ripple,
} as Meta;

const Template: Story = () => <Button variant="primary">Click me</Button>;

export const Base = Template.bind({});
