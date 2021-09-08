import React from 'react';
import { Story, Meta } from '@storybook/react';
import Widgets, { WidgetProps } from '.';
import { FeaturesContext } from '../../context';
import features from '../../config/features';
import * as CodeStories from './components/Code/Code.stories';

export default {
  title: 'Elements/Widgets',
  component: Widgets,
} as Meta;

const Template: Story<WidgetProps> = (args) => <Widgets {...args} />;
// TODO fix

export const Base = Template.bind({});
Base.args = {
  ...CodeStories.Base.args,
};

export const ShareDisabled = Template.bind({});
ShareDisabled.decorators = [
  (Story) => (
    <FeaturesContext.Provider value={{ ...features, allowShare: false }}>
      <Story />
    </FeaturesContext.Provider>
  ),
];
ShareDisabled.args = { ...Base.args };

export const Blank = Template.bind({});
