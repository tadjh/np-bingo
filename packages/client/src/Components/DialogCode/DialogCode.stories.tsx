import React from 'react';
import { Story, Meta } from '@storybook/react';
import DialogCode, { DialogCodeProps } from './';

export default {
  title: 'Forms/DialogCode',
  component: DialogCode,
  argTypes: {
    handleClose: { action: 'click' },
    callback: { action: 'callback' },
  },
} as Meta;

const Template: Story<DialogCodeProps> = (args) => <DialogCode {...args} />;

export const Base = Template.bind({});
Base.args = {
  open: true,
};
