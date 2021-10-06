import React from 'react';
import { Story, Meta } from '@storybook/react';
import IconButton, { IconButtonProps } from '.';
import SunIcon from '../../../assets/icons/Sun';

export default {
  title: 'Inputs/Icon Button',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <SunIcon />,
  description: 'Icon Button Tooltip',
};

export const Tooltip = Template.bind({});
Tooltip.args = {
  ...Base.args,
  isHovered: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Base.args,
  disabled: true,
};
