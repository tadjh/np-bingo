import React from 'react';
import { Story, Meta } from '@storybook/react';
import Board, { BoardProps } from './';

export default {
  title: 'Components/Board',
  component: Board,
} as Meta;

const Template: Story<BoardProps> = (args) => <Board {...args} />;

export const Default = Template.bind({});
Default.args = {
  card: [
    2,
    27,
    44,
    55,
    63,
    12,
    23,
    33,
    52,
    75,
    10,
    17,
    43,
    56,
    65,
    1,
    18,
    31,
    51,
    61,
    9,
    26,
    32,
    50,
    62,
  ],
  serial: 'EzDsBZwVig2BmAjCeqpiogDI0daaIAcSmsiAnMAsFFrMEA==',
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  crossmarks: {
    cell11: true,
    cell12: true,
    cell13: true,
    cell14: true,
    cell15: true,
    cell2: true,
    cell7: true,
    cell17: true,
    cell22: true,
    cell9: true,
    cell8: true,
    cell19: false,
    cell24: true,
    cell18: true,
    cell4: true,
    cell16: true,
  },
};

export const Winner = Template.bind({});
Winner.args = {
  ...Default.args,
  crossmarks: {
    cell11: true,
    cell12: true,
    cell13: true,
    cell14: true,
    cell15: true,
    cell2: true,
    cell7: true,
    cell17: true,
    cell22: true,
  },
  winner: true,
};

export const Blank = Template.bind({});
