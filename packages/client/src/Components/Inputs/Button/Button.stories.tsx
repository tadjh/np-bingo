import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
  title: 'Inputs/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
  ...Base.args,
  variant: 'primary',
};

export const Success = Template.bind({});
Success.args = {
  ...Base.args,
  variant: 'success',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  disabled: true,
};
