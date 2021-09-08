import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import Join, { JoinProps } from './routes/Join';
import {
  FeaturesContext,
  initialPlayer,
  initialUserContext,
  ThemeContext,
  UserContext,
} from '../../context';
import features from '../../config/features';
import { Rooms } from './components/RoomList/RoomList.stories';
import { Socket } from 'socket.io-client';
import { Wrapper } from '../../components/Layout/Container/Wrapper';
import { Theme } from '@np-bingo/types';

export default {
  title: 'Pages/Join',
  component: Join,
  argTypes: {
    joinRoom: { action: 'submit' },
  },
  decorators: [
    (Story, { args }) => {
      const [theme, setTheme] = useState<Theme>('dark');
      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      };
      return (
        <Router>
          <FeaturesContext.Provider
            value={{ ...features, allowPublic: args.allowPublic }}
          >
            <ThemeContext.Provider
              value={{
                theme: theme,
                toggleTheme: toggleTheme,
              }}
            >
              <UserContext.Provider
                value={{
                  ...initialUserContext,
                  user: initialPlayer,
                  socket: {} as Socket,
                }}
              >
                <Wrapper theme={theme}>
                  <Story {...args} />
                </Wrapper>
              </UserContext.Provider>
            </ThemeContext.Provider>
          </FeaturesContext.Provider>
        </Router>
      );
    },
  ],
  parameters: {
    layout: 'none',
    actions: {
      handles: [
        'click .nav-button',
        'click .solo-button',
        'click .join-button',
      ],
    },
  },
} as Meta;

const Template: Story<JoinProps> = (args) => <Join {...args} />;

export const Base = Template.bind({});

export const PublicRooms = Template.bind({});
PublicRooms.args = {
  allowPublic: true,
  publicRooms: Rooms.args && Rooms.args.rooms && [...Rooms.args.rooms],
};

export const NoSoloMode = Template.bind({});
NoSoloMode.args = {
  allowPublic: false,
};
