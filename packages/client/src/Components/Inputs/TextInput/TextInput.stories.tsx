import React from 'react';
import { Story, Meta } from '@storybook/react';
import TextInput, { TextInputProps } from '.';

export default {
  title: 'Inputs/Text Input',
  component: TextInput,
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Text Input',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  children: 'Read Only Input',
  readOnly: true,
  value: 'http://localhost:8000',
};
