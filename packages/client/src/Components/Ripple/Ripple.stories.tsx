import React from 'react';
import { Story, Meta } from '@storybook/react';
import Ripple from '.';
import Button from '../Elements/Button';

export default {
  title: 'Animations/Ripple',
  component: Ripple,
} as Meta;

const Template: Story = () => <Button variant="contained">Click me</Button>;

export const Base = Template.bind({});
