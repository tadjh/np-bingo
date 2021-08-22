import { Meta } from '@storybook/react';
import Modal from '.';
import { Base as CodeModalBase } from '../../../features/join/components/CodeModal/CodeModal.stories';

export default {
  title: 'Feedback/Modal',
  component: Modal,
} as Meta;

// const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Base = CodeModalBase;
// Base.args = {
//   id: 'modal',
//   open: true,
//   children: 'Modal',
// };
