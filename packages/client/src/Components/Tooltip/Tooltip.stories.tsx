import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tooltip, { TooltipProps } from '.';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Base = Template.bind({});
Base.args = {
  isHovered: true,
  children: 'Tooltip Text',
};
