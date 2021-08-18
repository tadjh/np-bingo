import React from 'react';
import { Story, Meta } from '@storybook/react';
import Card, { CardProps } from '.';

export default {
  title: 'Surfaces/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: (
    <div className="text-black dark:text-white text-opacity-90 dark:text-opacity-90">
      Card
    </div>
  ),
};
