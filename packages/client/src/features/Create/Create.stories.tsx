import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Create, { CreateProps } from '.';
import Container from '../../components/Container';

export default {
  title: 'Pages/Create',
  component: Create,
  decorators: [
    (Story) => {
      return (
        <Router>
          <Container>
            <Story />
          </Container>
        </Router>
      );
    },
  ],
} as Meta;

const Template: Story<CreateProps> = (args) => <Create {...args} />;

export const Base = Template.bind({});
