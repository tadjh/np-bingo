import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListItemText, { ListItemTextProps } from '.';

export default {
  title: 'List/List Item Text',
  component: ListItemText,
} as Meta;

const Template: Story<ListItemTextProps> = (args) => <ListItemText {...args} />;

export const Base = Template.bind({});
Base.args = {
  primary: 'List Item Primary',
  secondary: 'Secondary Text',
};
