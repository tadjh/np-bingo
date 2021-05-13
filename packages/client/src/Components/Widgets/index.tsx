import React, { useContext } from 'react';
import Share from '../Share';
import { Gamemode, Room } from '@np-bingo/types';
import ThemeToggle from '../ThemeToggle';
import Code from '../Code';
import { FeautresContext } from '../../Utils/contexts';

export interface WidgetProps {
  variant?: Gamemode;
  room?: Room;
}

export default function Widgets({
  variant = 'default',
  room = '',
}: WidgetProps): JSX.Element {
  const { share } = useContext(FeautresContext);
  if (variant === 'solo') return <ThemeToggle />;
  return (
    <div className="flex gap-5">
      <div className="flex items-end">
        <ThemeToggle />
      </div>
      <div>
        <Code room={room} />
      </div>
      <div className="flex items-end">{share && <Share room={room} />}</div>
    </div>
  );
}
