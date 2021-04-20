import React from 'react';
import { Story, Meta } from '@storybook/react';
import Code, { CodeProps } from './';
import { FeautresContext } from '../../Utils/contexts';
import features from '../../Config/features';

export default {
  title: 'Components/Code',
  component: Code,
} as Meta;

const Template: Story<CodeProps> = (args) => <Code {...args} />;

export const Base = Template.bind({});
Base.args = {
  room: 'A1B2',
};

export const ShareDisabled = Template.bind({});
ShareDisabled.decorators = [
  (Story) => (
    <FeautresContext.Provider value={{ ...features, 'share-room': false }}>
      <Story />
    </FeautresContext.Provider>
  ),
];
ShareDisabled.args = { ...Base.args };

export const Blank = Template.bind({});
