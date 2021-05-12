import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListItem, { ListItemProps } from '.';

export default {
  title: 'List/List Item',
  component: ListItem,
} as Meta;

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'List Item',
};
