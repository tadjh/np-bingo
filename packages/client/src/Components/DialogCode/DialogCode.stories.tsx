import React from 'react';
import { Story, Meta } from '@storybook/react';
import DialogCode, { DialogCodeProps } from './DialogCode';

export default {
  title: 'Components/DialogCode',
  component: DialogCode,
} as Meta;

const Template: Story<DialogCodeProps> = (args) => <DialogCode {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
};
