import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tooltip, { TooltipProps } from '.';

export default {
  title: 'Display/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div className="relative group">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <React.Fragment>
    <Tooltip isHovered={true} children="Tooltip Top" direction="top" />
    <Tooltip isHovered={true} children="Tooltip Right" direction="right" />
    <Tooltip isHovered={true} children="Tooltip Bottom" direction="bottom" />
    <Tooltip isHovered={true} children="Tooltip Left" direction="left" />
  </React.Fragment>
);

export const Variants = Template.bind({});
