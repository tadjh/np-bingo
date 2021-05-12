import React from 'react';
import Share from '../Share';
import { Gamemode, Room } from '@np-bingo/types';
import ThemeToggle from '../ThemeToggle';
import Code from '../Code';
import { FeautresContext } from '../../Utils/contexts';
import { ThemeContext } from '../../Utils/contexts';

export interface WidgetProps {
  variant?: Gamemode;
  room?: Room;
}

export default function Widgets({
  variant = 'default',
  room = '',
}: WidgetProps): JSX.Element {
  if (variant === 'solo')
    return (
      <ThemeContext.Consumer>
        {(themeContext) => (
          <ThemeToggle
            onClick={themeContext.toggleTheme}
            theme={themeContext.theme}
          />
        )}
      </ThemeContext.Consumer>
    );
  return (
    <div className="flex gap-5">
      <div className="flex items-end">
        <ThemeContext.Consumer>
          {(themeContext) => (
            <ThemeToggle
              onClick={themeContext.toggleTheme}
              theme={themeContext.theme}
            />
          )}
        </ThemeContext.Consumer>
      </div>
      <div>
        <Code room={room} />
      </div>
      <div className="flex items-end">
        <FeautresContext.Consumer>
          {(features) => features['share-room'] && <Share room={room} />}
        </FeautresContext.Consumer>
      </div>
    </div>
  );
}
