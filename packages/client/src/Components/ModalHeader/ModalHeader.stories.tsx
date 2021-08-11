import React from 'react';
import { Story, Meta } from '@storybook/react';
import ModalHeader, { ModalHeaderProps } from '.';

export default {
  title: 'Modals/Modal Header',
  component: ModalHeader,
  argTypes: { onClose: { action: 'click' } },
} as Meta;

const Template: Story<ModalHeaderProps> = (args) => <ModalHeader {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Modal Header',
};
