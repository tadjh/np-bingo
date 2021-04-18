import React from 'react';
import { Story, Meta } from '@storybook/react';
import Remainder, { RemainderProps } from './Remainder';

export default {
  title: 'Components/Ball/Remainder',
  component: Remainder,
} as Meta;

const Template: Story<RemainderProps> = (args) => <Remainder {...args} />;

export const Base = Template.bind({});
