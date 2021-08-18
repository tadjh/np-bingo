import React from 'react';
import { Story, Meta } from '@storybook/react';
import IconMenu, { IconMenuProps } from '.';

export default {
  title: 'Inputs/Icon Menu',
  component: IconMenu,
} as Meta;

const Template: Story<IconMenuProps> = (args) => <IconMenu {...args} />;

export const Up = Template.bind({});
Up.args = {
  direction: 'up',
  open: true,
};
export const Down = Template.bind({});
Down.args = {
  direction: 'down',
  open: true,
};
export const Left = Template.bind({});
Left.args = {
  direction: 'left',
  open: true,
};
export const Right = Template.bind({});
Right.args = {
  direction: 'right',
  open: true,
};
