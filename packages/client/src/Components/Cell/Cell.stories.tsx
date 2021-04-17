import React from 'react';
import { Story, Meta } from '@storybook/react';
import Cell, { CellProps } from './Cell';

export default {
  title: 'Components/Board/Cell',
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 15,
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
};

export const Winner = Template.bind({});
Winner.args = {
  ...Checked.args,
  className: 'winner',
  disabled: true,
};

export const Blank = Template.bind({});
