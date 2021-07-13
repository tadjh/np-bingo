import React from 'react';
import { Story, Meta } from '@storybook/react';
import ModalContent, { ModalContentProps } from '.';

export default {
  title: 'Modal/Modal Content',
  component: ModalContent,
} as Meta;

const Template: Story<ModalContentProps> = (args) => <ModalContent {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <p>Modal Content</p>,
};
