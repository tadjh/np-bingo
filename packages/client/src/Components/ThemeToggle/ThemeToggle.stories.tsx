import React from 'react';
import { Story, Meta } from '@storybook/react';
import ThemeToggle, { ThemeToggleProps } from '.';

export default {
  title: 'Components/Theme Toggle',
  component: ThemeToggle,
} as Meta;

const Template: Story<ThemeToggleProps> = (args) => <ThemeToggle {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  theme: 'dark',
};
