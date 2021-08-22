import React from 'react';
import { Story, Meta } from '@storybook/react';
import Badge, { BadgeProps } from '.';

export default {
  title: 'Display/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <div className="flex relative gap-8">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 75,
  description: 'Badge',
};

const Stack: Story<BadgeProps> = (args) => (
  <React.Fragment>
    <div className="relative">
      <Badge {...args} />
    </div>
    <div className="relative">
      <Badge {...args} color="blue" />
    </div>
  </React.Fragment>
);

export const Variants = Stack.bind({});
Variants.args = {
  ...Base.args,
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

export const Gradient = Template.bind({});
Gradient.args = {
  ...Base.args,
  children: 43,
  offset: 57,
  color: 'gradient',
};
