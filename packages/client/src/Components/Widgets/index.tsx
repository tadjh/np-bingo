import React from 'react';
import Share from '../Share';
import { Room } from '@np-bingo/types';
import ThemeToggle from '../ThemeToggle';
import Code from '../Code';
import { FeautresContext } from '../../Utils/contexts';
import { ThemeContext } from '../../Utils/contexts';

export interface WidgetProps {
  room?: Room;
}

export default function Widgets({ room = '' }: WidgetProps): JSX.Element {
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
