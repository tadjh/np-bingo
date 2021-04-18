import React from 'react';
import { Story, Meta } from '@storybook/react';
import Logo, { LogoProps } from './Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Large = Template.bind({});
Large.args = {
  home: true,
};

export const Small = Template.bind({});