import React from 'react';
import { Story, Meta } from '@storybook/react';
import Main, { MainProps } from './';
import Container from '../Container';
import Header from '../Header';
import Footer from '../Footer';

export default {
  title: 'Wrappers/Main',
  component: Main,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Header className="flex-1" />
          <Story />
          <Footer className="flex-1" />
        </Container>
      );
    },
  ],
} as Meta;

const Template: Story<MainProps> = (args) => <Main {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <div>Main</div>,
  className: 'flex-1 bg-gray-200 justify-center',
};
