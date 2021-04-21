import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Play, { PlayProps } from './';
import Container from '@material-ui/core/Container';
// import { FeautresContext } from '../../Utils/contexts';
// import features from '../../Config/features';

export default {
  title: 'Pages/Play',
  component: Play,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story) => {
      return (
        <Router>
          <Container className="App" fixed maxWidth="xs">
            <Story />
          </Container>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
    argTypes: {
      init: { action: 'click' },
    },
  },
} as Meta;

const Template: Story<PlayProps> = (args) => <Play {...args} />;

export const Base = Template.bind({});
Base.args = {
  gamestate: 'start',
};
