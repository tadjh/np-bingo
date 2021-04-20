import React from 'react';
import { Story, Meta } from '@storybook/react';
import Status, { StatusProps } from './';

export default {
  title: 'Components/Status/Host',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = (args) => <Status {...args} />;

export const Init = Template.bind({});

export const Ready = Template.bind({});
Ready.storyName = 'Ready';
Ready.args = {
  gamestate: 'ready',
  host: true,
};

export const ReadySingular = Template.bind({});
ReadySingular.args = {
  gamestate: 'ready',
  host: true,
  count: 1,
};

export const ReadyPlural = Template.bind({});
ReadyPlural.args = {
  gamestate: 'ready',
  host: true,
  count: 5,
};

export const Standby = Template.bind({});
Standby.args = {
  gamestate: 'standby',
  host: true,
};

export const Start = Template.bind({});
Start.storyName = 'Start (Randomized)';
Start.args = {
  gamestate: 'start',
  host: true,
};

export const Validate = Template.bind({});
Validate.args = {
  gamestate: 'validate',
  host: true,
};

export const Pause = Template.bind({});
Pause.args = {
  gamestate: 'pause',
  host: true,
};

export const Failure = Template.bind({});
Failure.args = {
  gamestate: 'failure',
  host: true,
};

export const End = Template.bind({});
End.args = {
  gamestate: 'end',
  host: true,
};

export const Win = Template.bind({});
Win.args = {
  gamestate: 'win',
  host: true,
};
