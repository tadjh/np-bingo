import React from 'react';
import { Story, Meta } from '@storybook/react';
import VolumeToggle, { VolumeToggleProps } from '.';
import { SoundContext } from '../../context';

export default {
  title: 'Components/Volume Toggle',
  component: VolumeToggle,
} as Meta;

const Template: Story<VolumeToggleProps> = (args) => <VolumeToggle {...args} />;

export const On = Template.bind({});

export const Off = Template.bind({});
Off.decorators = [
  (Story) => {
    return (
      <SoundContext.Provider
        value={{
          sounds: false,
          toggleSounds: () => {},
        }}
      >
        <Story />
      </SoundContext.Provider>
    );
  },
];
