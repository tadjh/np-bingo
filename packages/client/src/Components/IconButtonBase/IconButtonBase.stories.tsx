import React from 'react';
import { Story, Meta } from '@storybook/react';
import IconButton, { IconButtonProps } from '../IconButton';
import IconButtonBase from '.';
import SunIcon from '../../Assets/Sun';

export default {
  title: 'Components/Icon Button/Icon Button Base',
  component: IconButtonBase,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: (
    <SunIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
  ),
};

// TODO Improve or delete
