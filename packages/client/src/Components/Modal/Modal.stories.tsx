import React from 'react';
import { Story, Meta } from '@storybook/react';
import Modal, { ModalProps } from '.';

export default {
  title: 'Modal/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'modal',
  open: true,
  children: 'Modal',
};
