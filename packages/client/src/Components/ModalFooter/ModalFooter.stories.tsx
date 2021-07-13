import React from 'react';
import { Story, Meta } from '@storybook/react';
import ModalFooter, { ModalFooterProps } from '.';

export default {
  title: 'Modal/Modal Footer',
  component: ModalFooter,
} as Meta;

const Template: Story<ModalFooterProps> = (args) => <ModalFooter {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <button>Button</button>,
};
