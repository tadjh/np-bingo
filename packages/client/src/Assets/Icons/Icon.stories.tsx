import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IconProps } from './Icon';
import CheckIcon from './Check';
import ChevronRightIcon from './ChevronRight';
import CloseIcon from './Close';
import CloseCircleIcon from './CloseCircle';
import CogIcon from './Cog';
import HeavyBallotXIcon from './HeavyBallotX';
import MinusIcon from './Minus';
import MoonIcon from './Moon';
import PlusCircleIcon from './PlusCircle';
import ShareIcon from './Share';
import SunIcon from './Sun';
import VolumeOffIcon from './VolumeOff';
import VolumeUpIcon from './VolumeUp';

export default {
  title: 'Inputs/Icons',
  component: CheckIcon,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <div className="flex flex-col gap-8">
    <div className="grid grid-cols-5 gap-2">
      <CheckIcon {...args} />
      <ChevronRightIcon {...args} />
      <CloseIcon {...args} />
      <MinusIcon {...args} />
    </div>
    <div className="grid grid-cols-5 gap-2">
      <CloseCircleIcon {...args} />
      <PlusCircleIcon {...args} />
      <CogIcon {...args} />
    </div>
    <div className="grid grid-cols-5 gap-2">
      <MoonIcon {...args} />
      <SunIcon {...args} />
    </div>
    <div className="grid grid-cols-5 gap-2">
      <VolumeOffIcon {...args} />
      <VolumeUpIcon {...args} />
    </div>
    <div className="grid grid-cols-5 gap-2">
      <HeavyBallotXIcon {...args} />
      <ShareIcon {...args} />
    </div>
  </div>
);

export const Small = Template.bind({});
Small.args = { size: 'small' };
export const Medium = Template.bind({});
export const Large = Template.bind({});
Large.args = { size: 'large' };
export const XLarge = Template.bind({});
XLarge.args = { size: 'x-large' };
