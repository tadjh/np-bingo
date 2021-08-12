import React from 'react';
import { Story, Meta } from '@storybook/react';
import VolumeToggle, { VolumeToggleProps } from '.';
import { ThemeContext } from '../../Utils/contexts';

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
      <ThemeContext.Provider
        value={{
          theme: 'dark',
          toggleTheme: () => {},
          sounds: false,
          toggleSounds: () => {},
        }}
      >
        <Story />
      </ThemeContext.Provider>
    );
  },
];
