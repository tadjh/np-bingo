import React from 'react';
import { Story, Meta } from '@storybook/react';
import Draws, { DrawsProps } from '.';
export default {
  title: 'Pages/Host/Draws',
  component: Draws,
} as Meta;

const Template: Story<DrawsProps> = (args) => <Draws {...args} />;

export const Base = Template.bind({});
Base.args = {
  draws: [
    [10, 15, 2, 5, 11, 12, 6, 14, 3, 13],
    [23, 27, 25, 19, 24, 30],
    [45, 43, 34, 35, 41, 44, 32],
    [59, 51, 47, 46, 50, 49, 54, 58, 48, 53],
    [71, 73, 68, 67, 62, 74, 70],
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  draws: [
    [10, 15, 2, 5, 11, 12, 6, 14, 3, 13, 7, 1, 9, 8, 4],
    [23, 27, 25, 19, 24, 30, 29, 21, 16, 17, 26, 22, 28, 18, 20],
    [45, 43, 34, 35, 41, 44, 32, 37, 36, 31, 39, 33, 40, 42, 38],
    [59, 51, 47, 46, 50, 49, 54, 58, 48, 53, 60, 55, 57, 52, 56],
    [71, 73, 68, 67, 62, 74, 70, 75, 65, 66, 63, 64, 72, 61, 69],
  ],
  disabled: true,
};

export const Blank = Template.bind({});
