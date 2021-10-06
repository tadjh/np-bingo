import React from 'react';
import { Story, Meta } from '@storybook/react';
import CodeModal, { CodeModalProps } from '.';

export default {
  title: 'Pages/Join/Code Modal',
  component: CodeModal,
  argTypes: {
    onClose: { action: 'click' },
  },
} as Meta;

const Template: Story<CodeModalProps> = (args) => <CodeModal {...args} />;

export const Base = Template.bind({});
Base.args = {
  open: true,
};
