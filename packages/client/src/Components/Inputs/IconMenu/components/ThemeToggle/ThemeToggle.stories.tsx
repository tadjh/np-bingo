import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import ThemeToggle, { ThemeToggleProps } from '.';
import { ThemeContext } from '../../../../../context';
import { Theme } from '@np-bingo/types';

export default {
  title: 'Inputs/Icon Menu/Theme Toggle',
  component: ThemeToggle,
  decorators: [
    (Story) => {
      const [theme, setTheme] = useState<Theme>('dark');
      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      };
      return (
        <ThemeContext.Provider
          value={{
            theme: theme,
            toggleTheme: toggleTheme,
          }}
        >
          <Story />
        </ThemeContext.Provider>
      );
    },
  ],
} as Meta;

const Template: Story<ThemeToggleProps> = (args) => <ThemeToggle {...args} />;

export const Base = Template.bind({});
