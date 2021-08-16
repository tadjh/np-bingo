import React from 'react';
import { Story, Meta } from '@storybook/react';
import ModalBase from '.';
import Modal, { ModalProps } from '../Modal';

export default {
  title: 'Modals/Modal Base',
  component: ModalBase,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'modal-base',
  open: true,
  children: 'Modal Base',
};
