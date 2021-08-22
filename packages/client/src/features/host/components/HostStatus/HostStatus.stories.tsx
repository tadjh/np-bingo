import React from 'react';
import { Story, Meta } from '@storybook/react';
import HostStatus, { HostStatusProps } from '.';
export default {
  title: 'Display/Status/Host',
  component: HostStatus,
} as Meta;

const Template: Story<HostStatusProps> = (args) => <HostStatus {...args} />;

export const Init = Template.bind({});

export const Ready = Template.bind({});
Ready.args = {
  ...Init.args,
  gamestate: 'ready',
};

export const ReadySingular = Template.bind({});
ReadySingular.args = {
  ...Ready.args,
  count: 1,
};

export const ReadyPlural = Template.bind({});
ReadyPlural.args = {
  ...Ready.args,
  count: 5,
};

export const Standby = Template.bind({});
Standby.args = {
  ...Init.args,
  gamestate: 'standby',
};

export const Start = Template.bind({});
// Start.storyName = 'Start (Randomized)';
Start.args = {
  ...Init.args,
  gamestate: 'start',
};

export const Validate = Template.bind({});
Validate.args = {
  ...Init.args,
  gamestate: 'validate',
};

export const Pause = Template.bind({});
Pause.args = {
  ...Init.args,
  gamestate: 'pause',
};

export const Failure = Template.bind({});
Failure.args = {
  ...Init.args,
  gamestate: 'failure',
};

export const End = Template.bind({});
End.args = {
  ...Init.args,
  gamestate: 'end',
};

export const Win = Template.bind({});
Win.args = {
  ...Init.args,
  gamestate: 'win',
};
