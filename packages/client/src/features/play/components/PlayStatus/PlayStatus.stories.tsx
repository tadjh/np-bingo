import React from 'react';
import { Story, Meta } from '@storybook/react';
import PlayStatus, { PlayStatusProps } from '.';

export default {
  title: 'Display/Status/Play',
  component: PlayStatus,
} as Meta;

const Template: Story<PlayStatusProps> = (args) => <PlayStatus {...args} />;

export const Init = Template.bind({});
Init.args = {
  gamestate: 'init',
};

export const InitSolo = Template.bind({});
InitSolo.args = {
  ...Init.args,
  gamemode: 'solo',
};

export const Ready = Template.bind({});
Ready.args = {
  gamestate: 'ready',
};

export const ReadySolo = Template.bind({});
ReadySolo.args = {
  ...Ready.args,
  gamemode: 'solo',
};

export const Standby = Template.bind({});
Standby.args = {
  gamestate: 'standby',
};

export const Start = Template.bind({});
Start.args = {
  gamestate: 'start',
};

export const Validate = Template.bind({});
Validate.args = {
  gamestate: 'validate',
};

export const ValidateSolo = Template.bind({});
ValidateSolo.args = {
  ...Validate.args,
  gamemode: 'solo',
};

export const Pause = Template.bind({});
Pause.args = {
  gamestate: 'pause',
};

export const Failure = Template.bind({});
// Failure.storyName = 'Failure (Randomized)';
Failure.args = {
  gamestate: 'failure',
};

export const End = Template.bind({});
End.args = {
  gamestate: 'end',
};

export const Win = Template.bind({});
Win.args = {
  gamestate: 'win',
};
