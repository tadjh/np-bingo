import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer, { FooterProps } from '.';
import Header from '../Header';
import Main from '../Main';
import Container from '../../Container';

export default {
  title: 'Wrappers/Footer',
  component: Footer,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Header className="flex-1" />
          <Main className="flex-1" />
          <Story />
        </Container>
      );
    },
  ],
} as Meta;

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <div>Footer</div>,
  className: 'flex-1 bg-gray-200 justify-center',
};
