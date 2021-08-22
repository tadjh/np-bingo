import React from 'react';
import { Story, Meta } from '@storybook/react';
import Background, { BackgroundProps } from '.';

export default {
  title: 'Surfaces/Background',
  component: Background,
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen max-w-md">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<BackgroundProps> = (args) => <Background {...args} />;

export const Base = Template.bind({});
