import React from 'react';
import { Story, Meta } from '@storybook/react';
import Container, { ContainerProps } from '.';

export default {
  title: 'Layout/Container',
  component: Container,
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <div>Text</div>,
};
