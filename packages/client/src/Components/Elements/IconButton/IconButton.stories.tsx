import React from 'react';
import { Story, Meta } from '@storybook/react';
import IconButton, { IconButtonProps } from '.';
import SunIcon from '../../../assets/Icons/Sun';

export default {
  title: 'Components/Icon Button',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: (
    <SunIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
  ),
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
