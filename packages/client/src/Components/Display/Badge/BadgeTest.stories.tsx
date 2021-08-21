import React from 'react';
import { Story, Meta } from '@storybook/react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  offset: number;
}

function BadgeTest({ offset = 50 }) {
  return (
    <div
      className="h-5 w-7 bg-gradient-linear bg-oversized"
      style={{ backgroundPositionY: `${offset}%` }}
    ></div>
  );
}

export default {
  title: 'Display/Badge Test',
  component: BadgeTest,
  decorators: [
    (Story) => (
      <div className="flex relative gap-8">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<BadgeProps> = (args) => <BadgeTest {...args} />;

export const Base = Template.bind({});
Base.args = {
  offset: 12,
};
