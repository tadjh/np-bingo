import React from 'react';
import { Story, Meta } from '@storybook/react';
import Header, { HeaderProps } from './';
import Container from '../Container';

export default {
  title: 'Wrappers/Header',
  component: Header,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      );
    },
  ],
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <div>Header</div>,
};
