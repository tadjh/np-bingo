import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Board, BoardProps } from './components/Board';

export default {
  title: 'Pages/Play/Board',
  component: Board,
} as Meta;

const Template: Story<BoardProps> = (args) => <Board {...args} />;

export const Base = Template.bind({});
Base.args = {
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

export const Winner = Template.bind({});
Winner.args = {
  ...Base.args,
  crossmarks: {
    'cell-2': true,
    'cell-7': true,
    'cell-11': true,
    'cell-12': true,
    'cell-13': true,
    'cell-14': true,
    'cell-15': true,
    'cell-17': true,
    'cell-22': true,
  },
  winner: true,
};

export const Blank = Template.bind({});
