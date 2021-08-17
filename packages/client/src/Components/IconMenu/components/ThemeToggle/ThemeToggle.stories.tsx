import React from 'react';
import { Story, Meta } from '@storybook/react';
import ThemeToggle, { ThemeToggleProps } from '.';
import { ThemeContext } from '../../../../context';

export default {
  title: 'Components/Theme Toggle',
  component: ThemeToggle,
} as Meta;

const Template: Story<ThemeToggleProps> = (args) => <ThemeToggle {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    return (
      <ThemeContext.Provider
        value={{
          theme: 'dark',
          toggleTheme: () => {},
        }}
      >
        <Story />
      </ThemeContext.Provider>
    );
  },
];
