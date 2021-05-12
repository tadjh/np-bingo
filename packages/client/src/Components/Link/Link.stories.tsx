import React from 'react';
import { Story, Meta } from '@storybook/react';
import Link from '.';
import { LinkProps, BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Components/Link',
  component: Link,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Link',
  className: 'hover:underline',
};
