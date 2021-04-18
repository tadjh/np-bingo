import React from 'react';
import { Story, Meta } from '@storybook/react';
import DialogTitle, { DialogTitleProps } from './DialogTitle';

export default {
  title: 'Components/DialogTitle',
  component: DialogTitle,
  argTypes: { onClose: { action: 'click' } },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<DialogTitleProps> = (args) => <DialogTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Enter Room Code',
};
