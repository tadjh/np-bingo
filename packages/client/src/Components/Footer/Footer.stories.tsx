import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Footer, { FooterProps } from './Footer';
import { FeautresContext } from '../../Utils/contexts';
import features from '../../Config/features';

import * as CodeStories from '../Code/Code.stories';

export default {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story) => {
      return (
        <Router>
          <Story />
        </Router>
      );
    },
  ],
} as Meta;

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...CodeStories.Default.args,
};

export const ShareDisabled = Template.bind({});
ShareDisabled.decorators = [
  (Story) => (
    <FeautresContext.Provider value={{ ...features, 'share-room': false }}>
      <Story />
    </FeautresContext.Provider>
  ),
];
ShareDisabled.args = { ...CodeStories.ShareDisabled.args };

export const Blank = Template.bind({});

export const Home = Template.bind({});
Home.args = {
  home: true,
};
