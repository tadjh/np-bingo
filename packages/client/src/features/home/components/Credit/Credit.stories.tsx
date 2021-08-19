import React from 'react';
import { Story, Meta } from '@storybook/react';
import Credit, { CreditProps } from '.';

export default {
  title: 'Pages/Home/Credit',
  component: Credit,
} as Meta;

const Template: Story<CreditProps> = (args) => <Credit {...args} />;

export const Base = Template.bind({});
Base.args = {
  author: 'John Doe',
  link: 'http://example.com',
};
