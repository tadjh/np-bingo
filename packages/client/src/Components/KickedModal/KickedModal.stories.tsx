import React from 'react';
import { Story, Meta } from '@storybook/react';
import KickedModal, { KickedModalProps } from '.';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Modals/Kicked Modal',
  component: KickedModal,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  argTypes: {
    onClose: { action: 'click' },
    // callback: { action: 'callback' },
  },
} as Meta;

const Template: Story<KickedModalProps> = (args) => <KickedModal {...args} />;

export const Base = Template.bind({});
Base.args = {
  open: true,
  reason: 'none',
};

export const Banned = Template.bind({});
Banned.args = {
  open: true,
  reason: 'banned',
};

export const Abandoned = Template.bind({});
Abandoned.args = {
  open: true,
  reason: 'abandoned',
};
