import React from 'react';
import { Story, Meta } from '@storybook/react';
import Header, { HeaderProps } from './';
import Container from '../Container';
import Main from '../Main';
import Footer from '../Footer';

export default {
  title: 'Wrappers/Header',
  component: Header,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
          <Main className="flex-1" />
          <Footer className="flex-1" />
        </Container>
      );
    },
  ],
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <div>Header</div>,
  className: 'flex-1 bg-gray-200 items-center',
};
