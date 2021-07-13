import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListBase, { ListBaseProps } from '.';

export default {
  title: 'List/List Base',
  component: ListBase,
} as Meta;

const Template: Story<ListBaseProps> = (args) => <ListBase {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'List Base',
};
